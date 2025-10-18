import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    background-color: ${({ theme }) => theme.colors.background};
  }

  body {
    font-family: ${({ theme }) => theme.fonts.sans}, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: ${({ theme }) => theme.colors.foreground};
    background:
      radial-gradient(circle at top right, rgba(246, 187, 192, 0.28), transparent 45%),
      radial-gradient(circle at bottom left, rgba(247, 210, 216, 0.4), transparent 55%),
      ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
    overflow: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  code {
    font-family: ${({ theme }) => theme.fonts.mono}, ui-monospace, SFMono-Regular, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }
`;

export default GlobalStyle;
