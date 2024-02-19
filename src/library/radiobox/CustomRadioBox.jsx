"use client";
import { Radio, RadioGroup } from '@nextui-org/react'
import React from 'react'
import './CustomRadioBox.scss'

const CustomRadioBox = ({ items, value, onChange }) => {
    return (
        <RadioGroup
            label=""
            classNames={{
                label: "customcheckbox-label", // default"customcheckbox-label",
                wrapper: "customcheckbox-wrapper",
                base: "customcheckbox-base",
            }}
            value={value}
            onValueChange={onChange}
            color='default'
        >
            {
                items.map((item, index) => (
                    <Radio color='default' classNames={{ label: "customcheckbox-label", base: "customcheckbox-base" }} value={item.value} >{item.title}</Radio>
                ))
            }
        </RadioGroup>
    )
}

export default CustomRadioBox