import { Box, Container, VStack, Alert } from "@chakra-ui/react";
import { Navigation } from "./components/Navigation";
import { ResultsControl } from "./components/ResultsControl";
import { ResultsView } from "./components/ResultsView";
import { Footer } from "./components/Footer";
import { useAppContext } from "./AppContext";

function App() {
  const {
    titleQuery,
    artistQuery,
    songs,
    totalCount,
    limit,
    loading,
    error,
    initialized,
    setTitleQuery,
    setArtistQuery,
    setLimit,
  } = useAppContext();

  return (
    <Box>
      <Navigation
        titleQuery={titleQuery}
        artistQuery={artistQuery}
        onTitleChange={setTitleQuery}
        onArtistChange={setArtistQuery}
        disabled={!initialized}
      />

      <Box pt="24" pb="8" display="flex" flexDirection="column" minHeight="calc(100vh - 20px)">
        <Container maxW="container.xl" flex="1" display="flex" flexDirection="column">
          <VStack gap="6" flex="1">
            {error && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Description>{error}</Alert.Description>
              </Alert.Root>
            )}

            <Box flex="1" width="full" minHeight="300px">
              <ResultsView
                songs={songs}
                loading={loading || !initialized}
              />
            </Box>
          </VStack>

          <Footer />
        </Container>
      </Box>

      <ResultsControl
        totalCount={totalCount}
        limit={limit}
        onLimitChange={setLimit}
      />
    </Box>
  )
}

export default App
