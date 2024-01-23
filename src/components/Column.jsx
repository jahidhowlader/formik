// src/components/Column.js
import { Box, Flex, Text } from '@chakra-ui/react';

const Column = ({ title, items }) => {
    return (
        <Box p={4} bg="gray.200" rounded="md" mr={4}>
            <Text fontSize="lg" mb={4}>
                {title}
            </Text>
            <Flex direction="column">
                {items.map((item, index) => (
                    <Box key={index} p={2} mb={2} bg="white" rounded="md">
                        {item}
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default Column;
