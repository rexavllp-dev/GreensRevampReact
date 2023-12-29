import { Textarea } from '@nextui-org/react';
import React from 'react';
import './CustomTextarea.scss';

const CustomTextarea = ({label, placeholder, name, value, onChange}) => {
  return (
    <Textarea
      variant="bordered"
      label={label}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      labelPlacement="outside"
      placeholder={placeholder}
      classNames={{
        label: "custominput-label",
        inputWrapper: ["rounded", 'input-wrapper'],
        input: [
          "custom-input"
        ]
      }}
    />
  )
}

export default CustomTextarea  