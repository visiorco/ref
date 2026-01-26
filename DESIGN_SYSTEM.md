# 🎨 Lendária Design System v1.0

> Design System oficial baseado na landing page do Ecossistema Lendário.
> Use este documento como referência para manter consistência visual em todas as páginas e aplicações.

---

## 📦 Fundação

### Cores

#### Cores Primárias
| Nome | Hex | Uso |
|------|-----|-----|
| **Background** | `#000000` | Fundo principal de todas as páginas |
| **Foreground** | `#FFFFFF` | Texto principal e elementos brancos |
| **Accent (Ouro)** | `#FFD44A` | CTAs primários, destaques, ícones de ação |
| **Accent Hover** | `#FFC107` | Hover de botões primários |

#### Cores de Texto
| Nome | Hex/RGBA | Uso |
|------|----------|-----|
| **Text Primary** | `#FFFFFF` | Títulos e texto de destaque |
| **Text Secondary** | `#B8B8B8` | Subtítulos e texto de corpo |
| **Text Muted** | `rgba(255,255,255,0.5)` | Labels, placeholders |
| **Text Disabled** | `rgba(255,255,255,0.24)` | Textos inativos |

#### Cores de Superfície
| Nome | Hex/RGBA | Uso |
|------|----------|-----|
| **Surface Dark** | `#161616` | Cards, áreas elevadas |
| **Surface Border** | `#242424` | Bordas de cards e separadores |
| **Glass BG** | `rgba(255,255,255,0.08)` | Glassmorphism backgrounds |
| **Glass Border** | `rgba(255,255,255,0.04)` | Bordas de elementos glass |

---

### Tipografia

#### Fonte Principal
```css
font-family: 'Inter', sans-serif;
```

#### Escala Tipográfica

| Estilo | Desktop | Tablet | Mobile | Weight | Line Height |
|--------|---------|--------|--------|--------|-------------|
| **H1 (Hero)** | 48px | 32px | 24px | 600 | 1.4em |
| **H2 (Section)** | 64px | 48px | 32px | 600 | 1.1 |
| **H3 (Card Title)** | 32px | 28px | 24px | 600 | 1.2 |
| **Body Large** | 18px | 18px | 16px | 500 | 1.6 |
| **Body** | 16px | 16px | 14px | 500 | 1.75 |
| **Small/Label** | 14px | 14px | 13px | 500 | 1.4 |
| **Caption** | 10px | 10px | 8px | 500 | 1.2-1.4em |

#### Estilos Especiais
- **Letter Spacing Títulos:** `-0.02em`
- **Uppercase Labels:** `letter-spacing: 0.1em; text-transform: uppercase;`

---

### Espaçamentos

#### Sistema de Grid (8px base)

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | 4px | Micro gaps (ícones) |
| `--space-2` | 8px | Gaps entre elementos inline |
| `--space-3` | 12px | Padding interno pequeno |
| `--space-4` | 16px | Gap padrão entre elementos |
| `--space-5` | 24px | Padding interno de cards |
| `--space-6` | 32px | Gap entre blocos |
| `--space-7` | 48px | Padding de seções (tablet) |
| `--space-8` | 64px | Gap entre seções (desktop) |

#### Paddings de Container

| Breakpoint | Lateral | Descrição |
|------------|---------|-----------|
| Desktop (>1024px) | 24px | Padrão |
| Tablet (≤1024px) | 48px | Aumenta respiro lateral |
| Mobile (≤768px) | 24px | Compacto |

#### Gaps Entre Seções

| Breakpoint | Padding Top/Bottom | Total Gap |
|------------|-------------------|-----------|
| Desktop | 64px / 64px | 128px |
| Tablet | 32px / 32px | 64px |
| Mobile | 24px / 24px | 48px |

#### Gap Título → Conteúdo

| Breakpoint | Valor |
|------------|-------|
| Desktop | 64px |
| Tablet | 48px |
| Mobile | 24px |

---

### Breakpoints

```css
/* Desktop First */
@media (max-width: 1280px) { /* Large Tablet */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 580px)  { /* Small Mobile */ }
```

---

## 🧱 Componentes

### Botões

#### Botão Primário (Solid)
```css
.btn-primary {
    background: #FFD44A;
    color: #000000;
    border: 1px solid #FFD44A;
    border-radius: 8px;
    padding: 18px 24px;
    font-size: 16px;
    font-weight: 500;
    transition: transform 0.44s ease, background 0.3s ease;
}
.btn-primary:hover {
    background: #FFC107;
    transform: translateY(-4px);
}
```

#### Botão Secundário (Glass)
```css
.btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px) saturate(180%);
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    padding: 19px 24px;
    font-size: 16px;
    font-weight: 500;
}
.btn-secondary:hover {
    border-color: rgba(255, 255, 255, 0.08);
    transform: translateY(-4px);
}
```

#### Tamanhos Mobile
```css
/* Mobile */
padding: 12px 16px;
font-size: 14px;
```

---

### Cards

#### Card Padrão (Surface)
```css
.card {
    background: #161616;
    border: 1px solid #242424;
    border-radius: 16px;
    padding: 48px; /* Desktop */
    padding: 40px; /* Tablet */
    padding: 32px 24px; /* Mobile */
}
```

