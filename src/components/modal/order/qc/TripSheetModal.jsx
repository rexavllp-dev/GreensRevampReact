"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import CustomSelect from "@/library/select/custom-select/CustomSelect";
import CustomInput from "@/library/input/custominput/CustomInput";

export default function TripSheetModal({ isOpen, onClose, data, downloadSheet, setDriverId }) {




  return (
    <Modal isOpen={isOpen} size='xs'  onClose={onClose} style={{ zIndex: 2000 }}>
      <ModalContent>
        <ModalHeader>Drivers</ModalHeader>
        <ModalBody>
        <CustomSelect value={data[0]?.value.toString()}
                        data={data} name={'prd_tax_class'} onChange={(e) => { setDriverId(e.target.value) }}
                        
                    />

        </ModalBody>
        <ModalFooter>
          <Button color="success" onPress={() => downloadSheet()}>
            Download
          </Button>
        </ModalFooter>
       
      </ModalContent>
    </Modal>
  );
}
