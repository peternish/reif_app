import { Card } from "@material-tailwind/react";
import YDivider from "../ComponentUtils/YDivider";
import CategoryTree from "./CategoryTree";
import ExpenseTree from "./ExpenseTree";

export default function Setup() {

    return (
        <>
            <Card className="p-3">
                <h1 className="text-[1.5rem] px-4">Steward Marketing LLC</h1>
                <YDivider />
                <div className="grid grid-cols-3 flex justify-center items-center container">
                    <div className="col-span-3 md:col-span-1 flex justify-between px-4">
                        <p>Total Categories: </p>
                        <p>10</p>
                    </div>
                    <div className="col-span-3 md:col-span-1 flex justify-between px-4">
                        <p>Total Expenses: </p>
                        <p>10</p>
                    </div>
                    <div className="col-span-3 md:col-span-1 flex justify-between px-4">
                        <p>Total Income: </p>
                        <p>10</p>
                    </div>
                </div>
            </Card>
            <div className="grid grid-cols-2 my-3 gap-4">
                <div className="col-span-2 md:col-span-1 p-6">
                    <CategoryTree />
                </div>
                <div className="col-span-2 md:col-span-1 p-6">
                    <ExpenseTree />
                </div>
            </div>
        </>
    );
}