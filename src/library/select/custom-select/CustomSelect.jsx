"use client";
import React from 'react'
import "./CustomSelect.scss"
import { Select, SelectItem } from '@nextui-org/select';

const data = [
    // { label:'name', value:1},
    // { label:'name2', value:2},
    // { label:'name3', value:3},
]

const CustomSelect = () => {
    return (
        <div>
            <Select
                label="Trade License Expiry Date"
                radius='none'
                variant='bordered'
                labelPlacement='outside'
                  classNames={{
                    label: "custominput-label",
                    value:'custom-input',
                    trigger: ["rounded", "border-black/50", 'input-wrapper'],
                    // listbox: ["rounded", "select-wrapper"],
                    // listboxWrapper: "max-h-[400px]",
                  }}
            >
                {data.map((obj) => (
                    <SelectItem key={obj.value} value={obj.value}>
                        {obj.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}

export default CustomSelect