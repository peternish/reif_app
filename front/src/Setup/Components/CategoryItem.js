import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ListItem, ListItemSuffix } from "@material-tailwind/react";
import React from "react";

export default function CategoryItem() {
    return (
        <ListItem className="text-blue-gray-900">
            sadsddas
            <ListItemSuffix>
                <div className="flex">
                    <PencilIcon className="w-5 hover:scale-150" />
                    <TrashIcon className="w-5 hover:scale-150 text-red-500 ml-4" />
                </div>
            </ListItemSuffix>
        </ListItem>
    )
}