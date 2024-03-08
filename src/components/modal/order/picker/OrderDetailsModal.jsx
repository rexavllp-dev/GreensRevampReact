"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Checkbox, Button, ModalFooter, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
export default function OrderDetailsModal({ isOpen, onClose, data, handleCheckboxChange, disabled, verifyItem }) {
  return (
    <Modal isOpen={isOpen} size='4xl'  onClose={onClose} style={{ zIndex: 2000 }}>
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody style={{maxHeight:'500px', overflowY:'scroll'}}>
        <h4><b>Order Details</b></h4>
          <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>ITEM</TableColumn>
                  <TableColumn>QTY</TableColumn>
                  <TableColumn>STORAGE TYPE</TableColumn>
                  <TableColumn>CHECK</TableColumn>
                </TableHeader>
                <TableBody>


                {
                  data?.products?.map((product) => {
                  return (
                  
                      <TableRow key={product.product_id}>
                        <TableCell>{product.prd_name}</TableCell>
                        <TableCell>{product.op_qty}</TableCell>
                        <TableCell>{product.prd_storage_type}</TableCell>
                        <TableCell><Checkbox onChange={(event) => handleCheckboxChange(event, product.product_id)}  size="lg"></Checkbox></TableCell>
                      </TableRow>
                  
                  )
                   })

                }


                  
                </TableBody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <Button isDisabled={disabled} color="success" onPress={() => verifyItem()}>
            VERIFY
          </Button>
        </ModalFooter>
       
      </ModalContent>
    </Modal>
  );
}
