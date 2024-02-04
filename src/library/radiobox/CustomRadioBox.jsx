"use client";
import { Radio, RadioGroup } from '@nextui-org/react'
import React from 'react'
import './CustomRadioBox.scss'

const CustomRadioBox = ({ items, value, onChange }) => {
    return (
        <RadioGroup
            label=""
            value={value}
            onValueChange={onChange}
            color='success'
        >
            {
                items.map((item, index) => (
                    <Radio value={item.value}>{item.title}</Radio>  
                ))
            }
        </RadioGroup>
    )
}

export default CustomRadioBox