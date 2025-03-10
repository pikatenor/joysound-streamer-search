import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "./components/ui/toaster"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={createSystem(defaultConfig, {
      theme: {
        tokens: {
          colors: {
            yellow: {
              50: "#F9FFE5",
              100: "#F0FFB8",
              200: "#E6FF8A",
              300: "#DCFF5C",
              400: "#D2FF2E",
              500: "#C8FF00",
              600: "#A0CC00",
              700: "#789900",
              800: "#506600",
              900: "#283300",
            },
          },
        },
      },
      globalCss: {
        html: {
          colorPalette: "yellow",
        },
      },
    })}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Toaster />
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>,
)
