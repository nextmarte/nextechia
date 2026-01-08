import React from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { ServiceCard } from '@/components/ServiceCard';
import { Globe, MessageSquare, Layout, Smartphone, Search, Database } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Nossos Serviços</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para transformar a presença digital da sua empresa e otimizar processos internos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Desenvolvimento Personalizado"
            description="Criamos sistemas que se adaptam ao seu negócio, não o contrário. Soluções escaláveis e seguras."
            href="/sistemas-web"
            icon={Layout}
          />
          <ServiceCard
            title="Chatbots Avançados"
            description="Integração oficial com API do WhatsApp para automação de vendas e suporte inteligente."
            href="/chatbots-whatsapp"
            icon={MessageSquare}
          />
          <ServiceCard
            title="Sites de Alta Performance"
            description="Landing pages e sites institucionais otimizados para conversão e velocidade extrema."
            href="/"
            icon={Globe}
          />
          <ServiceCard
            title="Sistemas de Gestão (ERP)"
            description="Dashboards e painéis administrativos para controle total da sua operação em tempo real."
            href="/sistemas-web"
            icon={Database}
          />
          <ServiceCard
            title="SEO e Visibilidade"
            description="Otimização técnica para garantir que sua empresa seja encontrada pelos clientes certos."
            href="/"
            icon={Search}
          />
          <ServiceCard
            title="Aplicações Mobile Web"
            description="Experiências fluidas em smartphones com tecnologias web modernas (PWA)."
            href="/"
            icon={Smartphone}
          />
        </div>

        <div className="mt-20 bg-muted rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Precisa de uma solução sob medida?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Nossa equipe técnica está pronta para analisar seu projeto e propor a melhor arquitetura.
          </p>
          <Link href="/contato">
            <Button size="lg">Entrar em Contato</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
