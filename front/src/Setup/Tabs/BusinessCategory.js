import { Card } from "@material-tailwind/react";
import React from "react";
import CategoryCard from "../Components/CategoryCard";

export default function BusinessCategory() {

    const categoryList = [
        {
            title: 'Main Categories'
        },
        {
            title: 'Sub-Categories'
        },
        {
            title: 'Items'
        },
    ]

    return (
        <>
            <Card className="w-full my-2 p-3 grid grid-cols-3">
                {categoryList.map((data, i) =>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                        <h1>{3 ** (i + 1)}</h1>
                        <h1>{data.title}</h1>
                    </div>
                )}
            </Card>
            <div className="grid grid-cols-3 gap-4 h-full">
                {categoryList.map((data, i) =>
                    <CategoryCard
                        title={data.title}
                    />
                )}
            </div>
        </>
    )
}