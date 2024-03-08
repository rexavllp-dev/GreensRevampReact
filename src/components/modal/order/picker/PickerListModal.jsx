"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import CustomSelect from "@/library/select/custom-select/CustomSelect";

export default function PickerListModal({ isOpen, onClose, data, assignPicker, setPickerId }) {




  return (
    <Modal isOpen={isOpen} size='xs'  onClose={onClose} style={{ zIndex: 2000 }}>
      <ModalContent>
        <ModalHeader>Pickers</ModalHeader>
        <ModalBody>
        <CustomSelect value={data[0]?.value.toString()}
                        data={data} name={'prd_tax_class'} onChange={(e) => { setPickerId(e.target.value) }}
                        
                    />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onPress={() => assignPicker()}>
            Confirm
          </Button>
        </ModalFooter>
       
      </ModalContent>
    </Modal>
  );
}
