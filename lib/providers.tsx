"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import StyledComponentsRegistry from "@/lib/styled-components";
import GlobalStyle from "@/styles/global-style";
import theme from "@/styles/theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
