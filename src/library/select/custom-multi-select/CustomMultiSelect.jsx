"use client";
import React from 'react'
import "./CustomMultiSelect.scss"
import { Select, SelectItem } from '@nextui-org/select';


const CustomMultiSelect = ({ label, isRequired, isInvalid, data, name, onChange, disabled, optionLabel, optionValue, isSubCategory }) => {

    const renderAutocompleteItems = (dataArray, depth = 0) => {
        const hyphen = '-'.repeat(depth);
        return dataArray?.map((item) => {
            const itemKey = optionValue ? item[optionValue] : item.value;
            const itemValue = optionValue ? item[optionValue] : item.value;
            const itemName = optionLabel ? item[optionLabel] : item.label;
            const renderedItem = (
                <SelectItem
                    key={itemKey}
                    value={itemValue}
                >
                    {hyphen + itemName}
                </SelectItem>
            );
            if (Array.isArray(item?.children) && item.children.length > 0) {
                // If the item has children, render the item and its children recursively
                return [renderedItem, renderAutocompleteItems(item.children, depth + 1)];
            } else {
                // If the item does not have children, render only the item
                return renderedItem;
            }
        });
    };
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
                selectionMode="multiple"
                onChange={(e) => { onChange(e) }}
                labelPlacement='outside'
                classNames={{
                    label: "custominput-label",
                    value: 'custom-input',
                    trigger: ["rounded", "border-black/50", 'input-wrapper'],
                    // listbox: ["rounded", "select-wrapper"],
                    // listboxWrapper: "max-h-[400px]",
                }}
            >
                {renderAutocompleteItems(data)}
                {/* {data.map((obj) => (
                    <SelectItem key={obj.value} value={obj.value}>
                        {obj.label}
                    </SelectItem>
                ))} */}
            </Select>
        </div>
    )
}

export default CustomMultiSelect