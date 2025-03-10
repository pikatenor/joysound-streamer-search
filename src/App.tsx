import { useState, useEffect, useCallback } from "react"
import {
  Box,
  Button,
  ClientOnly,
  Skeleton,
  VStack,
  HStack,
  Input,
  Text,
  Spinner,
  Center,
  Link,
  Alert,
  Card,
  Separator,
  Stack,
} from "@chakra-ui/react"
import { ColorModeToggle } from "./components/color-mode-toggle.tsx"
import { initDatabase, searchSongs, type Song } from "./utils/database.ts"
import { toaster } from "./components/ui/toaster.tsx"

function App() {
  const [titleQuery, setTitleQuery] = useState("")
  const [artistQuery, setArtistQuery] = useState("")
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  // Initialize the database on component mount
  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase()
        setInitialized(true)
      } catch (err) {
        console.error("Failed to initialize database:", err)
        setError("Failed to initialize database. Please check the console for details.")
        toaster.error({ title: "Failed to initialize database", description: "Please check the console for details." })
      }
    }

    init()
  }, [])

  // Search function
  const handleSearch = useCallback(async () => {
    if (!initialized) {
      setError("Database not initialized yet. Please wait...")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const results = await searchSongs(titleQuery, artistQuery)
      setSongs(results)

      if (results.length === 0) {
        setError("No songs found matching your search criteria.")
      }
    } catch (err) {
      console.error("Error searching songs:", err)
      setError("An error occurred while searching. Please try again.")
      toaster.error({ title: "An error occurred while searching", description: "Please try again." })
    } finally {
      setLoading(false)
    }
  }, [titleQuery, artistQuery, initialized])

  // Handle Enter key press in input fields
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Box textAlign="center" fontSize="xl" pt="20vh">
      <VStack gap="8">
        <Text fontSize="2xl" fontWeight="bold">
          JOYSOUND Song Search
        </Text>
        <HStack gap={4}>
          <Input
            placeholder="Title"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            placeholder="Artist"
            value={artistQuery}
            onChange={(e) => setArtistQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={handleSearch}
            loading={loading}
            disabled={!initialized}
          >
            Search
          </Button>
        </HStack>

        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Description>{error}</Alert.Description>
          </Alert.Root>
        )}

        {loading ? (
          <Center p={8}>
            <Spinner size="xl" />
          </Center>
        ) : (
          <Box>
            <VStack gap="4">
              {songs.map((song) => (
                <Card.Root size="sm" width="100%">
                  <Box hideFrom="md" pos="absolute" bottom="0" right="0">
                    <Text color="fg.subtle" textStyle="2xs">{`#${song.group_id}-${song.id} (${song.song_no})`}</Text>
                  </Box>
                  <Card.Body gap="2">
                    <Stack gap="2" direction={{ base: "column", md: "row" }}>
                      <Link href={`https://www.joysound.com/web/search/song/${song.group_id}`}>
                        <Text fontWeight="semibold" textStyle="sm">{song.title}</Text>
                      </Link>
                      <Separator hideBelow="md" orientation="vertical"></Separator>
                      <Text fontWeight="semibold" color="fg.muted" textStyle="sm">{song.artist}</Text>
                      <Separator hideBelow="md" flex="1" opacity="0" />
                      <Text hideBelow="md" flexShrink="0" color="fg.subtle" textStyle="2xs">{`#${song.group_id}-${song.id} (${song.song_no})`}</Text>
                    </Stack>
                    <Text color="fg.muted" textStyle="xs">{song.aux_info}</Text>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>

      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
      </Box>
    </Box>
  )
}

export default App
