# EncodLab Studio 🧪🔐

Laboratório técnico interativo para geração, validação e decodificação de estruturas de autenticação e codificação (JWT, Base64). Minimalista, seguro e 100% client-side.

## 🚀 Sobre o Projeto

O EncodLab Studio é uma plataforma web inovadora, desenhada para desenvolvedores, estudantes e entusiastas de segurança que desejam aprofundar seus conhecimentos em estruturas de autenticação e codificação, como JWT (JSON Web Tokens) e Base64.

Desenvolvida com React, Vite e TypeScript, e hospedada via Lovable, a aplicação roda inteiramente no navegador. Sua arquitetura client-side garante privacidade total, eliminando a necessidade de servidores, cookies ou persistência externa — focando numa experiência técnica refinada e segura.

## 🔧 Funcionalidades Principais

### 🔓 Decodificador de JWT
- Cole um JWT e visualize automaticamente seu Header, Payload e Signature
- Os campos são exibidos em formato JSON legível com botão de cópia
- Validação e tratamento de erros para tokens malformados

### 🔐 Verificador de Assinatura
- Valide a integridade de tokens usando chaves simétricas ou assimétricas
- Compatível com os algoritmos HS256, RS256 e ES256
- Retorno visual imediato informando se a assinatura é válida

### 🛠️ Gerador de JWT
- Edite Header e Payload livremente em formato JSON
- Escolha o algoritmo de assinatura e forneça a chave apropriada
- O token gerado pode ser copiado com um clique

### 🔁 Codificador/Decodificador Base64
- Encode/decode de strings no formato Base64/Base64Url
- Resultado editável com suporte visual a erros e botão de cópia
- Suporte a drag & drop de arquivos

### 📱 Codificador/Decodificador URL
- Codificação e decodificação segura de URLs
- Tratamento de caracteres especiais
- Interface intuitiva com validação em tempo real

## 📘 Conceitos Abordados

- **JSON Web Tokens (JWT)**: Estrutura com Header, Payload e Signature
- **Base64 & Base64Url**: Conversão de dados binários em strings ASCII seguras  
- **URL Encoding**: Codificação segura de URLs para transmissão web
- **Web Crypto API**: Assinatura e verificação de dados no próprio navegador
- **Algoritmos criptográficos**: Suporte a HS256 (HMAC), RS256 (RSA), ES256 (ECDSA)
- **Segurança e boas práticas**: Codificação segura, sem backends, sem rastreamento

## 🧪 Desafios Técnicos Superados

Durante a construção do projeto, diversos desafios reais foram enfrentados:

- **Web Crypto API**: manipulação precisa de chaves, buffers e assinatura assíncrona
- **Base64 vs Base64Url**: padronização e consistência na codificação
- **Parsing seguro de JSON**: proteção contra quebras causadas por entradas inválidas
- **Arquitetura modular**: separação clara entre lógica, componentes e conteúdos educacionais
- **Persistência de tema**: sincronização de preferências com localStorage
- **Sistema de temas avançado**: suporte a modos escuro, claro e sistema
- **Componentização reutilizável**: Sidebar responsiva, Cards com gradientes, componentes UI personalizados
- **Feedback visual e acessibilidade**: UX aprimorada com feedbacks claros e interações suaves
- **Estados sincronizados**: sincronismo entre input/output com useEffect e useCallback
- **Complexidade interna simplificada**: encapsulamento de lógicas criptográficas para o usuário
- **Documentação integrada**: conteúdos técnicos para fins educacionais
- **Drag & Drop**: implementação de funcionalidade de arrastar e soltar arquivos

## 🧰 Tecnologias Utilizadas

- 🧠 **React** — Biblioteca declarativa e reativa para a interface
- ⚡ **Vite** — Build tool moderna e rápida
- 📘 **TypeScript** — Tipagem estática para maior robustez
- 🎨 **Tailwind CSS** — Design utilitário com responsividade e sistema de temas
- 🧩 **Shadcn/ui** — Componentes UI modernos e acessíveis
- 🔐 **Web Crypto API** — Assinatura segura client-side
- 🎯 **React Router** — Navegação SPA
- 🚀 **Lovable** — Plataforma de desenvolvimento e deploy

## 🛠️ Como Rodar Localmente

Para configurar e executar o EncodLab Studio no seu ambiente local:

### Clone o repositório
```bash
git clone https://github.com/Edison-Vargas-Teixeira/encodlab-studio.git
cd encodlab-studio
```

### Instale as dependências
```bash
npm install
```

### Execute em modo de desenvolvimento
```bash
npm run dev
```

📍 Acesse a aplicação no seu navegador: `http://localhost:5173`

### Build para produção
```bash
npm run build
```

## 🚀 Deploy

O EncodLab Studio pode ser facilmente deployado em diversas plataformas:

- **Lovable**: Deploy automático integrado
- **Vercel**: Suporte nativo para Vite/React
- **Netlify**: Deploy contínuo via Git
- **GitHub Pages**: Para projetos open source

## 🧠 História do Projeto

O EncodLab Studio nasceu da vontade de unir teoria, segurança digital e visualização prática. Seu propósito inicial era desmistificar a estrutura dos tokens JWT, evoluindo para um ambiente interativo completo para experimentação de codificação, assinatura e validação. 

O projeto expandiu para incluir ferramentas Base64 e URL encoding, tornando-se um laboratório digital completo que estimula o aprendizado técnico com clareza e propósito.

## 🤝 Contribuições

As contribuições são sempre bem-vindas! Se encontrou um bug ou tem uma sugestão de melhoria:

1. Abra uma **Issue** detalhando o problema ou a ideia
2. Envie **Pull Requests** com melhorias técnicas, novas funcionalidades ou correções
3. Qualquer tipo de feedback técnico é muito apreciado!

## 🛡️ Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

---

**© 2025 Edison Vargas Teixeira. Todos os direitos reservados.**

*Desenvolvido com ❤️ para a comunidade de desenvolvedores*
