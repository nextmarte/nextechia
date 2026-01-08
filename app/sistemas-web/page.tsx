import React from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Database, Shield, Server, Layout, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SistemasWebPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Sistemas Web sob Medida</h1>
          <p className="text-xl text-muted-foreground">
            Desenvolvemos o "cérebro" digital da sua empresa com as tecnologias mais modernas e seguras do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="h-10 w-10 text-primary shrink-0"><Server /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Poder do Django</h3>
                <p className="text-muted-foreground">Framework robusto usado por gigantes como Instagram e NASA, garantindo segurança e escalabilidade desde o primeiro dia.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 text-primary shrink-0"><Layout /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Interfaces com Next.js</h3>
                <p className="text-muted-foreground">Painéis administrativos rápidos, intuitivos e totalmente responsivos para que você controle tudo de qualquer lugar.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 text-primary shrink-0"><Database /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Dados Estruturados</h3>
                <p className="text-muted-foreground">Modelagem de banco de dados profissional para garantir a integridade e a velocidade das suas informações.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 text-primary shrink-0"><Shield /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Segurança em Primeiro Lugar</h3>
                <p className="text-muted-foreground">Proteção contra vulnerabilidades comuns da web e conformidade com as melhores práticas de desenvolvimento.</p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-8 rounded-2xl border sticky top-24">
            <h3 className="text-xl font-bold mb-4">O que entregamos:</h3>
            <ul className="space-y-3 mb-8">
              {[
                'Dashboard de indicadores em tempo real.',
                'Gestão de usuários e permissões.',
                'Relatórios automatizados e exportáveis.',
                'API para integração com apps.',
                'Backup automático e segurança TLS.',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contato" className="block w-full">
              <Button className="w-full" size="lg">Solicitar Projeto</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
