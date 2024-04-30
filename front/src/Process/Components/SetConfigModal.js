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

var stringSimiliarity = require("string-similarity");
// import { format } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
// import InvoiceSetting from"./InvoiceSetting";

export function SetConfigModal({ showModal, setShowModal, handlePageUpdate, 
                                invoiceData, setInvoiceData, businessCategory, expenseCategory, vendorCategory, descriptionCategory, pMethodCategory, pAccountCategory}) {
    const [expenseItem, setExpenseItem] =useState([])
    const [depositItem, setDepositItem] = useState([])
    const [vendorItem, setVendorItem] = useState([])
    const [descriptionItem, setDescriptionItem] = useState([])
    const [pMethodItem, setPMethodItem] = useState([])
    const [pAccountItem, setPAccountItem] = useState([])
    const [businessCategoryId, setBusinessCategoryId] = useState()
    const [invoiceState, SetInvoiceState] = useState('')
    const [expenseCategoryId, setExpenseCategoryId] = useState()
    const [vendorCategoryId, setVendorCategoryId] = useState()
    const [descriptionCategoryId, setDescriptionCategoryId] = useState()
    const [pMethodCategoryId, setPMethodCategoryId] = useState()
    const [pAccountCategoryId, setPAccountCategoryId] = useState()
    const handleError = useErrorHandler()
    const handleOpen = () => {
        setShowModal(false)
    }
    const getCategories = async () => {
        setVendorItem(vendorCategory.filter((val) => val['business_category_id'] == businessCategoryId))
        setDescriptionItem(descriptionCategory.filter((val) => val['business_category_id'] == businessCategoryId))
        setPMethodItem(pMethodCategory.filter((val) => val['business_category_id'] == businessCategoryId))
        setPAccountItem(pAccountCategory.filter((val) => val['business_category_id'] == businessCategoryId))
    }
    
    const getExpenseOrDeposit = async () => {
        if (invoiceState == 'Deposit')
            setExpenseItem(expenseCategory.filter((val) => (val['business_category_id'] == businessCategoryId && val['type'] == 'income')))
        else
            setExpenseItem(expenseCategory.filter((val) => (val['business_category_id'] == businessCategoryId && val['type'] == 'expense')))
    }
    
    const handleClick = async () => {
        if (!businessCategoryId || !invoiceState || !expenseCategoryId || !vendorCategoryId || !descriptionCategoryId || !pMethodCategoryId || !pAccountCategoryId) {
            alert('Please select categories!');
            return false;
        }
        const res = await Axios().post('/api/addConfig', {
            textItem: invoiceData[0],
            businessCategoryId: businessCategoryId,
            invoiceType: invoiceState,
            expenseCategoryId: expenseCategoryId,
            vendorCategoryId: vendorCategoryId,
            descriptionCategoryId: descriptionCategoryId,
            pMethodCategoryId: pMethodCategoryId,
            pAccountCategoryId: pAccountCategoryId
        })
        var similiarInvoice = [];
        if (res.data.data == true) {
            console.log(invoiceData)
            similiarInvoice = invoiceData.slice(1, invoiceData.length).filter((item) => {
                return item[1] == invoiceData[0][1]
            });
            console.log(similiarInvoice)
            const res_1 = await Axios().post('/api/addSimiliarConfig', {
                id: res.data.id,
                similiarInvoice: similiarInvoice,
                invoiceType: res.data.invoiceType,
            })
            if (res_1.data.data == true) {
                var tmp = invoiceData.slice(1, invoiceData.length).filter((item) => {
                    return stringSimiliarity.compareTwoStrings(item[1], invoiceData[0][1]) < 0.7
                });
                console.log(tmp)
                setInvoiceData(tmp)
                // setBusinessCategoryId(0)
                // SetInvoiceState('')
                // setExpenseCategoryId(0)
                // setVendorCategoryId(0)
                // setDescriptionCategoryId(0)
                // setPMethodCategoryId(0)
                // setPAccountCategoryId(0)
            }
        }
    }

    useEffect(() => {
        getCategories()
        getExpenseOrDeposit()
    }, [businessCategoryId])
    
    useEffect(() => {
        getExpenseOrDeposit()
    }, [invoiceState])
    useEffect(() => {
    }, [invoiceData])

    // const handleClick = async () => {
    //     try {
    //         console.log(expenseCategory)
    //         console.log(expenseCategoryId)
    //         if (!propertyId || !expenseCategoryId || !expenseCategory || !expenseDate || !amount || !paidFrom || !contractor) {
    //             window.alert('fill out.')
    //         }
    //         else {
    //             if (modalType == 'Add') {
    //                 Axios().post('/api/expenseData', {
    //                     property: property,
    //                     expenseCatetoryId: expenseCategoryId,
    //                     expenseCategory: expenseCategory,
    //                     expenseDate: expenseDate,
    //                     amount: amount,
    //                     method: method,
    //                     description: description,
    //                     paidFrom: paidFrom,
    //                     receipt: receipt,
    //                     contractor: contractor
    //                 })
    //                 getExpenseData()
    //             }
    //             else {
    //                 Axios().put('/api/expenseData', {
    //                     id: selectedRowId,
    //                     property: property,
    //                     expenseCategoryId: expenseCategoryId,
    //                     expenseCategory: expenseCategory,
    //                     expenseDate: expenseDate,
    //                     amount: amount,
    //                     method: method,
    //                     description: description,
    //                     paidFrom: paidFrom,
    //                     receipt: receipt,
    //                     contractor: contractor
    //                 })
    //                 handleOpen()
    //                 handlePageUpdate()
    //             }
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         handleError(err)
    //     }
    // }

    return (
        <Dialog
            open={showModal}
            size="xl"
            handler={handleOpen}
        >
            <DialogHeader>Set Config</DialogHeader>
            <DialogBody className="" >
            <div>
                <div class="mb-3 border-b-4">
                    <div class="mb-1 grid grid-cols-12">
                        <div class='col-span-11'>
                            <h1 class="font-bold">Text:</h1>
                            {
                                invoiceData[0] != null &&
                                <div class="mb-2">{invoiceData[0][1]}</div>
                            }
                            
                        </div>
                    </div>
                    <div className="mb-1 grid grid-cols-7 grid-center">
                        {/* <Select label="Method" value={method} onChange={(val) => {setMethod(val)}}> */}
                        <div class="col-span-1">
                            <Select label="Entities" value={businessCategoryId} onChange={(val) => {setBusinessCategoryId(val)}}>
                                {businessCategory.map((business) => {
                                    return (
                                        <Option value={business.id} key={business.id}>{business.name}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div class="col-span-1">
                            <Select label="Type" value={invoiceState} onChange={(val) => {SetInvoiceState(val)}}>
                                <Option value="Deposit">Deposit</Option>
                                <Option value="Expense">Expense</Option>
                            </Select>
                        </div>
                        {
                            invoiceState == '' && (
                            <Select label="Expense/Deposit">
                                <Option value="Deposit">Deposit</Option>
                                <Option value="Expense">Expense</Option>
                            </Select>)
                        }

                        {
                            invoiceState != '' && (
                            <Select label={invoiceState} onChange={(val) => setExpenseCategoryId(val)}>
                                {expenseItem.map((expense) => {
                                    return (
                                        <Option value={expense.id} key={expense.id}>{expense.name}</Option>
                                    )
                                })}
                            </Select>)
                        }
                        <div class="col-span-1">
                            <Select label="Vendor/Work" onChange={(val) => setVendorCategoryId(val)}>
                                {vendorItem.map((vendor) => {
                                    return (
                                        <Option value={vendor.id} key={vendor.id}>{vendor.name}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div class="col-span-1">
                            <Select label="Description" onChange={(val) => setDescriptionCategoryId(val)}>
                                {descriptionItem.map((description) => {
                                    return (
                                        <Option value={description.id} key={description.id}>{description.name}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div class="col-span-1">
                            <Select label="Payment Method" onChange={(val) => setPMethodCategoryId(val)}>
                                {pMethodItem.map((pMethod) => {
                                    return (
                                        <Option value={pMethod.id} key={pMethod.id}>{pMethod.name}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                        {
                            invoiceState == '' && 
                            <div class="col-span-1">
                                <Select label="Pay From Account" onChange={(val) => setPAccountCategoryId(val)}>
                                    {pAccountItem.map((pAccount) => {
                                        return (
                                            <Option value={pAccount.id} key={pAccount.id}>{pAccount.name}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        }
                        {
                            invoiceState == 'Expense' && 
                            <div class="col-span-1">
                                <Select label="Pay From Account" onChange={(val) => setPAccountCategoryId(val)}>
                                    {pAccountItem.map((pAccount) => {
                                        return (
                                            <Option value={pAccount.id} key={pAccount.id}>{pAccount.name}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        }
                        {
                            invoiceState == 'Deposit' && 
                            <div class="col-span-1">
                                <Select label="Paid By" onChange={(val) => setPAccountCategoryId(val)}>
                                    {pAccountItem.map((pAccount) => {
                                        return (
                                            <Option value={pAccount.id} key={pAccount.id}>{pAccount.name}</Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        }
                    </div>
                </div>
            </div>
                {/* <InvoiceSetting 
                                invoiceData={invoiceData} setInvoice={setInvoiceData} businessCategory={businessCategory} expenseCategory={expenseCategory} vendorCategory={vendorCategory}
                                descriptionCategory={descriptionCategory} pMethodCategory={pMethodCategory} pAccountCategory={pAccountCategory}>
                </InvoiceSetting> */}
            </DialogBody>
            <DialogFooter className="flex">
                <Button
                    className="bg-primary  mr-2"
                    onClick={() => handleClick()}
                >
                    Next
                </Button>
                <Button
                    className="bg-tertiary"
                    onClick={() => { handleOpen(); handlePageUpdate();}}
                >
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    )
}