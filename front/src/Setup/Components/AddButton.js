import { Button } from "@material-tailwind/react";
import React from "react";

export default function AddButton(props) {
    return (
        <Button className="bg-primary py-2" onClick={props.onClick}>
            Add
        </Button>
    )
}