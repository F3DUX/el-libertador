/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== PALETA PATRIÓTICA ARGENTINA =====
        // Celeste oficial de la Bandera Argentina
        "celeste-patrio":   "#75AADB",
        "celeste-claro":    "#EAF3FC",
        "celeste-medio":    "#BBDAF4",
        "celeste-brillante":"#4A90E2",
        // Blanco
        "blanco-patrio":    "#FFFFFF",
        // Azules profundos (escudo, ejército)
        "azul-profundo":    "#1B365D",
        "azul-marino":      "#112244",
        "azul-noche":       "#0A1628",
        // Dorado del Sol de Mayo
        "dorado-sol":       "#D4AF37",
        "dorado-brillante": "#F5C518",
        "dorado-apagado":   "#B8952A",
        // Rojo para alertas / pérdidas
        "rojo-patrio":      "#C0392B",
        "rojo-suave":       "#E74C3C",
        // Fondo luminoso
        "fondo-patrio":     "#F0F6FC",
        "fondo-suave":      "#EAF3FC",
        // Texto
        "texto-patrio":     "#1A2530",
        "texto-suave":      "#3A4A5A",
        // Marrón SOLO para pequeños acentos de cuero/madera
        "marron-acento":    "#4A2E1B",
        "cuero":            "#6B3F1A",
      },
      fontFamily: {
        cinzel:      ["var(--font-cinzel)", "Palatino Linotype", "serif"],
        cormorant:   ["var(--font-cormorant)", "Georgia", "serif"],
        merriweather:["var(--font-merriweather)", "Times New Roman", "serif"],
      },
      boxShadow: {
        "patrio":  "0 10px 30px -5px rgba(27,54,93,0.2), 0 6px 12px -4px rgba(117,170,219,0.2)",
        "patrio-lg":"0 20px 50px -10px rgba(27,54,93,0.25), 0 10px 20px -6px rgba(117,170,219,0.15)",
        "gold":    "0 0 18px rgba(212,175,55,0.55)",
        "gold-lg": "0 0 30px rgba(212,175,55,0.7)",
        "card":    "0 4px 16px rgba(27,54,93,0.08)",
        "card-hover":"0 12px 32px rgba(27,54,93,0.15)",
        "inset-celeste": "inset 0 2px 8px rgba(117,170,219,0.2)",
      },
      backgroundImage: {
        "bandera": "linear-gradient(180deg, #75AADB 33%, #FFFFFF 33%, #FFFFFF 67%, #75AADB 67%)",
        "patrio-hero": "linear-gradient(135deg, #1B365D 0%, #112244 50%, #0A1628 100%)",
        "celeste-fade": "linear-gradient(180deg, #EAF3FC 0%, #F0F6FC 100%)",
        "gold-shine": "linear-gradient(90deg, #B8952A, #F5C518, #D4AF37, #F5C518, #B8952A)",
      },
      animation: {
        "spin-slow": "spin-slow 80s linear infinite",
        "glow":      "glow-pulse 2.5s ease-in-out infinite",
        "blink":     "blink 1s step-end infinite",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
