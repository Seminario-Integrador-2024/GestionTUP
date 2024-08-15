import { useToast as useChakraToast } from '@chakra-ui/react';

export const useToast = () => {
  const toast = useChakraToast();

  const showToast = (titulo: string, descripcion: string, estado: string) => {
    toast({
      title: titulo,
      description: descripcion,
      status:
        estado === 'success' ||
        estado === 'info' ||
        estado === 'warning' ||
        estado === 'error' ||
        estado === 'loading'
          ? estado
          : undefined,
      duration: 5000,
      isClosable: true,
    });
  };

  return showToast;
};
