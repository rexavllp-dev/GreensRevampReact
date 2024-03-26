import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Avatar } from "@nextui-org/react";
import { columns, users } from "./data";
import { MdDelete } from "react-icons/md";
import { CameraIcon } from "../customicons/CameraIcon";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

export default function MultiSelectTable({ columns, data }) {
    const renderCell = React.useCallback((obj, columnKey) => {
        const cellValue = obj[columnKey];

        switch (columnKey) {
            case "brd_logo":
                return (
                    <Avatar showFallback src={obj?.brd_logo} fallback={
                            <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={16} />
                        } />
                );
            case "brand_status":
                return (
                    <Chip className="capitalize" color={cellValue ? "success" : "danger"} size="sm" variant="flat">
                        {cellValue ? "Active" : "Disabled"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip color="danger" content="Delete item">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <MdDelete />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table
            // selectionMode="multiple" 
            aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={data}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
