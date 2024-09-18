import { useDropzone, FileRejection } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { Stack, Text, Box } from '@chakra-ui/react';

const ZonaCarga = ({ onFileUpload, reset, cargar, setFile }: { onFileUpload: (fileName: string) => void, reset: boolean, cargar: boolean, setFile: (file: File) => void }) => {
    const [fileAux, setFileAux] = useState<File | null>(null);

    useEffect(() => {
        if ( fileAux) {
            setFile(fileAux);  
        }
    }, [ fileAux]);

    const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (acceptedFiles.length > 0) {
            setFileAux(acceptedFiles[0]);
            onFileUpload(acceptedFiles[0].name);  
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },  
    });

    return (
        <Stack direction="column">
            <Box {...getRootProps()} p={4} border="2px dashed" borderRadius="md" cursor="pointer">
                <input {...getInputProps()} />
                {fileAux ? (
                    <Text>Archivo seleccionado: {fileAux.name}</Text>
                ) : (
                    <Text>Arrastra y suelta el archivo aquí o haz clic para seleccionar un archivo</Text>
                )}
            </Box>
        </Stack>
    );
}

export default ZonaCarga;
