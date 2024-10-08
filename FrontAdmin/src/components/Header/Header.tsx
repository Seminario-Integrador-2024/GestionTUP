import { Box, Flex } from '@chakra-ui/react';
import { HeaderContent } from './HeaderContent';

export default function Header({ onOpen }: { onOpen: any }) {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  //const element = useRoutes(routes);

  return (
    <Flex minW="100vh">
      <HeaderContent onOpen={onOpen} />
    </Flex>
  );
}
