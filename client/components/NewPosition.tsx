import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button, IconButton
} from "@chakra-ui/react";
import { FaTimes, FaPlus } from "react-icons/fa";


interface INewPositionProps {
}

const NewPosition: React.FunctionComponent<INewPositionProps> = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton aria-label="{ icon: Element; }" onClick={onOpen} icon={<FaPlus />} colorScheme='blue' size='sm' />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>sfsffshfsdhfdd</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default NewPosition;
