import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function AutoComplete({ data, optionLabel, optionValue }) {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
                label="Search Brands"
                className="max-w-xs"
                variant="bordered"
            >
                {data?.map((obj) => (
                    <AutocompleteItem key={optionValue ? obj[optionValue] : obj.value} value={optionValue ? obj[optionValue] : obj.value}>
                        {optionLabel ? obj[optionLabel] : obj.label}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
}
