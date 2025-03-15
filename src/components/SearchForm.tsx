import {
  HStack,
  Input,
  Flex,
} from "@chakra-ui/react";

interface SearchFormProps {
  titleQuery: string;
  artistQuery: string;
  onTitleChange: (value: string) => void;
  onArtistChange: (value: string) => void;
  disabled: boolean;
}

export const SearchForm = ({
  titleQuery,
  artistQuery,
  onTitleChange,
  onArtistChange,
  disabled,
}: SearchFormProps) => {
  return (
    <Flex flex="1" justify="center" maxW={{ base: "100%", md: "70%" }} mx="4">
      <HStack gap={2} width="100%">
        <Input
          placeholder="曲名"
          value={titleQuery}
          onChange={(e) => onTitleChange(e.target.value)}
          size="sm"
          disabled={disabled}
        />
        <Input
          placeholder="アーティスト"
          value={artistQuery}
          onChange={(e) => onArtistChange(e.target.value)}
          size="sm"
          disabled={disabled}
        />
      </HStack>
    </Flex>
  );
};
