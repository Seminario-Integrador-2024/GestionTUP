import { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import {
  Flex,
  Box,
  Link,
  Button,
  Text,
  Input,
  FormControl,
  Image,
  Stack,
  HStack,
  VStack,
  StackDivider,
  useToast,
} from '@chakra-ui/react';
import iconUpload from '../../icons/subir.png';
function Dropzone() {
  const toast = useToast();
  const [filePreview, setFilePreview] = useState<string | null>(null); // Estado para la vista previa del archivo
  //fuente:
  //https://github.com/fazt/react-dropzone-tutorial
  // const [file, setFile] = useState();
  const onDrop = useCallback((acceptedFiles: any[]) => {
    console.log(acceptedFiles[0]);
    const file = acceptedFiles[0];
    setFilePreview(URL.createObjectURL(file)); // Crear una URL para la vista previa
  }, []);

  // Función que se ejecuta cuando se rechazan archivos
  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      fileRejections.forEach((fileRejection) => {
        if (
          fileRejection.errors.some(
            (error) => error.code === 'file-invalid-type'
          )
        ) {
          toast({
            title: 'Archivo no permitido.',
            description: 'Solo se aceptan archivos PDF.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      });
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      onDropRejected,
      accept: {
        'application/pdf': ['.pdf'], // Acepta solo archivos PDF
      },
    });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'YOUR_PRESET');
    formData.append('api_key', 'YOUR_API_KEY');

    // console.log(e.target[1].files[0])
    const res = await fetch('url', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <Box>
      <FormControl onSubmit={handleSubmit}>
        <Flex
          borderRadius="10px"
          w="100%"
          justifyContent="center"
          alignItems="center"
          border="2px solid #6f6f6f"
          borderStyle="dashed"
          cursor="pointer"
          {...getRootProps()}
          style={{
            background: '#e3e3e3',
            padding: '20px',
          }}
        >
          <VStack spacing={1}>
            <Box>
              <Image src={iconUpload} boxSize="30px" />
            </Box>

            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Soltar para cargar...</p>
            ) : (
              <p>Arrastrar y soltar archivo aquí</p>
            )}
          </VStack>
        </Flex>

        {filePreview && (
          <Box mt="20px">
            <embed
              src={filePreview}
              width="100%"
              height="300px"
              type="application/pdf"
            />
          </Box>
        )}
      </FormControl>
    </Box>
  );
}

export default Dropzone;
