import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { LuInfo } from "react-icons/lu";
import { ColorModeToggle } from "./color-mode-toggle";
import { InfoDialog } from "./InfoDialog";
import { SearchForm } from "./SearchForm";

interface NavigationProps {
  titleQuery: string;
  artistQuery: string;
  onTitleChange: (value: string) => void;
  onArtistChange: (value: string) => void;
  disabled: boolean;
}

export const Navigation = ({
  titleQuery,
  artistQuery,
  onTitleChange,
  onArtistChange,
  disabled,
}: NavigationProps) => {
  return (
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
          <Heading hideBelow="lg" fontWeight="bold" marginEnd="4">
            JOYSOUND for STREAMER Search
          </Heading>

          <Box>
            <InfoDialog>
              <IconButton aria-label="open 'About this app'">
                <LuInfo />
              </IconButton>
            </InfoDialog>
          </Box>

          <SearchForm
            titleQuery={titleQuery}
            artistQuery={artistQuery}
            onTitleChange={onTitleChange}
            onArtistChange={onArtistChange}
            disabled={disabled}
          />

          <Box>
            <ColorModeToggle />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
