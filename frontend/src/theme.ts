"use client";

import { createTheme } from "@mui/material/styles";

/**
 * Tema MUI da aplicação. Usa CSS variables + `colorSchemes` para suportar
 * light e dark automaticamente (segue a preferência do sistema).
 */
export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#0f766e" },
        secondary: { main: "#6366f1" },
        background: { default: "#f4f6f8", paper: "#ffffff" },
        success: { main: "#16a34a" },
        warning: { main: "#d97706" },
        error: { main: "#dc2626" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#2dd4bf" },
        secondary: { main: "#818cf8" },
        background: { default: "#0b1120", paper: "#111827" },
        success: { main: "#4ade80" },
        warning: { main: "#fbbf24" },
        error: { main: "#f87171" },
      },
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    h4: { fontWeight: 700, letterSpacing: -0.5 },
    h6: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0, variant: "outlined" },
      styleOverrides: {
        root: {
          transition:
            "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.10)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});
