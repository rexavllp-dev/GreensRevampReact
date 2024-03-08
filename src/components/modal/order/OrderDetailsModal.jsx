"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
export default function OrderDetailsModal({ isOpen, onClose, data }) {
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
                </TableHeader>
                <TableBody>


                {
                  data?.products?.map((product) => {
                  return (
                  
                      <TableRow key={product.orderItemId}>
                        <TableCell>{product.prd_name}</TableCell>
                        <TableCell>{product.op_qty}</TableCell>
                        <TableCell>{product.prd_storage_type}</TableCell>
                      </TableRow>
                  
                  )
                   })

                }


                  
                </TableBody>
          </Table>

          <h4><b>Address</b></h4>
          <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>ADDRESS</TableColumn>
                  <TableColumn>PHONE</TableColumn>
                  <TableColumn>FLAT / VILLA</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>{data?.address_line_1}</TableCell>
                    <TableCell>{data?.ord_customer_phone}</TableCell>
                    <TableCell>{data?.flat_villa}</TableCell>
                  </TableRow>
                  
                </TableBody>
          </Table>
        </ModalBody>
       
      </ModalContent>
    </Modal>
  );
}
