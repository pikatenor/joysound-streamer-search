import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Toaster } from "./components/ui/toaster"
import { AppProvider } from './AppContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={createSystem(defaultConfig, {
      theme: {
        tokens: {
          colors: {
            yellow: {
              50: { value: "#F9FFE5" },
              100: { value: "#F0FFB8" },
              200: { value: "#E6FF8A" },
              300: { value: "#DCFF5C" },
              400: { value: "#D2FF2E" },
              500: { value: "#C8FF00" },
              600: { value: "#A0CC00" },
              700: { value: "#789900" },
              800: { value: "#506600" },
              900: { value: "#283300" },
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
        <AppProvider>
          <Toaster />
          <App />
        </AppProvider>
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>,
)

fetch('/__/firebase/init.json').then(async response => {
  initializeApp(await response.json());
  getAnalytics();
});
