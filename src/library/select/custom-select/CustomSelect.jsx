"use client";
import React from 'react'
import "./CustomSelect.scss"
import { Select, SelectItem } from '@nextui-org/select';


const CustomSelect = ({ label, isRequired, isInvalid, data, name, onChange, disabled}) => {
    return (
        <div className="custom-select-container">
            <div className='label-container'>
                <p className={isInvalid ? 'label invalid-label' : 'label'}>{label}
                    {isRequired && <span>*</span>}
                </p>
            </div>
            <Select
                disabled={disabled}
                label=""
                radius='none'
                name={name}
                variant='bordered'
                selectionMode="single"
                onChange={(e) => {onChange(e)}}
                labelPlacement='outside'
                classNames={{
                    label: "custominput-label",
                    value: 'custom-input',
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