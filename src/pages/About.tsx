import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  History, 
  Lightbulb, 
  Heart, 
  Code2, 
  Shield, 
  Zap, 
  BookOpen,
  Users,
  Sparkles
} from "lucide-react";

const About = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            EncodLab Studio v2.0
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            A História do Projeto
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Da necessidade à realidade: como nasceu o laboratório digital mais completo 
            para desenvolvedores trabalharem com JWT e codificações
          </p>
        </div>

        {/* Origin Story */}
        <Card className="glow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              A Origem do EncodLab Studio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              O EncodLab Studio surgiu da necessidade de ter um ambiente técnico e intuitivo para 
              trabalhar com tokens JWT e codificações como Base64 de forma prática, segura e educativa. 
              Ele evoluiu de um playground experimental para um verdadeiro <strong className="text-foreground">
              laboratório digital</strong> focado em estudo, testes e aprendizado em segurança web.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Trabalhar com JWTs em projetos reais geralmente exige navegar por diversas ferramentas 
              para decodificar tokens, gerar novos ou validar suas assinaturas. Essa jornada fragmentada 
              motivou a criação de um app que unificasse tudo isso — com foco em 
              <strong className="text-foreground"> usabilidade, clareza visual e profundidade técnica</strong> 
              — numa interface moderna e fluida.
            </p>
          </CardContent>
        </Card>

        {/* Inspiration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Inspirações e Referências
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">JWT Debugger</h4>
                  <p className="text-sm text-muted-foreground">
                    Ferramenta clássica que permite decodificar, inspecionar e validar tokens JWT 
                    em tempo real, inspirando nosso módulo de decodificação avançado.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Base64 Encode and Decode</h4>
                  <p className="text-sm text-muted-foreground">
                    Serviço rápido e direto para conversão Base64, que serviu de base para nosso 
                    sistema de codificação/decodificação integrado com preview automático de imagens.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-blue-500" />
              Tecnologias & Arquitetura Moderna
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Frontend</Badge>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-primary" />
                    <strong>React 18 + TypeScript:</strong> para modularização, type safety e manutenibilidade
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-primary" />
                    <strong>Vite:</strong> build tool ultrarrápido com HMR instantâneo
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-primary" />
                    <strong>Tailwind CSS:</strong> design system consistente e responsivo
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-primary" />
                    <strong>shadcn/ui:</strong> componentes acessíveis e customizáveis
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Segurança & Performance</Badge>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-500" />
                    <strong>Web Crypto API:</strong> criptografia nativa do navegador
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-500" />
                    <strong>Processamento Local:</strong> todos os dados ficam no seu navegador
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-500" />
                    <strong>Paradigma Funcional:</strong> imutabilidade e funções puras
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-500" />
                    <strong>Detecção Inteligente:</strong> reconhecimento automático de formatos
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Name Evolution */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Sobre o Nome "EncodLab Studio"
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              A aplicação já teve outros nomes — como "JWT Playground Aprimorado" e "JWT Studio" — 
              mas a evolução da proposta e o escopo mais amplo pediam um nome que refletisse tanto 
              a ação de codificar quanto o caráter laboratorial e criativo do projeto.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 py-4">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">Encode</div>
                <p className="text-xs text-muted-foreground mt-1">Codificação e transformação</p>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">Lab</div>
                <p className="text-xs text-muted-foreground mt-1">Experimentação técnica</p>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">Studio</div>
                <p className="text-xs text-muted-foreground mt-1">Espaço criativo organizado</p>
              </div>
            </div>

            <Separator />

            <p className="text-muted-foreground leading-relaxed">
              O nome <strong className="text-foreground">EncodLab Studio</strong> sintetiza tudo isso: 
              um ambiente técnico, visual e educativo onde a teoria encontra a prática, e desenvolvedores 
              podem estudar, criar, verificar e entender profundamente como funcionam estruturas como JWTs, 
              codificações Base64 e muito mais.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="border-success/20 bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-success" />
              Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Democratizar o acesso a ferramentas de desenvolvimento seguras e educativas, 
              criando um ambiente onde desenvolvedores de todos os níveis possam:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Aprender</h4>
                  <p className="text-sm text-muted-foreground">
                    Compreender conceitos complexos de forma visual e prática
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Experimentar</h4>
                  <p className="text-sm text-muted-foreground">
                    Testar e validar tokens em um ambiente seguro e controlado
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Desenvolver</h4>
                  <p className="text-sm text-muted-foreground">
                    Criar soluções robustas com confiança e conhecimento
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Compartilhar</h4>
                  <p className="text-sm text-muted-foreground">
                    Colaborar com a comunidade através de código aberto
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Developer Info */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-accent" />
              Sobre o Desenvolvedor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              O EncodLab Studio foi desenvolvido com paixão por tecnologia e desejo de contribuir 
              com a comunidade de desenvolvedores. Conecte-se para colaborações, feedback ou 
              apenas para conversar sobre desenvolvimento.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); }}
                className="flex items-center gap-3 px-6 py-3 bg-background/80 hover:bg-background border border-border rounded-lg transition-all hover:shadow-md hover:scale-105 group"
              >
                <div className="h-10 w-10 bg-[#0A66C2] rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">Perfil profissional</div>
                </div>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); }}
                className="flex items-center gap-3 px-6 py-3 bg-background/80 hover:bg-background border border-border rounded-lg transition-all hover:shadow-md hover:scale-105 group"
              >
                <div className="h-10 w-10 bg-[#171515] rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">GitHub</div>
                  <div className="text-sm text-muted-foreground">Repositórios e projetos</div>
                </div>
              </a>

              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); }}
                className="flex items-center gap-3 px-6 py-3 bg-background/80 hover:bg-background border border-border rounded-lg transition-all hover:shadow-md hover:scale-105 group"
              >
                <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">Homepage</div>
                  <div className="text-sm text-muted-foreground">Site pessoal</div>
                </div>
              </a>
            </div>

            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Interessado em colaborar ou tem sugestões? Entre em contato através dos canais acima!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 space-y-2">
          <p className="text-sm text-muted-foreground">
            Feito com ❤️ para a comunidade de desenvolvedores
          </p>
          <p className="text-xs text-muted-foreground">
            EncodLab Studio • Código Aberto • Processamento Local • Sempre Gratuito
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;