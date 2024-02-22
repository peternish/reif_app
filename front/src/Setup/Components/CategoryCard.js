import { Card, List } from "@material-tailwind/react";
import React from "react";
import AddButton from "./AddButton";
import CategoryItem from "./CategoryItem";

export default function CategoryCard(props) {
    return (
        <Card className="min-h-full p-3">
            <div className="w-full flex justify-between items-center">
                <h1>{props.title}</h1>
                <AddButton />
            </div>
            <hr className="my-2 border-blue-gray-50" />
            <div>
                <List>
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                </List>
            </div>
        </Card>
    )
}