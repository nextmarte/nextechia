import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'
import { saveChatMessage, upsertLead, calculateLeadScore, logInteraction } from '@/lib/supabaseService'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface CaptureLeadInput {
  name: string
  email: string
  phone: string
  objective: string
  organization?: string
}

// Schema de ferramenta para captura estruturada de lead
const LEAD_CAPTURE_TOOL = {
  type: 'function',
  function: {
    name: 'capture_lead',
    description: 'Captura dados estruturados do cliente quando nome, telefone, email, objetivo e organização estão disponíveis',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Nome completo do cliente',
        },
        email: {
          type: 'string',
          description: 'Email do cliente',
        },
        phone: {
          type: 'string',
          description: 'Telefone do cliente (formato BR: DDD + 9 dígitos)',
        },
        objective: {
          type: 'string',
          description: 'Objetivo ou descrição do projeto',
        },
        organization: {
          type: 'string',
          description: 'Organização/empresa do cliente (opcional)',
        },
      },
      required: ['name', 'email', 'phone', 'objective'],
    },
  },
} as const

export async function POST(req: Request) {
  try {
    const { messages, sessionId, email: providedEmail, phone: providedPhone, name: providedName } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId é obrigatório' }, { status: 400 })
    }

    // Salvar mensagem do usuário no banco
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'user') {
      // Ainda não temos o lead_id até fazer o upsert; manter null
      await saveChatMessage(sessionId, 'user', lastMessage.content)
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      tools: [LEAD_CAPTURE_TOOL],
      tool_choice: 'auto',
      messages: [
        {
          role: 'system',
          content: `Você é o Agente de Vendas da Nextech, uma consultoria de tecnologia premium.
          Seu objetivo é converter visitantes em leads de forma ética e profissional.
          
          Informações da Nextech:
          - Serviços: Sites Estáticos Express (72h), Agentes de WhatsApp com IA, Sistemas Web Corporativos, Chatbots Oficiais.
          - Contato WhatsApp: +55 21 93300-9048.
          
          Protocolo de Captura de Leads:
          1. COMEÇAR: Peça APENAS o NOME completo do cliente na primeira pergunta.
          2. CONVERSAR: Após obter o nome, converse naturalmente sobre o objetivo/projeto do cliente. Faça perguntas relevantes para entender melhor a necessidade.
          3. ENCERRAR: Quando o cliente demonstrar interesse suficiente, diga que precisa de alguns dados de contato para prosseguir.
          4. COLETAR DADOS FINAIS: Peça TELEFONE, EMAIL e ORGANIZAÇÃO (pode ser "não tenho" se freelancer).
          5. REGISTRAR: Quando tiver os 5 dados (nome, telefone, email, objetivo, organização), chame a ferramenta capture_lead.
          
          Orientações importantes:
          - A conversa deve ser natural e focada no objetivo do cliente, não em coletar dados.
          - Apenas o NOME é coletado no início.
          - Telefone, email e organização são coletados APENAS ao final, antes de gerar o link WhatsApp.
          - Seja cordial, profissional e empático.
          - Reconheça os dados do cliente à medida que são fornecidos (ex: "Perfeito! Então seu telefone é...").
          - Responda de forma concisa (máximo 2-3 parágrafos).
          - NÃO gere link wa.me manualmente; deixe a ferramenta e o sistema fazer isso.`,
        },
        ...messages,
      ],
      temperature: 0.7,
    })

    const assistantContent = response.choices[0].message.content || ''
    const assistantMessage = response.choices[0].message

    // Salvar resposta do assistente
    await saveChatMessage(sessionId, 'assistant', assistantContent)

    let whatsappLink: string | null = null
    let leadId: string | null = null

    // Verificar se houve chamada de ferramenta (tool_call)
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolCall = assistantMessage.tool_calls[0] as any
      
      if (toolCall.function?.name === 'capture_lead') {
        try {
          const leadData: CaptureLeadInput = JSON.parse(toolCall.function.arguments)
          
          // Calcular score baseado na coleta de dados
          const score = calculateLeadScore(
            messages.length,
            !!leadData.objective,
            !!leadData.phone,
            0
          )

          // Salvar lead no banco
          const lead = await upsertLead(leadData.email, {
            name: leadData.name,
            phone: leadData.phone,
            objective: leadData.objective,
            source: 'chat',
            score,
            status: score >= 60 ? 'qualified' : 'new',
            company: leadData.organization || undefined,
          })

          if (lead) {
            leadId = lead.id
            
            // Registrar interação
            await logInteraction(lead.id, 'message', {
              messageCount: messages.length,
              dataCollected: true,
            })

            // Construir WhatsApp message e link
            const whatsappText = `Olá, sou ${leadData.name}. Quero falar sobre ${leadData.objective}. Meu email: ${leadData.email}. Telefone: ${leadData.phone}${leadData.organization ? `. Organização: ${leadData.organization}` : ''}.`
            whatsappLink = `https://wa.me/5521933009048?text=${encodeURIComponent(whatsappText)}`

            // Vincular histórico da sessão ao lead
            try {
              const { createServerSupabaseClient } = await import('@/lib/supabaseClient')
              const supabase = createServerSupabaseClient()
              await supabase
                .from('chat_history')
                .update({ lead_id: lead.id })
                .eq('session_id', sessionId)
                .is('lead_id', null)
            } catch (e) {
              console.warn('Falha ao vincular sessão ao lead:', e)
            }
          }
        } catch (e) {
          console.error('Erro ao processar tool_call:', e)
        }
      }
    }

    return NextResponse.json({
      role: 'assistant',
      content: assistantContent,
      whatsappLink,
      leadId,
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Erro ao processar sua solicitação.' }, { status: 500 })
  }
}
