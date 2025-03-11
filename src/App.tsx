import { useState, useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";
import {
  Box,
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
  Container,
  Flex,
  Heading,
  EmptyState,
  List,
  NativeSelect,
  Em,
} from "@chakra-ui/react"
import { ColorModeToggle } from "./components/color-mode-toggle.tsx"
import { initDatabase, searchSongs, type Song } from "./utils/database.ts"
import { toaster } from "./components/ui/toaster.tsx"
import { LuSearch } from "react-icons/lu"

function App() {
  const [titleQuery, setTitleQuery] = useState("")
  const [artistQuery, setArtistQuery] = useState("")
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [empty, setEmpty] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)
  const [limit, setLimit] = useState(50)
  const [totalCount, setTotalCount] = useState(0)

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
  // Debounce search inputs
  const debounceMs = 20
  const debouncedTitle = useDebounce(titleQuery, debounceMs);
  const debouncedArtist = useDebounce(artistQuery, debounceMs);
  useEffect(() => {
    if (!initialized) return;

    const search = async () => {
      setLoading(true);
      setError(null);

      try {
        const { results, total } = await searchSongs(debouncedTitle, debouncedArtist, limit);
        setSongs(results);
        setTotalCount(total);
        setEmpty(results.length === 0);
      } catch (err) {
        console.error("Error searching songs:", err);
        setError("An error occurred while searching. Please try again.");
        toaster.error({ title: "An error occurred while searching", description: "Please try again." });
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedTitle, debouncedArtist, limit, initialized]);

  return (
    <Box>
      {/* Fixed Navigation Bar */}
      <Box
        as="nav"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="sticky"
        bg="bg.panel"
        borderBottom="1px"
        borderColor="border.default"
        py="3"
        shadow="sm"
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading hideBelow="lg" fontWeight="bold">
              JOYSOUND for STREAMER Search
            </Heading>

            <Flex flex="1" justify="center" maxW={{ base: "100%", md: "70%" }} mx="4">
              <HStack gap={2} width="100%">
                <Input
                  placeholder="曲名"
                  value={titleQuery}
                  onChange={(e) => setTitleQuery(e.target.value)}
                  size="sm"
                  disabled={!initialized}
                />
                <Input
                  placeholder="アーティスト"
                  value={artistQuery}
                  onChange={(e) => setArtistQuery(e.target.value)}
                  size="sm"
                  disabled={!initialized}
                />
              </HStack>
            </Flex>

            <Box>
              <ClientOnly fallback={<Skeleton w="8" h="8" rounded="md" />}>
                <ColorModeToggle />
              </ClientOnly>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box pt="24" pb="8">
        <Container maxW="container.xl">
          <VStack gap="6">
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
              <Box width="100%">
                <VStack gap="4" align="stretch">
                  {songs.map((song) => (
                    <Card.Root key={`${song.id}-${song.song_no}`} size="sm" width="100%">
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
                {empty && (
                  <EmptyState.Root size="lg">
                    <EmptyState.Content>
                      <EmptyState.Indicator>
                        <LuSearch />
                      </EmptyState.Indicator>
                      <VStack textAlign="center">
                        <EmptyState.Title>検索結果なし</EmptyState.Title>
                        <EmptyState.Description>
                          No songs found matching your search criteria.
                        </EmptyState.Description>
                      </VStack>
                      <List.Root variant="marker">
                        <List.Item>曲名・アーティスト名を部分一致で検索します</List.Item>
                        <List.Item>ひらがな・カタカナのみで入力すると読みがなでも検索します（前方一致）</List.Item>
                      </List.Root>
                    </EmptyState.Content>
                  </EmptyState.Root>
                )}
              </Box>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Fixed Results Count and Limit Control */}
      <Box
        position="fixed"
        bottom="0"
        right="0"
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border.default"
        roundedTopLeft="lg"
        p="2"
        shadow="sm"
      >
        <VStack gap="2" align="stretch">
          <HStack gap="2" fontSize="xs" color="fg.muted">
            <Text><Em fontWeight="bold" fontStyle="normal">{totalCount}</Em> 件ヒット</Text>
            <NativeSelect.Root
              size="xs"
              width="auto"
            >
              <NativeSelect.Field
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value="10">10(軽)</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500(重)</option>
                <option value="50000">限界</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Text>件まで表示</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default App
