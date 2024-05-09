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
import {
    PlusIcon
  } from "@heroicons/react/24/outline";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
 

export function AddExpenseModal({ showModal, setShowModal, modalType, selectedRowId, handlePageUpdate, categoryId }) {
    const handleError = useErrorHandler()
    const handleOpen = () => {
        setShowModal(false)
    }
    const [propertyId, setPropertyId] = useState()
    const [property, setProperty] = useState()
    const [expenseDate, setExpenseDate] = useState('')
    const [expenseCategoryId, setExpenseCategoryId] = useState()
    const [expenseCategory, setExpenseCategory] = useState()
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('')
    const [description, setDescription] = useState('')
    const [paidFrom, setPaidFrom] = useState('')
    const [receipt, setReceipt] = useState('')
    const [contractor, setContractor] = useState('')
    const [expenseName, setExpenseName] = useState('')
    const [properties, setProperties] = useState([])
    const [categories, setCategories] = useState([])

    const newProperty = React.createRef()
    const newIncomeCategory = React.createRef()

    const getProperties = async () => {
        const res = await Axios().get('/api/businessCategory')
        const res1 = res.data.filter(r => r.id == categoryId)
        setProperties(cleanProperties(res1))
    }

    function cleanProperties (rawDatas) {
        let result = []
        for (let rawData of rawDatas) {
            let children = []
            if (typeof rawData.children == 'string') {
                children = (JSON.parse(rawData.children))
            }
            if (children.length != 0) {
                result = result.concat(children)
            }
        }

        result.push({
            id: 'addNew',
            name: 'Add Property'
        })
        return result;
    }

    const getCategories = async () => {
        const res = await Axios().get(`/api/expenseCategory/?businessCategoryId=${propertyId}`)
        let tmpCategories = []
        tmpCategories = tmpCategories.concat(res.data.income)
        tmpCategories.push({
            id: 'addNew',
            name: 'Add Category'
        })
        setCategories(tmpCategories)
    }
    const clickAddProperty = async () => {
        var newPropertyValue = newProperty.current.value
        var tmp = properties.filter((val) => {
            return val['name'] == newPropertyValue
        });
        if (tmp.length !== 0) {
            return;
        }
        
        const res = await Axios().get(`/api/addPropertyFromProcess/?categoryId=${categoryId}&propertyName=${newPropertyValue}`)
        var newValue = {
            id: res.data.id,
            name: newPropertyValue,
            children: []
        }
        var tmpProperties = properties
        tmpProperties.splice(tmpProperties.length - 1, 0, newValue)
        console.log(tmpProperties)
        setProperties([...tmpProperties])
        newProperty.current.value = ''
    }

    const clickAddIncomeCategory = async() => {
        var newIncomeCategoryValue = newIncomeCategory.current.value
        if (newIncomeCategoryValue == '') return;
        var tmp = categories.filter((val) => {
            return val['name'] == newIncomeCategoryValue
        })
        if (tmp.length !== 0) return;
        if (propertyId == null) return;
        
        const res = await Axios().get(`/api/addIncomeCategoryFromProcess/?business_category_id=${propertyId}&name=${newIncomeCategoryValue}&type='expense'`)
        var newValue = {
            id: res.data.id,
            name: newIncomeCategoryValue,
            children: []
        }
        var tmpCategories = categories
        tmpCategories.splice(tmpCategories.length - 1, 0, newValue)
        setCategories([...tmpCategories])
        newIncomeCategory.current.value = ''
    }
    const getExpenseData = async () => {
        if (modalType == 'Add') {
            setExpenseDate('')
            setAmount('')
            setDescription('')
            setPaidFrom('')
            setReceipt('')
            setExpenseCategoryId('')
            setExpenseCategory('')
            setMethod('')
            setContractor('')
            return
        }
        else if(modalType == 'Edit') {
            console.log("get edit data")
            const res = await Axios().get(`/api/expenseData?id=${selectedRowId}`)
            const editIncome = res.data[0];
            console.log(res)
            setPropertyId(properties.filter(p => p.name == editIncome.property)[0].id)
            setProperty(editIncome.property)
            setAmount(editIncome.amount)
            setDescription(editIncome.description)
            setPaidFrom(editIncome.pay_from)
            setReceipt(editIncome.receipt)
            setMethod(editIncome.method)
            setExpenseCategoryId(editIncome.expense_category_id)
            setExpenseCategory(editIncome.expense_category)
            setExpenseDate(editIncome.date)
            setContractor(editIncome.contractor_vendor)
        }
    }

    useEffect(() => {
        getProperties()
        getExpenseData();
    }, [showModal, modalType])

    useEffect(() => {
        getCategories()
    }, [propertyId])

    const handleClick = async () => {
        try {
            console.log(expenseCategory)
            console.log(expenseCategoryId)
            if (!propertyId || !expenseCategoryId || !expenseCategory || !expenseDate || !amount || !paidFrom || !contractor) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/expenseData', {
                        property: property,
                        expenseCatetoryId: expenseCategoryId,
                        expenseCategory: expenseCategory,
                        expenseDate: expenseDate,
                        amount: amount,
                        method: method,
                        description: description,
                        paidFrom: paidFrom,
                        receipt: receipt,
                        contractor: contractor
                    })
                    getExpenseData()
                }
                else {
                    Axios().put('/api/expenseData', {
                        id: selectedRowId,
                        property: property,
                        expenseCategoryId: expenseCategoryId,
                        expenseCategory: expenseCategory,
                        expenseDate: expenseDate,
                        amount: amount,
                        method: method,
                        description: description,
                        paidFrom: paidFrom,
                        receipt: receipt,
                        contractor: contractor
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
                <Input
                    type="text"
                    label={`Input ${modalType}`}
                    size="lg"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4 mb-4">l
                <div className="">
                        <Select label="Select Property" value={propertyId} onChange={(val) => {
                            if (val == 'addNew')
                            {
                                return false;
                            }
                            setPropertyId(val);
                            setProperty(properties.filter(c => c.id == val)[0].name)
                        }}>
                            {properties.map((property) => {
                                if (property.id == 'addNew') {
                                    return (
                                        <Option value={property.id} key={property.id}
                                            onClickCapture={(e) => {
                                                if (e.target.type == 'button')
                                                    clickAddProperty()
                                                e.preventDefault(); 
                                                e.stopPropagation();}}
                                        >
                                            <div className="relative flex w-full">
                                                {/* <Input
                                                    value={''}
                                                    className="pr-20"
                                                    containerProps={{
                                                    className: "min-w-0",
                                                    }}
                                                />
                                                <Button
                                                    size="sm"
                                                    className="!absolute right-1 top-1 rounded"
                                                >
                                                    Add
                                                </Button> */}
                                                <div className="flex relative w-full">
                                                    <Input inputRef={newProperty}/>
                                                    <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddProperty}>
                                                        <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </Option>
                                    )
                                }
                                else {
                                    return (
                                        <Option value={property.id} key={property.id}>{property.name}</Option>
                                    )
                                }
                            })}
                        </Select>
                    </div>
                    <div className="">
                        <Select label="Select Category" value={expenseCategoryId} onChange={(val) => { setExpenseCategoryId(val); setExpenseCategory(categories.filter(c => c.id == val)[0].name) }}>
                        {categories.map((category, index) => {
                                    if (category.id == 'addNew') {
                                        return (
                                            <Option value={category.id} key={category.id}
                                                onClickCapture={(e) => {
                                                    if (e.target.type == 'button')
                                                    clickAddIncomeCategory()
                                                    e.preventDefault(); 
                                                    e.stopPropagation();}}
                                            >
                                                <div className="relative flex w-full">
                                                    <div className="flex relative w-full">
                                                        <Input inputRef={newIncomeCategory}/>
                                                        <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddIncomeCategory}>
                                                            <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Option>
                                        )
                                    } else {
                                        return (
                                            <Option value={category.id} key={index}>{category.name}</Option>
                                        )
                                    }
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
                                        label="Expense Date"
                                        onChange={() => null}
                                        value={expenseDate ? format(expenseDate, "PPP") : ""}
                                    />
                                </PopoverHandler>
                                <PopoverContent className="zindex-high">
                                    <DayPicker
                                        mode="single"
                                        selected={expenseDate}
                                        onSelect={setExpenseDate}
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
                        <Input label="Contract/Vendor" value={contractor} onChange={(e) => setContractor(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="">
                        <Input label="Paid From" value={paidFrom} onChange={(e) => setPaidFrom(e.target.value)} />
                    </div>
                    <div className="">
                        <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="">
                        <Input label="Receipt" value={receipt} onChange={(e) => setReceipt(e.target.value)} />
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
                    onClick={() => { handleOpen(); handlePageUpdate(); getExpenseData(); }}
                >
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    )
}