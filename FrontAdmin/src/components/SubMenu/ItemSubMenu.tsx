import { Text, Box, Flex, Image, FlexProps, Tooltip } from '@chakra-ui/react';

interface SubMenuProps extends FlexProps {
    color: string;
    title: string;
}

export default function ItemSubMenu({ color, title, ...props }: SubMenuProps) {
    return (
        <Box>
            <Flex
                align="center"
                p={2}
                pr={4}
                _hover={{ bg: 'secundaryHover' }}
                backgroundColor={color}
                {...props}
            >
                <Text>{title}</Text>
            </Flex>
        </Box>
    );
}