#### Card com Borda Animada
```css
@property --border-angle {
    inherits: false;
    initial-value: 0deg;
    syntax: '<angle>';
}

.card-animated {
    background: 
        linear-gradient(#161616, #161616) padding-box,
        conic-gradient(from var(--border-angle), #242424 80%, #646464 86%, #646464 90%, #646464 94%, #242424) border-box;
    border: 1px solid transparent;
    border-radius: 16px;
}

.card-animated:hover {
    animation: rotateBorder 6.4s linear infinite;
}

@keyframes rotateBorder {
    to { --border-angle: 360deg; }
}
```

---

### Inputs

#### Input com Label Flutuante
```css
.input {
    width: 100%;
    padding: 20px;
    font-size: 16px;
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    outline: none;
    transition: border-color 400ms ease;
}
.input:focus {
    border-color: rgba(255, 255, 255, 0.08);
}

/* Label flutuante quando ativo */
.floating-label-active {
    top: 0;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.08);
    padding: 4px 6px;
    font-size: 12px;
    border-radius: 4px;
}
```

---

### Efeitos Visuais

#### Glassmorphism
```css
.glass {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px) saturate(180%);
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.04);
}
```

#### Gradient Text (Shimmer)
```css
.gradient-text {
    background: linear-gradient(110deg,
        #ffffff 0%, #ffffff 40%,
        #b8b8b8 50%,
        #ffffff 60%, #ffffff 100%);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 13s ease-in-out infinite;
}

@keyframes shimmer {
    0%, 100% { background-position: 200% 0; }
    30% { background-position: -200% 0; }
}
```

#### Dark Overlay (Imagens/Vídeos)
```css
.dark-overlay {
    background: rgba(36, 36, 36, 0.4);
}

/* Gradient Overlay (Newsletter) */
.gradient-overlay {
    background: linear-gradient(to bottom,
        rgba(22, 22, 22, 0) 0%,
        rgba(22, 22, 22, 0.3) 8%,
        rgba(22, 22, 22, 0.6) 16%,
        rgba(22, 22, 22, 0.8) 24%,
        rgba(22, 22, 22, 0.96) 32%,
        rgba(22, 22, 22, 0.96) 96%,
        rgba(22, 22, 22, 1) 100%);
}
```

---

## 🎭 Animações

### Transições Padrão
```css
/* Suave */
transition: all 0.3s ease;

/* Interação (Botões) */
transition: transform 0.44s ease, background 0.3s ease;

/* Entrada de Elementos */
transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Animação de Entrada (Scroll Reveal)
```css
/* Estado inicial */
.reveal-initial {
    opacity: 0;
    transform: translateY(60px);
}

/* Estado visível */
.reveal-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Com perspectiva 3D */
.reveal-3d-initial {
    opacity: 0;
    transform: translateY(150px) rotateX(15deg);
    transform-origin: center bottom;
}
.reveal-3d-visible {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
}
```

### Hover de Botões (Letter Roll)
```css
.btn-letter-roll:hover span {
    transform: translateY(-20px);
}
/* Delays escalonados por letra */
span:nth-child(1) { transition-delay: 0.05s; }
span:nth-child(2) { transition-delay: 0.1s; }
/* ... continuar para cada letra */
```

---

## 📱 Responsividade

### Padrão de Media Queries
```css
/* Tablet */
@media (max-width: 1024px) {
    .section { padding: 32px 0; }
    .container { padding: 0 48px; max-width: 100%; }
    .title { font-size: 48px; }
    .section-header { margin-bottom: 48px; }
}

/* Mobile */
@media (max-width: 768px) {
    .section { padding: 24px 0; }
    .container { padding: 0 24px; max-width: 100%; }
    .title { font-size: 32px; }
    .section-header { margin-bottom: 24px; }
    .grid { grid-template-columns: 1fr; gap: 24px; }
}
```

### Regras de Layout Mobile
1. **Grids:** Sempre coluna única (`1fr`) no mobile
2. **Botões lado a lado:** Permitido se couber, senão empilhar
3. **Cards:** 100% da largura com padding lateral reduzido
4. **Imagens/Vídeos:** `border-radius: 0` em full-width mobile

---

## 🔗 Recursos Externos

### Fontes
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Ícones (Flaticon UIcons)
```html
<link href="https://cdn-uicons.flaticon.com/3.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css" rel="stylesheet">
<link href="https://cdn-uicons.flaticon.com/2.1.0/uicons-brands/css/uicons-brands.css" rel="stylesheet">
```

---

## ✅ Checklist de Implementação

Ao criar uma nova página, verifique:

- [ ] Usar `background: #000000` no body
- [ ] Importar fonte Inter do Google Fonts
- [ ] Aplicar padding de container correto por breakpoint
- [ ] Usar gaps entre seções conforme tabela
- [ ] Aplicar efeito de reveal no scroll
- [ ] Usar cores de texto corretas (primary/secondary)
- [ ] Botões primários em ouro `#FFD44A`
- [ ] Cards com `#161616` e borda `#242424`
- [ ] Títulos com `letter-spacing: -0.02em`
- [ ] Verificar responsividade nos 3 breakpoints

---

*Design System gerado a partir da landing page VitrineLendária v1.0*
