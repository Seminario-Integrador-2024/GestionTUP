import { Flex, Image, FlexProps } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
  icon: string;
  color: string;
}

export default function NavItem({ icon, color, ...props }: NavItemProps) {
  return (
    <Flex
      align="center"
      justify="center"
      p={4}
      _hover={{ bg: '#cfe0f3' }}
      {...props}
      borderRadius="5px"
      backgroundColor={color}
    >
      <Image src={icon} boxSize="30px" />
    </Flex>
  );
}
