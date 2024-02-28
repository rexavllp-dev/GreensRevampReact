"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import CustomButton from "@/library/buttons/CustomButton";
import './LeaveCheckoutModal.scss';

export default function LeaveCheckoutModal({ isOpen, onClose, onConfirm, title, message }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="bottom-center" style={{ zIndex: 2000 }}>
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody className="mb-3">
                    <p>{message}</p>
                    <button className="checkout_modal_button mt-3" onClick={onConfirm}>
                        <div className='custombtn-label' >
                            Leave anyway
                        </div >
                    </button>
                    <CustomButton variant="teritary" onClick={onClose} label="Keep checking out" />
                </ModalBody>
                {/* <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="success" onPress={onConfirm}>
            Confirm
          </Button>
        </ModalFooter> */}
            </ModalContent>
        </Modal>
    );
}
