import {
  Box,
  Stack,
  Button,
  propNames,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Heading,
} from '@chakra-ui/react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleModal: string;
  pdfUrl: string;
}

//<Heading onClick={onOpen}></Heading>
const ModalVerDocumento: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  titleModal,
  pdfUrl,
}) => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2x1">
      <ModalOverlay />
      <ModalContent maxWidth="80vw">
        <ModalHeader>{titleModal}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center">
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Stack direction="row" spacing={1}>
                <ZoomOutButton />
                <ZoomInButton />
              </Stack>
              <Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />
            </Box>
          </Worker>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalVerDocumento;
