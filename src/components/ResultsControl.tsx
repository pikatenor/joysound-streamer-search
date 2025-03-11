import {
  Box,
  Em,
  HStack,
  NativeSelect,
  Text,
  VStack,
} from "@chakra-ui/react";
import { memo } from "react";
import { LIMIT_OPTIONS } from "../constants";

interface ResultsControlProps {
  totalCount: number;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export const ResultsControl = memo(function ResultsControl({
  totalCount,
  limit,
  onLimitChange,
}: ResultsControlProps) {
  return (
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
              onChange={(e) => onLimitChange(Number(e.target.value))}
            >
              {LIMIT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Text>件まで表示</Text>
        </HStack>
      </VStack>
    </Box>
  );
});
