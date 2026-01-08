import React from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { CheckCircle2, MessageSquare, Zap, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function ChatbotsPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">Chatbots para WhatsApp</h1>
            <p className="text-lg text-muted-foreground">
              Automatize seu atendimento, reduza o tempo de resposta e nunca mais perca uma oportunidade de venda.
            </p>
            <div className="space-y-4 pt-4">
              {[
                'Atendimento 24 horas por dia, 7 dias por semana.',
                'Qualificação automática de leads antes do humano assumir.',
                'Integração direta com seu CRM ou Planilha.',
                'Respostas instantâneas e menus interativos.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-6">
              <Link href="https://wa.me/5521933009048" target="_blank">
                <Button size="lg">Quero uma Automação</Button>
              </Link>
            </div>
          </div>
          <div className="bg-muted aspect-square rounded-2xl flex flex-col p-6 border shadow-inner">
             {/* Simulação de Chat */}
             <div className="space-y-4">
               <div className="bg-background border rounded-lg p-3 max-w-[80%] shadow-sm uppercase text-[10px] font-bold tracking-tighter text-muted-foreground">Cliente</div>
               <div className="bg-background border rounded-lg p-3 max-w-[80%]">Olá, gostaria de saber mais sobre os serviços.</div>
               <div className="bg-primary/10 border-primary/20 border rounded-lg p-3 max-w-[80%] self-end uppercase text-[10px] font-bold tracking-tighter text-primary">NexTechIA Bot</div>
               <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%] self-end shadow-md">
                 Olá! Sou o assistente inteligente da NexTechIA. Como posso te ajudar hoje?
                 <div className="mt-2 pt-2 border-t border-primary-foreground/20 space-y-1">
                    <div className="text-xs bg-primary-foreground/10 p-1 rounded">1. Sites Profissionais</div>
                    <div className="text-xs bg-primary-foreground/10 p-1 rounded">2. Sistemas Web</div>
                    <div className="text-xs bg-primary-foreground/10 p-1 rounded">3. Chatbots</div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-20 border-t">
          <div>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Resposta Imediata</h3>
            <p className="text-sm text-muted-foreground">Não deixe seu cliente esperando. O bot responde no ato conforme a sua regra.</p>
          </div>
          <div>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Escalabilidade</h3>
            <p className="text-sm text-muted-foreground">Atenda centenas de pessoas simultaneamente sem aumentar sua equipe.</p>
          </div>
          <div>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-bold mb-2">Triagem Eficiente</h3>
            <p className="text-sm text-muted-foreground">Passe para o atendimento humano apenas o que já está qualificado.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
