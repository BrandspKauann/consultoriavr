# 📋 Checklist Completo para Criação de Artigo

## ✅ SEGURANÇA: Isolamento entre Sites

**Resposta direta:** **NÃO, não vai interferir em outros sites!**

Cada site tem seu próprio banco de dados Supabase isolado através das variáveis de ambiente (`VITE_SUPABASE_URL`). Os artigos são armazenados na tabela `articles` do seu projeto específico, então:
- ✅ Cada site tem seu próprio banco de dados
- ✅ Artigos criados em um site não aparecem em outros
- ✅ Totalmente isolado e seguro

---

## 📝 CHECKLIST COMPLETO - Campos do Formulário

Use este checklist para preencher TODOS os campos ao criar um artigo novo. Copie e cole para a IA gerar o conteúdo completo:

### 🔴 **CAMPOS OBRIGATÓRIOS** (marcados com *)

#### 1. **Título** *
- **Limite:** 60 caracteres (ideal para SEO)
- **O que é:** Título principal do artigo que aparece no card e na página
- **Exemplo:** "Como economizar até 30% nos benefícios corporativos"
- **Dica IA:** Crie um título atrativo, claro e que contenha palavras-chave relevantes

#### 2. **Descrição** *
- **Limite:** 160 caracteres (ideal para meta description)
- **O que é:** Resumo curto que aparece abaixo do título nos cards
- **Exemplo:** "Descubra estratégias comprovadas para reduzir custos com vale-refeição e outros benefícios sem perder qualidade."
- **Dica IA:** Use `<strong>texto</strong>` ou `<b>texto</b>` para destacar palavras importantes
- **Dica IA:** Seja persuasivo e inclua um call-to-action sutil

#### 3. **Tipo** *
- **Opções:** 
  - `Artigo` (para conteúdo escrito)
  - `Vídeo` (para conteúdo em vídeo)
- **O que é:** Define se é um artigo de texto ou vídeo
- **Dica IA:** Escolha baseado no conteúdo principal

#### 4. **Categoria** *
- **O que é:** Categoria/tema do artigo (ex: "Educativo", "Dicas", "Notícias", "Guia")
- **Exemplo:** "Educativo", "Dicas de RH", "Gestão de Benefícios", "Vale Refeição"
- **Dica IA:** Use categorias consistentes para facilitar organização

---

### 🟡 **CAMPOS OPCIONAIS MAS RECOMENDADOS**

