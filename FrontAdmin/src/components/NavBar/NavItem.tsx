import { Flex, Image, FlexProps, Tooltip  } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
  icon: string;
  color: string;
  title: string;
}

export default function NavItem({ icon, color, title, ...props }: NavItemProps) {
  return (
    <Tooltip 
      label={title} 
      placement='right' 
      pt="8px"
      pb="8px"
      pl="20px"
      pr="20px"
      ml="8px"
      bg="secundaryHover"
      color="black"
      hasArrow 
      borderRadius="10px"
      >
      <Flex
        align="center"
        justify="center"
        p={4}
        _hover={{ bg: 'secundaryHover' }}
        {...props}
        borderRadius="5px"
        backgroundColor={color}
      >
        
        <Image src={icon} boxSize="30px" />
        
      </Flex>
    </Tooltip>
  );
}
