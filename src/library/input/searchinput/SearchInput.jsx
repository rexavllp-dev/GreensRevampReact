"use client";
import React from 'react'
import { SearchIcon } from "../../../../public/icons";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import "./SearchInput.scss";

const SearchInput = ({name,value, onChange}) => {
    return (
        <Input
            variant='bordered'
            classNames={{
                label: "custominput-label",
                inputWrapper: ["rounded", 'search-input-wrapper '],
                input: [
                    "custom-input"
                ]
            }}
            placeholder="Seach"
            size="sm"
            name={name}
            startContent={<CiSearch />}
            type="search"
            value={value}
            onChange={onChange}
        />
    )
}

export default SearchInput