import { Box, Container, VStack, Alert } from "@chakra-ui/react";
import { Navigation } from "./components/Navigation";
import { ResultsControl } from "./components/ResultsControl";
import { ResultsView } from "./components/ResultsView";
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

      <Box pt="24" pb="8">
        <Container maxW="container.xl">
          <VStack gap="6">
            {error && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Description>{error}</Alert.Description>
              </Alert.Root>
            )}

            <ResultsView
              songs={songs}
              loading={loading || !initialized}
            />
          </VStack>
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
