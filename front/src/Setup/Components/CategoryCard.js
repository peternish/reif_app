import { Card, List } from "@material-tailwind/react";
import React from "react";
import AddButton from "./AddButton";
import CategoryItem from "./CategoryItem";
import YDivider from "../../ComponentUtils/YDivider";

export default function CategoryCard(props) {
    return (
        <Card className="h-[85%] p-3">
            <div className="w-full flex justify-between items-center">
                <h1>{props.title}</h1>
                <AddButton />
            </div>
            <YDivider />
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