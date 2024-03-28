// import React from "react";
// import { Autocomplete, AutocompleteItem, Avatar, Button } from "@nextui-org/react";

// export default function AutoComplete({ data, optionLabel, optionValue, value, setValue }) {
//     return (
//         <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//             <Autocomplete
//                 label="Search Brands"
//                 className="max-w-xs"
//                 variant="bordered"
//                 selectedKey={value}
//                 onSelectionChange={setValue}
//             >
//                 {data?.map((obj) => (
//                     <AutocompleteItem key={optionValue ? obj[optionValue] : obj.value} value={optionValue ? obj[optionValue] : obj.value}>
//                         {optionLabel ? obj[optionLabel] : obj.label}
//                     </AutocompleteItem>
//                 ))}
//             </Autocomplete>
//         </div>
//     );
// }

import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function AutoComplete({ label, data, optionLabel, optionValue, value, setValue }) {

    // const renderAutocompleteItems = (dataArray, depth = 0) => {
    //     const hyphen = '-'.repeat(depth);
    //     return dataArray?.map((item) => {
    //         if (Array.isArray(item?.children) && item.children.length > 0) {
    //             // If the item is an array, recursively render nested AutocompleteItems

    //             return renderAutocompleteItems(item?.children,  depth + 1);
    //         } else {
    //             // If the item is not an array, render a single AutocompleteItem
    //             return (
    //                 <AutocompleteItem
    //                     key={optionValue ? item[optionValue] : item.value}
    //                     value={optionValue ? item[optionValue] : item.value}
    //                 >
    //                     {optionLabel ? (hyphen + item[optionLabel]) : (hyphen + item.label)}
    //                 </AutocompleteItem>
    //             );
    //         }
    //     });
    // };

    const renderAutocompleteItems = (dataArray, depth = 0) => {
        const hyphen = '-'.repeat(depth);
        return dataArray?.map((item) => {
            const itemKey = optionValue ? item[optionValue] : item.value;
            const itemValue = optionValue ? item[optionValue] : item.value;
            const itemName = optionLabel ? item[optionLabel] : item.label;
            const renderedItem = (
                <AutocompleteItem
                    key={itemKey}
                    value={itemValue}
                >
                    {hyphen + itemName}
                </AutocompleteItem>
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
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
                label={label}
                className="max-w-xs"
                variant="bordered"
                selectedKey={value}
                onSelectionChange={setValue}
            >
                {renderAutocompleteItems(data)}
            </Autocomplete>
        </div>
    );
}
