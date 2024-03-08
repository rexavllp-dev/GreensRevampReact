"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import CustomSelect from "@/library/select/custom-select/CustomSelect";
import CustomInput from "@/library/input/custominput/CustomInput";

export default function PickerListModal({ isOpen, onClose, data, assignDriver, setDriverId, setNoBoxes, noBoxes }) {




  return (
    <Modal isOpen={isOpen} size='xs'  onClose={onClose} style={{ zIndex: 2000 }}>
      <ModalContent>
        <ModalHeader>Drivers</ModalHeader>
        <ModalBody>
        <CustomSelect value={data[0]?.value.toString()}
                        data={data} name={'prd_tax_class'} onChange={(e) => { setDriverId(e.target.value) }}
                        
                    />


<CustomInput name='first_name' type='text'
                    maxLength={100}
                    placeholder='Boxes' label={'No.of Boxes'}
                    onChange={(e) => { setNoBoxes(e.target.value) }}
                    value={noBoxes}
                />

        </ModalBody>
        <ModalFooter>
          <Button color="success" onPress={() => assignDriver()}>
            Confirm
          </Button>
        </ModalFooter>
       
      </ModalContent>
    </Modal>
  );
}
