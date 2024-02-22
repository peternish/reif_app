import { Card, IconButton, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import YDivider from "../../ComponentUtils/YDivider";
import AddButton from "../Components/AddButton";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Vendor() {
    const [page, setPage] = useState(1)

    return (
        <div className="md:container w-full h-full">
            <Card className="w-full h-[95%] my-2 p-3 min-w-[40rem]">
                <div className="flex justify-around">
                    <h1>Total: 3</h1>
                    <AddButton />
                </div>
                <YDivider />
                <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Name
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Date
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Pay Amount
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Payment Method
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                            Pay From Account
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                        </th>
                    </thead>
                    <tbody>
                        <tr className="border-b-2">
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                Graylan Stewart
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                2/26/2024
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                440
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                Cash
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                Binance
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                <div className="flex">
                                    <PencilIcon className="w-5 hover:scale-150 cursor-pointer" />
                                    <TrashIcon className="w-5 hover:scale-150 text-red-500 ml-4 cursor-pointer" />
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b-2">
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                Graylan Stewart
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                2/26/2024
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                440
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                Cash
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                Binance
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                                <div className="flex">
                                    <PencilIcon className="w-5 hover:scale-150 cursor-pointer" />
                                    <TrashIcon className="w-5 hover:scale-150 text-red-500 ml-4 cursor-pointer" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex items-center gap-8 absolute bottom-4 left-8">
                    <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={() => {
                            if (page != 1) {
                                setPage(page - 1)
                            }
                        }}
                    >
                        <i class="fa-solid fa-arrow-left"></i>
                    </IconButton>
                    <Typography color="gray" className="font-normal">
                        Page <strong className="text-gray-900">{page}</strong> of{" "}
                        <strong className="text-gray-900">10</strong>
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="outlined"
                        onClick={() => {
                            if (page < 10) {
                                setPage(page + 1)
                            }
                        }}
                    >
                        <i class="fa-solid fa-arrow-right"></i>
                    </IconButton>
                </div>
            </Card>
        </div>
    )
}