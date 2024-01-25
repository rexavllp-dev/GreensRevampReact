"use client";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React from "react";


export default function CustomModal({ onSubmit, body, open, handleClose, hideFooter }) {
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
            size={'md'}
            isOpen={open}
            onClose={() => {
                handleClose();
                // onClose();
            }}
        >
            <ModalContent>
                {(handleClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Update Stock</ModalHeader>
                        <ModalBody>
                            <p>
                                {body}
                            </p>
                        </ModalBody>
                        {!hideFooter &&
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => {
                                    handleClose();
                                    // onClose();
                                }}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Save
                                </Button>
                            </ModalFooter>
                        }
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}