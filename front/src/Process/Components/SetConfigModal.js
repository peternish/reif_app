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
                                invoiceData, setInvoiceData, businessCategory, expenseCategory, customerCategory, vendorCategory, descriptionCategory, pMethodCategory, pAccountCategory, importedFileID,
                                isUploadClicked, setIsUploadClicked}) {
    const [expenseItem, setExpenseItem] =useState([])
    const [depositItem, setDepositItem] = useState([])
    const [businessCategoryItem, setBusinessCategoryItem] = useState([])
    const [customerItem, setCustomerItem] = useState([])
    const [vendorItem, setVendorItem] = useState([])
    const [descriptionItem, setDescriptionItem] = useState([])
    const [pMethodItem, setPMethodItem] = useState([])
    const [pAccountItem, setPAccountItem] = useState([])
    const [businessCategoryId, setBusinessCategoryId] = useState()
    const [invoiceState, SetInvoiceState] = useState('')
    const [expenseCategoryId, setExpenseCategoryId] = useState()
    const [customerCategoryId, setCustomerCategoryId] = useState()
    const [vendorCategoryId, setVendorCategoryId] = useState()
    const [descriptionCategoryId, setDescriptionCategoryId] = useState()
    const [pMethodCategoryId, setPMethodCategoryId] = useState()
    const [pAccountCategoryId, setPAccountCategoryId] = useState()

    var newBusinessCategory = React.createRef()
    var newExpenseCategory = React.createRef()
    var newCustomerCategory = React.createRef()
    var newVendorCategory = React.createRef()
    var newDescriptionCategory = React.createRef()
    var newPMethodCategory = React.createRef()
    var newPAccountCategory = React.createRef()

    const handleError = useErrorHandler()
    const handleOpen = () => {
        // console.log(invoiceState)
        setShowModal(false)
    }
    const getCategories = async () => {
        if (!businessCategoryId || businessCategoryId == -1)
            return;
        if (invoiceState == 'Deposit') {
            var tmpExpenseCategory = expenseCategory.filter((val) => (val['type'] == 'income' && val['business_category_id'] == businessCategoryId))
            tmpExpenseCategory.push({
                id: -1,
                name: 'Add Deposit',
                business_category_id: businessCategoryId
            })
            setExpenseItem(tmpExpenseCategory)
        }
        else {
            var tmpExpenseCategory = expenseCategory.filter((val) => (val['type'] == 'expense' && val['business_category_id'] == businessCategoryId))
            tmpExpenseCategory.push({
                id: -1,
                name: 'Add Expense',
                business_category_id: businessCategoryId
            })
            setExpenseItem(tmpExpenseCategory)
        }

        var tmpCustomerItem = customerCategory.filter((val) => val['business_category_id'] == businessCategoryId)

        tmpCustomerItem.push({
            id: -1,
            name: 'Add Customer Category',
            business_category_id: businessCategoryId
        })
        setCustomerItem(tmpCustomerItem)

        var tmpVendorItem = vendorCategory.filter((val) => val['business_category_id'] == businessCategoryId)
        tmpVendorItem.push({
            id: -1,
            name: 'Add Customer Category',
            business_category_id: businessCategoryId
        })
        setVendorItem(tmpVendorItem)

        var tmpDescriptionItem = descriptionCategory.filter((val) => val['business_category_id'] == businessCategoryId)
        tmpDescriptionItem.push({
            id: -1,
            name: 'Add Customer Category',
            business_category_id: businessCategoryId
        })
        setDescriptionItem(tmpDescriptionItem)

        var tmpPMethodItem = pMethodCategory.filter((val) => val['business_category_id'] == businessCategoryId)
        tmpPMethodItem.push({
            id: -1,
            name: 'Add Customer Category',
            business_category_id: businessCategoryId
        })
        setPMethodItem(tmpPMethodItem)

        var tmpPAccountItem = pAccountCategory.filter((val) => val['business_category_id'] == businessCategoryId)
        tmpPAccountItem.push({
            id: -1,
            name: 'Add Customer Category',
            business_category_id: businessCategoryId
        })
        setPAccountItem(tmpPAccountItem)
    }
    
    const getBusinessCategories = async () => {
        if (invoiceState == '') return false;
        
        // var expense = expenseCategory.filter((val) => val['id'] == expenseCategoryId)
        // if (expense.length > 0) {
        //     var tmpBusinessCategory = businessCategory.filter((val) => val['id'] == expense[0]['business_category_id']) 
        //     tmpBusinessCategory.push({
        //         id: 'addNew',
        //         name: 'Add Business Category',
        //         children: []
        //     })
        //     setBusinessCategoryItem(tmpBusinessCategory)
        // }
        // var tmpBusinessCategory = businessCategory
        businessCategory.push({
            id: '-1',
            name: 'Add Business Category',
            children: []
        })
        setBusinessCategoryItem(businessCategory)
    }

    const getExpenseOrDeposit = async () => {
        setBusinessCategoryItem([])
        setBusinessCategoryId('')
        setExpenseCategoryId('')
        setCustomerCategoryId('')
        setVendorCategoryId('')
        setDescriptionCategoryId('')
        setPMethodCategoryId('')
        setPAccountCategoryId('')
        if (invoiceState == 'Deposit') {
            setExpenseItem(expenseCategory.filter((val) => (val['type'] == 'income')))
        }
        else {
            setExpenseItem(expenseCategory.filter((val) => (val['type'] == 'expense')))
        }
    }
    
    const handleClick = async () => {
        if (!invoiceState) {
            alert('Please Select Type!');
            return false;
        }
        if (!expenseCategoryId) {
            alert('Please Select Deposit or Expense');
            return false;
        }
        if (!businessCategoryId) {
            alert('Please Select Entity!');
            return false;
        }
        if (!customerCategoryId) {
            alert('Please Select Customer!');
            return false;
        }
        if (!vendorCategoryId) {
            alert('Please Select Vendor!')
            return false
        }
        if (!descriptionCategoryId) {
            alert('Please Select Description!')
            return false
        }
        if (!pMethodCategory) {
            alert('Please Select Payment Method!')
            return false
        }
        if (!pAccountCategoryId) {
            if (invoiceState == 'Deposit')
                alert('Please Selct Paid By!')
            if (invoiceState == 'Expense')
                alert('Please Select Pay from Account!')
            return false
        }
        // if (!businessCategoryId || !invoiceState || !expenseCategoryId || !vendorCategoryId || !descriptionCategoryId || !pMethodCategoryId || !pAccountCategoryId) {
        //     alert('Please select categories!');
        //     return false;
        // }
        const res = await Axios().post('/api/addConfig', {
            importedFileID: importedFileID,
            textItem: invoiceData[0],
            businessCategoryId: businessCategoryId,
            invoiceType: invoiceState,
            expenseCategoryId: expenseCategoryId,
            customerCategoryId: customerCategoryId,
            vendorCategoryId: vendorCategoryId,
            descriptionCategoryId: descriptionCategoryId,
            pMethodCategoryId: pMethodCategoryId,
            pAccountCategoryId: pAccountCategoryId
        })
        var similiarInvoice = [];
        if (res.data.data == true) {
            // console.log(invoiceData)
            similiarInvoice = invoiceData.slice(1, invoiceData.length).filter((item) => {
                return item[1] == invoiceData[0][1]
            });
            // console.log(similiarInvoice)
            const res_1 = await Axios().post('/api/addSimiliarConfig', {
                importedFileID: importedFileID,
                id: res.data.id,
                similiarInvoice: similiarInvoice,
                invoiceType: res.data.invoiceType,
            })
            if (res_1.data.data == true) {
                var tmp = invoiceData.slice(1, invoiceData.length).filter((item) => {
                    return stringSimiliarity.compareTwoStrings(item[1], invoiceData[0][1]) < 0.7
                });
                // console.log(tmp)
                setInvoiceData(tmp)
                setIsUploadClicked(!isUploadClicked)
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

    //Add Options with Input Box and button
    //Business Category
    const clickAddBusinessCategory = async () => {
        var newValue = newBusinessCategory.current.value
        if (newValue == '') return false;
        var tmp = businessCategoryItem.filter((val) => {
            return val['name'] == newValue
        });
        if (tmp.length !== 0) {
            return;
        }
        
        const res = await Axios().get(`/api/addBusinessCategoryFromProcess/?name=${newValue}`)
        var newAddedValue = {
            id: res.data.id,
            name: newValue,
            children: []
        }
        var tmpBusinessCategory = businessCategoryItem
        tmpBusinessCategory.splice(tmpBusinessCategory.length - 1, 0, newAddedValue)
        console.log(tmpBusinessCategory)
        setBusinessCategoryItem([...tmpBusinessCategory])
        newBusinessCategory.current.value = ''
    }
    //Add Expense/Deposit     
    const clickAddExpenseCategory = async () => {
        var newValue = newExpenseCategory.current.value
        if (newValue == '') return false;
        var tmp = customerItem.filter((val) => {
            return val['name'] == newValue
        });
        if (tmp.length !== 0) {
            return;
        }
        
        const res = await Axios().get(`/api/addExpenseCategoryFromProcess/?name=${newValue}&businessCategoryId=${businessCategoryId}&type=${invoiceState}`)
        var newAddedValue = {
            id: res.data.id,
            name: newValue,
            businessCategoryId: businessCategoryId
        }
        var tmpExpenseCategory = expenseItem
        tmpExpenseCategory.splice(tmpExpenseCategory.length - 1, 0, newAddedValue)
        setExpenseItem([...tmpExpenseCategory])
        newExpenseCategory.current.value = ''
    }
    //Customer Category
    const clickAddCustomerCategory = async () => {
        var newValue = newCustomerCategory.current.value
        if (newValue == '') return false;
        var tmp = customerItem.filter((val) => {
            return val['name'] == newValue
        });
        if (tmp.length !== 0) {
            return;
        }
        
        const res = await Axios().get(`/api/addCustomerCategoryFromProcess/?name=${newValue}&businessCategoryId=${businessCategoryId}`)
        var newAddedValue = {
            id: res.data.id,
            name: newValue,
            businessCategoryId: businessCategoryId
        }
        var tmpCustomerCategory = customerItem
        tmpCustomerCategory.splice(tmpCustomerCategory.length - 1, 0, newAddedValue)
        console.log(tmpCustomerCategory)
        setCustomerItem([...tmpCustomerCategory])
        newCustomerCategory.current.value = ''
    }
    //Vendor Category
    const clickAddVendorCategory = async () => {
        var newValue = newVendorCategory.current.value
        if (newValue == '') return false;
        var tmp = vendorItem.filter((val) => {
            return val['name'] == newValue
        });
        if (tmp.length !== 0) {
            return;
        }
        
        const res = await Axios().get(`/api/addVendorCategoryFromProcess/?name=${newValue}&businessCategoryId=${businessCategoryId}`)
        var newAddedValue = {
            id: res.data.id,
            name: newValue,
            businessCategoryId: businessCategoryId
        }
        var tmpVendorCategory = vendorItem
        tmpVendorCategory.splice(tmpVendorCategory.length - 1, 0, newAddedValue)
        // console.log(tmpBusinessCategory)
        setVendorItem([...tmpVendorCategory])
        newVendorCategory.current.value = ''
    }
    //Description Category
    const clickAddDescriptionCategory = async () => {
        var newValue = newDescriptionCategory.current.value
        if (newValue == '') return false;
        var tmp = descriptionItem.filter((val) => {
            return val['name'] == newValue
        });
        if (tmp.length !== 0) {
            return;
        }
        
        const res = await Axios().get(`/api/addDescriptionCategoryFromProcess/?name=${newValue}&businessCategoryId=${businessCategoryId}`)
        var newAddedValue = {
            id: res.data.id,
            name: newValue,
            businessCategoryId: businessCategoryId
        }
        var tmpDescriptionCategory = descriptionItem
        tmpDescriptionCategory.splice(tmpDescriptionCategory.length - 1, 0, newAddedValue)
        // console.log(tmpBusinessCategory)
        setDescriptionItem([...tmpDescriptionCategory])
        newDescriptionCategory.current.value = ''
    }

    //PMethod Category
    const clickAddPMethodCategory = async () => {
        var newValue = newPMethodCategory.current.value
        if (newValue == '') return false;
        var tmp = pMethodItem.filter((val) => {
            return val['name'] == newValue
        });
        if (tmp.length !== 0) {
            return;
        }
        
        const res = await Axios().get(`/api/addPMethodCategoryFromProcess/?name=${newValue}&businessCategoryId=${businessCategoryId}`)
        var newAddedValue = {
            id: res.data.id,
            name: newValue,
            businessCategoryId: businessCategoryId
        }
        var tmpPMethodCategory = pMethodItem
        tmpPMethodCategory.splice(tmpPMethodCategory.length - 1, 0, newAddedValue)
        // console.log(tmpBusinessCategory)
        setPMethodItem([...tmpPMethodCategory])
        newPMethodCategory.current.value = ''
    }
    //PAccount Category
    const clickAddPAccountCategory = async () => {
        var newValue = newPAccountCategory.current.value
        if (newValue == '') return false;
        var tmp = pAccountItem.filter((val) => {
            return val['name'] == newValue
        });
        if (tmp.length !== 0) {
            return;
        }
        
        const res = await Axios().get(`/api/addPAccountCategoryFromProcess/?name=${newValue}&businessCategoryId=${businessCategoryId}`)
        var newAddedValue = {
            id: res.data.id,
            name: newValue,
            businessCategoryId: businessCategoryId
        }
        var tmpPAccountCategory = pAccountItem
        tmpPAccountCategory.splice(tmpPAccountCategory.length - 1, 0, newAddedValue)
        // console.log(tmpBusinessCategory)
        setPAccountItem([...tmpPAccountCategory])
        newPAccountCategory.current.value = ''
    }

    useEffect(() => {
        getCategories()
        // getExpenseOrDeposit()
    }, [businessCategoryId])
    
    useEffect(() => {
        // getExpenseOrDeposit()
        // getCategories()
        getBusinessCategories()
    }, [invoiceState])

    // useEffect(() => {
    //     // getBusinessCategories()
    // }, [expenseCategoryId])

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
                <div class="mb-1 border-b-4">
                    <div class="mb-1 grid grid-cols-12">
                        <div class='col-span-11'>
                            <h1 class="font-bold">Text:</h1>
                            {
                                invoiceData[0] != null &&
                                <div class="mb-2">{invoiceData[0][1]}</div>
                            }
                            
                        </div>
                    </div>
                    <div class="mb-1 grid grid-cols-12">
                        <div class='col-span-11'>
                            <h1 class="font-bold">Amount:</h1>
                            {
                                invoiceData[0] != null &&
                                <div class="mb-2">{invoiceData[0][2]}</div>
                            }
                            
                        </div>
                    </div>
                    <div class="mb-4 grid grid-cols-5">
                        <div class="col-span-1">
                            <Select label="Type" value={invoiceState} onChange={(val) => {SetInvoiceState(val)}}>
                                <Option value="Deposit">Deposit</Option>
                                <Option value="Expense">Expense</Option>
                            </Select>
                        </div>
                        <div class="col-span-2">
                            <Select label="Entities" onChange={(val) => {
                            // if (val == 'addNew') {
                            //     return;
                            // }
                            setBusinessCategoryId(val)
                            }}>
                            {businessCategoryItem.map((business) => {
                                if (business.id == -1) {
                                    return (
                                        <Option value={business.id} key={business.id}
                                            onClickCapture={(e) => {
                                                if (e.target.type == 'button')
                                                    clickAddBusinessCategory();
                                                e.preventDefault(); 
                                                e.stopPropagation();}}
                                        >
                                            <div className="flex relative w-100">
                                                <Input inputRef={newBusinessCategory} onKeyDown={(e) => {
                                                    if (e.key === ' ') {
                                                        e.stopPropagation();
                                                    }
                                                }}/>
                                                <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddBusinessCategory}>
                                                    <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                </Button>
                                            </div>
                                        </Option>
                                    )
                                }
                                else {
                                    return (
                                        <Option value={business.id} key={business.id}>{business.name}</Option>
                                    )
                                }
                            })}
                            </Select>
                        </div>
                        <h5 class="ms-2 col-span-2 flex flex-col justify-end text-tertiary">(*Please Select Entity First!)</h5>
                    </div>
                    <div className="mb-1 grid grid-cols-3 grid-center">
                        {/* <Select label="Method" value={method} onChange={(val) => {setMethod(val)}}> */}
                        <div class="col-span-1 mb-4">   
                        {/* {
                            invoiceState == '' && (
                            <Select label="Expense/Deposit">
                                <Option value="Deposit">Deposit</Option>
                                <Option value="Expense">Expense</Option>
                            </Select>)
                        } */}
                    
                        {/* {
                            invoiceState != '' && (
                            <Select label={invoiceState} onChange={(val) => setExpenseCategoryId(val)}>
                                {expenseItem.map((expense) => {
                                    return (
                                        <Option value={expense.id} key={expense.id}>{expense.name}</Option>
                                    )
                                })}
                            </Select>)
                        } */}
                            <Select label="Expense/Deposit" onChange={(val) => setExpenseCategoryId(val)}>
                                    {expenseItem.map((expense) => {
                                        if (expense.id == -1) {
                                            return (
                                                <Option value={expense.id} key={expense.id}
                                                    onClickCapture={(e) => {
                                                        if (e.target.type == 'button')
                                                            clickAddExpenseCategory();
                                                        e.preventDefault(); 
                                                        e.stopPropagation();}}
                                                >
                                                    <div className="relative flex w-full">
                                                        <div className="flex relative w-full">
                                                            <Input inputRef={newExpenseCategory} onKeyDown={(e) => {
                                                                if (e.key === ' ') {
                                                                    e.stopPropagation();
                                                                }
                                                            }}/>
                                                            <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddExpenseCategory}>
                                                                <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Option>
                                            )
                                        }
                                        else {
                                            return (
                                                <Option value={expense.id} key={expense.id}>{expense.name}</Option>
                                            )
                                        }
                                    })}
                            </Select>
                        </div>
                        <div class="col-span-1 mb-4">
                            <Select label="Customer/Properties" onChange={(val) => setCustomerCategoryId(val)}>
                                {customerItem.map((customer) => {
                                    if (customer.id == -1) {
                                        return (
                                            <Option value={customer.id} key={customer.id}
                                                onClickCapture={(e) => {
                                                    if (e.target.type == 'button')
                                                        clickAddCustomerCategory();
                                                    e.preventDefault(); 
                                                    e.stopPropagation();}}
                                            >
                                                <div className="relative flex w-full">
                                                    <div className="flex relative w-full">
                                                        <Input inputRef={newCustomerCategory} onKeyDown={(e) => {
                                                            if (e.key === ' ') {
                                                                e.stopPropagation();
                                                            }
                                                        }}/>
                                                        <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddCustomerCategory}>
                                                            <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Option>
                                        )
                                    }
                                    else {
                                        return (
                                            <Option value={customer.id} key={customer.id}>{customer.name}</Option>
                                        )
                                    }
                                })}
                            </Select>
                        </div>
                        <div class="col-span-1 mb-4">
                            <Select label="Vendor/Work" onChange={(val) => setVendorCategoryId(val)}>
                                {vendorItem.map((vendor) => {
                                    if (vendor.id == -1) {
                                        return (
                                            <Option value={vendor.id} key={vendor.id}
                                                onClickCapture={(e) => {
                                                    if (e.target.type == 'button')
                                                        clickAddVendorCategory();
                                                    e.preventDefault(); 
                                                    e.stopPropagation();}}
                                            >
                                                <div className="relative flex w-full">
                                                    <div className="flex relative w-full">
                                                        <Input inputRef={newVendorCategory} onKeyDown={(e) => {
                                                            if (e.key === ' ') {
                                                                e.stopPropagation();
                                                            }
                                                        }}/>
                                                        <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddVendorCategory}>
                                                            <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Option>
                                        )
                                    }
                                    else {
                                        return (
                                            <Option value={vendor.id} key={vendor.id}>{vendor.name}</Option>
                                        )
                                    }
                                })}
                            </Select>
                        </div>
                        <div class="col-span-1">
                            <Select label="Description" onChange={(val) => setDescriptionCategoryId(val)}>
                                {descriptionItem.map((description) => {
                                    if (description.id == -1) {
                                        return (
                                            <Option value={description.id} key={description.id}
                                                onClickCapture={(e) => {
                                                    if (e.target.type == 'button')
                                                        clickAddDescriptionCategory();
                                                    e.preventDefault(); 
                                                    e.stopPropagation();}}
                                            >
                                                <div className="relative flex w-full">
                                                    <div className="flex relative w-full">
                                                        <Input inputRef={newDescriptionCategory} onKeyDown={(e) => {
                                                            if (e.key === ' ') {
                                                                e.stopPropagation();
                                                            }
                                                        }}/>
                                                        <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddDescriptionCategory}>
                                                            <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Option>
                                        )
                                    }
                                    else {
                                        return (
                                            <Option value={description.id} key={description.id}>{description.name}</Option>
                                        )
                                    }
                                })}
                            </Select>
                        </div>
                        <div class="col-span-1">
                            <Select label="Payment Method" onChange={(val) => setPMethodCategoryId(val)}>
                                {pMethodItem.map((pMethod) => {
                                    if (pMethod.id == -1) {
                                        return (
                                            <Option value={pMethod.id} key={pMethod.id}
                                                onClickCapture={(e) => {
                                                    if (e.target.type == 'button')
                                                        clickAddPMethodCategory();
                                                    e.preventDefault(); 
                                                    e.stopPropagation();}}
                                            >
                                                <div className="relative flex w-full">
                                                    <div className="flex relative w-full">
                                                        <Input inputRef={newPMethodCategory} onKeyDown={(e) => {
                                                            if (e.key === ' ') {
                                                                e.stopPropagation();
                                                            }
                                                        }}/>
                                                        <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddPMethodCategory}>
                                                            <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Option>
                                        )
                                    }
                                    else {
                                        return (
                                            <Option value={pMethod.id} key={pMethod.id}>{pMethod.name}</Option>
                                        )
                                    }
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
                                        if (pAccount.id == -1) {
                                            return (
                                                <Option value={pAccount.id} key={pAccount.id}
                                                    onClickCapture={(e) => {
                                                        if (e.target.type == 'button')
                                                            clickAddPAccountCategory();
                                                        e.preventDefault(); 
                                                        e.stopPropagation();}}
                                                >
                                                    <div className="relative flex w-full">
                                                        <div className="flex relative w-full">
                                                            <Input inputRef={newPAccountCategory} onKeyDown={(e) => {
                                                                if (e.key === ' ') {
                                                                    e.stopPropagation();
                                                                }
                                                            }}/>
                                                            <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddPAccountCategory}>
                                                                <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Option>
                                            )
                                        }
                                        else {
                                            return (
                                                <Option value={pAccount.id} key={pAccount.id}>{pAccount.name}</Option>
                                            )
                                        }
                                    })}
                                </Select>
                            </div>
                        }
                        {
                            invoiceState == 'Deposit' && 
                            <div class="col-span-1">
                                <Select label="Paid To" onChange={(val) => setPAccountCategoryId(val)}>
                                    {pAccountItem.map((pAccount) => {
                                        if (pAccount.id == -1) {
                                            return (
                                                <Option value={pAccount.id} key={pAccount.id}
                                                    onClickCapture={(e) => {
                                                        if (e.target.type == 'button')
                                                            clickAddPAccountCategory();
                                                        e.preventDefault(); 
                                                        e.stopPropagation();}}
                                                >
                                                    <div className="relative flex w-full">
                                                        <div className="flex relative w-full">
                                                            <Input inputRef={newPAccountCategory} onKeyDown={(e) => {
                                                                if (e.key === ' ') {
                                                                    e.stopPropagation();
                                                                }
                                                            }}/>
                                                            <Button className="flex items-center bg-primary ml-2" size="sm" onClick={clickAddPAccountCategory}>
                                                                <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Option>
                                            )
                                        }
                                        else {
                                            return (
                                                <Option value={pAccount.id} key={pAccount.id}>{pAccount.name}</Option>
                                            )
                                        }
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