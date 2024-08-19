import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
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
} from '@chakra-ui/react';
import iconUpload from '../../icons/subir.png';
function Dropzone() {
  //fuente:
  //https://github.com/fazt/react-dropzone-tutorial
  // const [file, setFile] = useState();
  const onDrop = useCallback((acceptedFiles: any[]) => {
    console.log(acceptedFiles[0]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

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

        {acceptedFiles[0] && (
          <img
            src={URL.createObjectURL(acceptedFiles[0])}
            alt=""
            style={{
              width: '100%',
              height: '200px',
            }}
          />
        )}
      </FormControl>
    </Box>
  );
}

export default Dropzone;
