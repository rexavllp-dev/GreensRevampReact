"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, successText, cancelText }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={{ zIndex: 4000 }}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            {cancelText || 'Cancel'}
          </Button>
          <Button color="success" onPress={onConfirm}>
            {successText || 'Confirm'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
