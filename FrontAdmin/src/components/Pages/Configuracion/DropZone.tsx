import { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Flex, Box, VStack, useToast, Image } from '@chakra-ui/react';
import iconUpload from '../../icons/subir.png';

function Dropzone({
  setFilePreview,
  setSelectedFile,
  filePreview,
}: {
  setFilePreview: any;
  setSelectedFile: any;
  filePreview: any;
}) {
  const toast = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file) {
          setFilePreview(URL.createObjectURL(file));
          setSelectedFile(file);
        }
      }
    },
    [setFilePreview, setSelectedFile]
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      fileRejections.forEach((fileRejection) => {
        fileRejection.errors.forEach((error) => {
          if (error.code === 'file-invalid-type') {
            toast({
              title: 'Archivo no permitido.',
              description: 'Solo se aceptan archivos PDF.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        });
      });
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <Box>
      {!filePreview && (
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
      )}

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
    </Box>
  );
}

export default Dropzone;
