import {
    Box,
    Container,
    Flex,
    HStack,
} from "@chakra-ui/react";
import { PrivacyPolicyDialog } from "./PrivacyPolicyDialog";
import { InfoDialog } from "./InfoDialog";

export const Footer = () => {
    return (
        <Box
            as="footer"
            width="full"
            bg="bg.panel"
            borderTop="1px"
            borderColor="border.default"
            py="2"
            mt="auto"
        >
            <Container maxW="container.xl">
                <Flex justify="center" align="center">
                    <HStack gap={4}>
                        <InfoDialog />
                        <PrivacyPolicyDialog />
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};
