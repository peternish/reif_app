import React from "react";
import {
    Button,
    Dialog,
    DialogBody, DialogFooter, DialogHeader,
    Select, Option,
    Input, Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { editingStateInitializer } from "@mui/x-data-grid/internals";
 

export function AddIncomeModal({ showModal, setShowModal, modalType, selectedRowId, handlePageUpdate, categoryId }) {
    const handleError = useErrorHandler()
    const handleOpen = () => {
        setShowModal(false)
    }
    const [propertyId, setPropertyId] = useState()
    const [property, setProperty] = useState()
    const [incomeDate, setIncomeDate] = useState('')
    const [incomeCategoryId, setIncomeCategoryId] = useState()
    const [incomeCategory, setIncomeCategory] = useState()
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('')
    const [description, setDescription] = useState('')
    const [paidBy, setPaidBy] = useState('')
    const [balance, setBalance] = useState('')

    const [properties, setProperties] = useState([])
    const [categories, setCategories] = useState([])

    const getProperties = async () => {
        const res = await Axios().get('/api/businessCategory')
        const res1 = res.data.filter(r => r.id == categoryId)
        setProperties(cleanProperties(res1))
    }

    function cleanProperties (rawDatas) {
        let result = []
        for (let rawData of rawDatas) {
            result.push(rawData)
            console.log(rawData)
            let children = []
            if (typeof rawData.children == 'string') {
                children = (JSON.parse(rawData.children))
            }
            console.log(children)
            if (children.length != 0) {
                result = result.concat(cleanProperties(children))
            }
        }
        return result;
    }

    const getCategories = async () => {
        const res = await Axios().get(`/api/expenseCategory/?businessCategoryId=${propertyId}`)
        setCategories(res.data.income)

        console.log((res.data.income))
    }

    const getIncomeData = async () => {
        if (modalType == 'Add') {
            setIncomeDate('')
            setAmount('')
            setDescription('')
            setPaidBy('')
            setBalance('')
            setIncomeCategoryId('')
            setIncomeCategory('')
            setMethod('')
            return
        }
        else if(modalType == 'Edit') {
            console.log("get edit data")
            const res = await Axios().get(`/api/incomeData?id=${selectedRowId}`)
            const editIncome = res.data[0];
            console.log(res)
            setPropertyId(properties.filter(p => p.name == editIncome.property)[0].id)
            setProperty(editIncome.property)
            setAmount(editIncome.amount)
            setDescription(editIncome.description)
            setPaidBy(editIncome.paid_by)
            setBalance(editIncome.balance)
            setMethod(editIncome.method)
            setIncomeCategoryId(editIncome.income_category_id)
            setIncomeCategory(editIncome.income_category)
            setIncomeDate(editIncome.date)
        }
    }

    useEffect(() => {
        getProperties()
        getIncomeData();
    }, [showModal, modalType])

    useEffect(() => {
        getCategories()
    }, [propertyId])

    const handleClick = async () => {
        try {
            console.log(incomeCategory)
            console.log(incomeCategoryId)
            if (!propertyId || !incomeCategoryId || !incomeCategory || !incomeDate || !amount || !paidBy) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/incomeData', {
                        property: property,
                        incomeCatetoryId: incomeCategoryId,
                        incomeCategory: incomeCategory,
                        incomeDate: incomeDate,
                        amount: amount,
                        method: method,
                        description: description,
                        paidBy: paidBy,
                        balance: balance
                    })
                    getIncomeData()
                }
                else {
                    Axios().put('/api/incomeData', {
                        id: selectedRowId,
                        property: property,
                        incomeCategoryId: incomeCategoryId,
                        incomeCategory: incomeCategory,
                        incomeDate: incomeDate,
                        amount: amount,
                        method: method,
                        description: description,
                        paidBy: paidBy,
                        balance: balance
                    })
                    handleOpen()
                    handlePageUpdate()
                }
            }
        } catch (err) {
            console.log(err)
            handleError(err)
        }
    }

    return (
        <Dialog
            open={showModal}
            size="lg"
            handler={handleOpen}
        >
            <DialogHeader>{modalType}</DialogHeader>
            <DialogBody>
                {/* <Input
                    type="text"
                    label={`Input ${modalType}`}
                    size="lg"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                /> */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="">
                        <Select label="Select Property" value={propertyId} onChange={(val) => {setPropertyId(val);setProperty(properties.filter(p => p.id == val)[0].name)}}>
                            {properties.map((property) => {
                                return (
                                    <Option value={property.id}>{property.name}</Option>
                                )
                            })}
                        </Select>
                    </div>
                    <div className="">
                        <Select label="Select Category" value={incomeCategoryId} onChange={(val) => { setIncomeCategoryId(val); setIncomeCategory(categories.filter(c => c.id == val)[0].name) }}>
                            {categories.map((category, index) => {
                                return (
                                    <Option value={category.id} key={index}>{category.name}</Option>
                                )
                            })}
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="">
                        <Input label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="">
                        <div className="">
                            <Popover placement="bottom">
                                <PopoverHandler>
                                    <Input
                                        label="Income Date"
                                        onChange={() => null}
                                        value={incomeDate ? format(incomeDate, "PPP") : ""}
                                    />
                                </PopoverHandler>
                                <PopoverContent className="zindex-high">
                                    <DayPicker
                                        mode="single"
                                        selected={incomeDate}
                                        onSelect={setIncomeDate}
                                        showOutsideDays
                                        className="border-0"
                                        classNames={{
                                            caption: "flex justify-center py-2 mb-4 relative items-center",
                                            caption_label: "text-sm font-medium text-gray-900",
                                            nav: "flex items-center",
                                            nav_button:
                                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                            nav_button_previous: "absolute left-1.5",
                                            nav_button_next: "absolute right-1.5",
                                            table: "w-full border-collapse",
                                            head_row: "flex font-medium text-gray-900",
                                            head_cell: "m-0.5 w-9 font-normal text-sm",
                                            row: "flex w-full mt-2",
                                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: "h-9 w-9 p-0 font-normal",
                                            day_range_end: "day-range-end",
                                            day_selected:
                                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                            day_today: "rounded-md bg-gray-200 text-gray-900",
                                            day_outside:
                                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                            day_disabled: "text-gray-500 opacity-50",
                                            day_hidden: "invisible",
                                        }}
                                        components={{
                                            IconLeft: ({ ...props }) => (
                                                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                            IconRight: ({ ...props }) => (
                                                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="">
                        <Select label="Method" value={method} onChange={(val) => {setMethod(val)}}>
                            <Option value="Wire Transfer">Wire Transfer</Option>
                            <Option value="Check">Check</Option>
                            <Option value="Auto Draft">Auto Draft</Option>
                            <Option value="Zelle">Zelle</Option>
                            <Option value="CashApp">CashApp</Option>
                            <Option value="ACH">ACH</Option>
                            <Option value="Remitly">Remitly</Option>
                            <Option value="Venmo">Venmo</Option>
                            <Option value="Paypal">Paypal</Option>
                        </Select>
                    </div>
                    <div className="">
                        <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="">
                        <Input label="Paid By" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} />
                    </div>
                    <div className="">
                        <Input label="Balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
                    </div>
                </div>
            </DialogBody>
            <DialogFooter className="flex justify-between">
                <Button
                    className="bg-primary"
                    onClick={() => handleClick()}
                >
                    {modalType}
                </Button>
                <Button
                    className="bg-tertiary"
                    onClick={() => { handleOpen(); handlePageUpdate(); getIncomeData(); }}
                >
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    )
}