#### 5. **Conteúdo**
- **O que é:** Conteúdo completo do artigo em Markdown ou HTML
- **Formato:** Aceita Markdown ou HTML puro
- **Para vídeos:** Cole o código do iframe do YouTube aqui
- **Dica IA:** 
  - Use Markdown para formatação simples (## para títulos, **negrito**, *itálico*)
  - Use HTML para formatação mais complexa
  - Para vídeos, cole o iframe completo do YouTube

#### 6. **Slug (URL amigável)**
- **Limite:** 60 caracteres
- **O que é:** URL amigável gerada automaticamente do título (mas você pode editar)
- **Formato:** apenas-letras-numeros-e-hifens
- **Exemplo:** "como-economizar-beneficios-corporativos"
- **Dica IA:** Geralmente é gerado automaticamente, mas você pode personalizar para SEO

#### 7. **URL da Imagem**
- **O que é:** Imagem principal do artigo (aparece no card e no topo do artigo)
- **Formato:** URL pública ou upload de arquivo (máx. 10MB)
- **Recomendação:** Use imagens retangulares (proporção 1200x450px ou 8:3)
- **Formatos aceitos:** JPG, PNG, WebP, SVG
- **Dica IA:** Descreva o tipo de imagem ideal para a IA gerar ou buscar

#### 8. **Iframe do YouTube**
- **O que é:** Código do iframe para vídeos do YouTube (Shorts ou vídeos normais)
- **Onde usar:** Cole aqui se quiser que o vídeo apareça ao lado direito do artigo
- **Exemplo:** `<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>`
- **Dica IA:** Se for um artigo sobre vídeo, peça o código do iframe completo

---

### 🟢 **CAMPOS DE SEO (Opcionais mas Importantes)**

#### 9. **Título SEO**
- **Limite:** 60 caracteres
- **O que é:** Título otimizado especificamente para mecanismos de busca
- **Diferença do Título:** Pode ser diferente do título principal, focado em palavras-chave
- **Exemplo:** "Consultoria VR: Economize até 30% em Benefícios Corporativos"
- **Dica IA:** Inclua palavras-chave principais no início

#### 10. **Meta Description**
- **Limite:** 160 caracteres
- **O que é:** Descrição que aparece nos resultados do Google
- **Diferença da Descrição:** Pode ser diferente, mais focada em SEO
- **Exemplo:** "Consultoria especializada em vale-refeição. Reduza custos, otimize benefícios e melhore a satisfação dos colaboradores. Solicite uma análise gratuita."
- **Dica IA:** Inclua call-to-action e palavras-chave principais

#### 11. **Palavras-chave**
- **Limite:** 200 caracteres
- **O que é:** Palavras-chave separadas por vírgulas para SEO
- **Formato:** palavra-chave1, palavra-chave2, palavra-chave3
- **Exemplo:** "vale refeição, benefícios corporativos, consultoria VR, redução de custos, gestão de RH"
- **Dica IA:** Liste 5-10 palavras-chave relevantes separadas por vírgula

#### 12. **Imagem Open Graph**
- **O que é:** Imagem que aparece ao compartilhar o artigo em redes sociais (Facebook, LinkedIn, etc.)
- **Formato:** URL pública ou upload de arquivo (máx. 10MB)
- **Recomendação:** Imagem quadrada (1200x1200px) funciona bem
- **Dica IA:** Se não preencher, usa a imagem principal automaticamente

---

### ⚙️ **CONFIGURAÇÕES**

#### 13. **Publicado** (Switch)
- **O que é:** Define se o artigo aparece no site público
- **Padrão:** ✅ Ligado (publicado)
- **Quando desligar:** Para salvar como rascunho
- **Dica IA:** Sempre deixe ligado se quiser que apareça no site

#### 14. **Destaque** (Switch)
- **O que é:** Define se o artigo aparece na seção de destaques da home
- **Padrão:** ❌ Desligado
- **Quando ligar:** Para artigos mais importantes que devem aparecer em destaque
- **Dica IA:** Use para 3-6 artigos principais apenas

---

## 🤖 **PROMPT PRONTO PARA IA**

Copie e cole este prompt, preenchendo os campos entre `[ ]`:

```
Crie um artigo completo sobre [TEMA DO ARTIGO] para o site de consultoria em RH e benefícios corporativos.

INFORMAÇÕES DO ARTIGO:
- Título (máx. 60 caracteres): [DEIXE VAZIO PARA IA CRIAR]
- Descrição (máx. 160 caracteres, pode usar <strong>texto</strong> para negrito): [DEIXE VAZIO PARA IA CRIAR]
- Tipo: [Artigo ou Vídeo]
- Categoria: [ex: Educativo, Dicas, Notícias, Guia]
- Conteúdo completo: [DEIXE VAZIO PARA IA CRIAR - em Markdown ou HTML]
- Slug (URL amigável): [DEIXE VAZIO PARA IA CRIAR baseado no título]
- Título SEO (máx. 60 caracteres): [DEIXE VAZIO PARA IA CRIAR]
- Meta Description (máx. 160 caracteres): [DEIXE VAZIO PARA IA CRIAR]
- Palavras-chave (separadas por vírgula): [DEIXE VAZIO PARA IA CRIAR]
- Publicado: Sim
- Destaque: [Sim ou Não]

CONTEXTO DO SITE:
- Site de consultoria em RH e gestão de pessoas
- Foco em: vale-refeição, benefícios corporativos, gestão de ponto, vale-transporte
- Parceiros: VR, Flash, Caju, SalaryFits, Solides
- Tom: Profissional, educativo, consultivo

REQUISITOS:
1. Título deve ser atrativo e conter palavras-chave
2. Descrição deve ser persuasiva e incluir call-to-action sutil
3. Conteúdo deve ser informativo, útil e bem estruturado
4. Incluir palavras-chave relevantes naturalmente no texto
5. SEO otimizado para busca orgânica
6. Tom profissional mas acessível

Gere TODOS os campos do checklist acima preenchendo [DEIXE VAZIO PARA IA CRIAR].
```

---

## 📌 **EXEMPLO PRÁTICO**

**Tema:** "Como escolher a melhor operadora de vale-refeição"

**Prompt para IA:**
```
Crie um artigo completo sobre "Como escolher a melhor operadora de vale-refeição" para o site de consultoria em RH e benefícios corporativos.

INFORMAÇÕES DO ARTIGO:
- Tipo: Artigo
- Categoria: Guia
- Publicado: Sim
- Destaque: Sim

Gere TODOS os campos do checklist: título (60 chars), descrição (160 chars), conteúdo completo em Markdown, slug, título SEO, meta description, palavras-chave.
```

---

## ✅ **CHECKLIST RÁPIDO ANTES DE SALVAR**

Antes de clicar em "Criar Artigo", verifique:

- [ ] Título preenchido (máx. 60 caracteres)
- [ ] Descrição preenchida (máx. 160 caracteres)
- [ ] Tipo selecionado (Artigo ou Vídeo)
- [ ] Categoria preenchida
- [ ] Conteúdo preenchido (ou iframe do YouTube se for vídeo)
- [ ] Slug gerado/editado (URL amigável)
- [ ] Imagem principal adicionada (recomendado)
- [ ] Título SEO preenchido (recomendado)
- [ ] Meta Description preenchida (recomendado)
- [ ] Palavras-chave preenchidas (recomendado)
- [ ] Switch "Publicado" ligado (se quiser que apareça no site)
- [ ] Switch "Destaque" configurado conforme necessário

---

## 💡 **DICAS EXTRAS**

1. **Slug automático:** O slug é gerado automaticamente do título, mas você pode editar para melhorar SEO
2. **Imagens:** Se não tiver imagem, o sistema usa uma padrão, mas é sempre melhor ter uma imagem personalizada
3. **SEO:** Preencher os campos de SEO melhora muito o posicionamento no Google
4. **Destaque:** Não coloque muitos artigos em destaque (máx. 6), senão perde o efeito
5. **Categorias:** Use categorias consistentes para facilitar organização futura
6. **Markdown:** Use `## Título` para subtítulos, `**negrito**` para destacar, `- item` para listas

---

## 🚀 **PRONTO!**

Agora você tem tudo que precisa para criar artigos completos e otimizados para SEO!
