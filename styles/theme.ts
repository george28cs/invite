const theme = {
  colors: {
    background: "#fff7f9",
    surface: "#ffeef5",
    foreground: "#3d2a2f",
    muted: "#8c6a70",
    accent: "#b6787a",
    border: "#f3cdd5",
    highlight: "#fbe0e6",
  },
  fonts: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
    serif: "var(--font-playfair)",
  },
  radii: {
    full: "9999px",
    lg: "18px",
    md: "12px",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "2rem",
    xl: "3rem",
  },
  shadow: {
    soft: "0 20px 40px -25px rgba(15, 23, 42, 0.25)",
  },
} as const;

export type AppTheme = typeof theme;

export default theme;
