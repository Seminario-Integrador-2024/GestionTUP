import { useDropzone, FileRejection } from 'react-dropzone';
import { Flex, Box, VStack, useToast, Image, Stack, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import iconUpload from '../../../icons/subir.png';
import { HiOutlineDocumentAdd } from "react-icons/hi";

const ZonaCarga = ({ onFileUpload, reset }: { onFileUpload: (fileName: string) => void, reset: boolean }) => {
    const toast = useToast();
    const [fileName, setFileName] = useState('');
    const [isUploadDisabled, setIsUploadDisabled] = useState(false);
    
    useEffect(() => {
        if (reset) {
            setFileName('');
            setIsUploadDisabled(false);
        }
    }, [reset]);

    const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length > 0) {
        toast({
            title: 'Error',
            description: 'Solo se aceptan archivos .xlsx',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        return;
        }
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFileName(acceptedFiles[0].name);
            setIsUploadDisabled(true); // Desactiva la zona de carga
            onFileUpload(file.name); // Notifica al componente padre que se subió un archivo
        }
    };
    
    const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
        onDrop,
        disabled: isUploadDisabled,
        accept: {
        'application/xlsx': ['.xlsx'],
        },
    });
    //const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);
    
    return (
        <Stack direction="column">
        <Flex
        borderRadius="10px"
        w={500}
        justifyContent="center"
        alignItems="center"
        border="2px solid #6f6f6f"
        borderStyle="dashed"
        cursor={isUploadDisabled ? 'not-allowed' : 'pointer'}
        {...getRootProps()}
        style={{
          background: isUploadDisabled ? '#d3d3d3' : '#e3e3e3',
          padding: '40px',
        }}
        >
        <VStack spacing={4}>
            <Box>
                <HiOutlineDocumentAdd size={40}/>
            </Box>
            <input {...getInputProps()} />
            {isDragActive ? (
            <p>Soltar para cargar...</p>
            ) : (
            <p>Arrastrar y soltar archivo aquí</p>
             )}
        </VStack>
        </Flex>
        {fileName && <Stack direction="column">
        <Text fontWeight="bold">Archivo cargado:</Text> 
        <Flex ml={4}><li>{fileName}</li> </Flex>
        </Stack>}
        </Stack>
    );



}

export default ZonaCarga;