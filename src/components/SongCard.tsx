import {
  Box,
  Card,
  IconButton,
  Link,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { Song } from "../types/entity";
import { useAppContext } from "../AppContext";

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  const { setArtistQuery, setTitleQuery } = useAppContext();
  return (
    <Card.Root as="li" key={`${song.id}-${song.song_no}`} size="sm" width="100%">
      <Box hideFrom="md" pos="absolute" bottom="0" right="0">
        <Text color="fg.subtle" textStyle="2xs">{`#${song.group_id}-${song.id} (${song.song_no})`}</Text>
      </Box>
      <Card.Body gap="2">
        <Stack gap="2" direction={{ base: "column", md: "row" }}>
          <Link href={`https://www.joysound.com/web/search/song/${song.group_id}`} target="_blank" rel="noopener noreferrer">
            <Text fontWeight="semibold" textStyle="sm">{song.title}</Text>
          </Link>
          <Separator hideBelow="md" orientation="vertical"></Separator>
          <Stack direction="row" gap="1" align="center">
            <Link href={`https://www.joysound.com/web/search/artist/${song.artist_id}`} target="_blank" rel="noopener noreferrer">
              <Text fontWeight="semibold" color="fg.muted" textStyle="sm">{song.artist}</Text>
            </Link>
            <IconButton
              aria-label={`${song.artist}で検索`}
              size="2xs"
              variant="ghost"
              color="fg.subtle"
              onClick={() => {
                setTitleQuery("");
                setArtistQuery(song.artist);
              }}
            >
              <LuSearch />
            </IconButton>
          </Stack>
          <Separator hideBelow="md" flex="1" opacity="0" />
          <Text hideBelow="md" flexShrink="0" color="fg.subtle" textStyle="2xs">{`#${song.group_id}-${song.id} (${song.song_no})`}</Text>
        </Stack>
        <Text color="fg.muted" textStyle="xs">{song.aux_info}</Text>
      </Card.Body>
    </Card.Root>
  );
}
