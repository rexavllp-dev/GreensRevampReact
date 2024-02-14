"use client";
import React from 'react'
import "./CustomSelect.scss"
import { Select, SelectItem } from '@nextui-org/select';
import { Tooltip } from '@nextui-org/react';
import InfoIcon from '@/components/customicons/InfoIcon';


const CustomSelect = ({ label, isRequired, isInvalid, data, name, value, onChange, disabled, isBool, optionValue, optionLabel, haveInfo, info }) => {
    return (
        <div className="custom-select-container">
            <div className='label-container'>
                <p className={isInvalid ? 'label invalid-label' : 'label'}>{label}
                    {isRequired && <span>*</span>}
                </p>
                {haveInfo &&
                    <Tooltip
                    style={{width:'400px'}}
                        content={info}
                        placement='right-end'
                        classNames={{
                            base: [
                                // arrow color
                                "before:bg-neutral-400 dark:before:bg-white",
                            ],
                            content: [
                                "py-2 px-4 shadow-xl",
                                "text-black bg-gradient-to-br from-white to-neutral-400",
                            ],
                        }}
                    >
                        <div className="infoicon">
                            <InfoIcon />
                        </div>
                    </Tooltip>
                }
            </div>
            <Select
                disabled={disabled}
                label=""
                disallowEmptySelection
                radius='none'
                name={name}
                // value={value}
                selectedKeys={[value]}
                variant='bordered'
                selectionMode="single"
                onChange={(e) => {
                    if (e.target.selectedItem?.value !== value) {
                        onChange(e);
                    }
                }}
                labelPlacement='outside'
                classNames={{
                    label: "custominput-label",
                    value: 'custom-input',
                    trigger: ["rounded", "border-black/50", 'input-wrapper'],
                    // listbox: ["rounded", "select-wrapper"],
                    // listboxWrapper: "max-h-[400px]",
                }}
            >
                {data?.map((obj) => (
                    <SelectItem key={optionValue ? obj[optionValue] : obj.value} value={optionValue ? obj[optionValue] : obj.value}>
                        {optionLabel ? obj[optionLabel] : obj.label}
                    </SelectItem>
                ))}
            </Select>
        </div >
    )
}

export default CustomSelect