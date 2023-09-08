import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from "@/providers/dark-theme";

export default function Document() {
  return (
    
    <Html lang="en">
      <Head />
      <body>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Main />
        <NextScript />
      </ThemeProvider>
      </body>
    </Html>
  )
}
