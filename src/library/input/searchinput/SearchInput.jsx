"use client";
import React from 'react'
import { SearchIcon } from "@/assets/icons";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import "./SearchInput.scss";

const SearchInput = () => {
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
            startContent={<CiSearch />}
            type="search"
        />
    )
}

export default SearchInput