

"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
export default function ReviewModal({ isOpen, onClose, data }) {
    return (
        <Modal isOpen={isOpen} size='4xl' onClose={onClose} style={{ zIndex: 2000 }}>
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalBody>
        
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
