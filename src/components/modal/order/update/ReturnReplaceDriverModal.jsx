"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import CustomSelect from "@/library/select/custom-select/CustomSelect";
import CustomInput from "@/library/input/custominput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "@/services/features/userSlice";
import { toast } from "react-toastify";
import { handleAssignReturnReplaceDriver } from "@/services/features/orderSlice";

export default function ReturnReplaceDriverModal({ open, handleClose, orderId, orderItemId, isReturn }) {
    const dispatch = useDispatch()

    const { allDrivers } = useSelector(state => state.users);

    const [driverId, setDriverId] = React.useState("");

    React.useEffect(() => {
        dispatch(getDrivers({}));
    }, [open]);


    const assignDriver = () => {
        dispatch(handleAssignReturnReplaceDriver({
            data: {
                orderId: orderId,
                orderItemId: orderItemId, driverId: driverId, isReturn: isReturn
            }
        })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
                handleClose()
                // window.open('/print_qr/' + orderId + '/' + noBoxes, '_blank');
            } else {
                toast.error(res.payload?.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <Modal isOpen={open} size='xs' onClose={handleClose} style={{ zIndex: 2000 }}>
            <ModalContent>
                <ModalHeader>Drivers</ModalHeader>
                <ModalBody>
                    <CustomSelect value={driverId?.toString()}
                        data={allDrivers?.result} name={'driver'}
                        optionLabel={'usr_firstname'}
                        optionValue={'id'}
                        onChange={(e) => { setDriverId(e.target.value) }}
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
