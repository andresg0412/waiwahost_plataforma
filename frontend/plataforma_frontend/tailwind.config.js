module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "../property-management-platform/components/**/*.{ts,tsx,js,jsx,mdx}",
    "../property-management-platform/app/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ── Waiwa Brand Palette ───────────────────────────────────────
        // #a197ad mauve  | #b1c1e4 sky    | #b76a07 rust
        // #b48000 ochre  | #e7b61d amber  | #d7f313 lime  | #0c4136 forest
        "waiwa-forest": "#0c4136",   // primary dark – headers, sidebar, CTAs
        "waiwa-amber": "#e7b61d",   // primary accent – badges, highlights
        "waiwa-lime": "#d7f313",   // secondary accent – today indicators
        "waiwa-rust": "#b76a07",   // warm accent – pending states
        "waiwa-ochre": "#b48000",   // warm mid – secondary action
        "waiwa-sky": "#b1c1e4",   // light blue – backgrounds, tags
        "waiwa-mauve": "#a197ad",   // muted – disabled, blocked
        // ── Backward-compat aliases (old token names → brand colors) ──
        "tourism-navy": "#0c4136",
        "tourism-teal": "#0c4136",
        "tourism-sage": "#a197ad",
        "tourism-gold": "#e7b61d",
        "tourism-cream": "#f5f4f0",
        "tourism-slate": "#a197ad",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
