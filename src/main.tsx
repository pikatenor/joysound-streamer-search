import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "./components/ui/toaster"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Toaster />
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>,
)
