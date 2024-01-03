"use client";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React from "react";


export default function ConfirmationModal({ onSubmit, body, open, handleClose }) {
    // const { isOpen, onOpen, onClose } = useDisclosure();

    function handleSubmit() {
        onSubmit();
        // onClose();
    }

    React.useEffect(() => {
        if (open) {
            // onOpen();
        }
    }, [open])





    return (
        <Modal
            size={'xs'}
            isOpen={open}
            onClose={() => {
                handleClose();
                // onClose();
            }}
        >
            <ModalContent>
                {(handleClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
                        <ModalBody>
                            <p>
                                {body}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => {
                                handleClose();
                                // onClose();
                            }}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                Are you sure?
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}