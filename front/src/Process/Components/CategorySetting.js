import React, { useState , useEffect } from 'react';
import {
    Select, Option, Button
} from "@material-tailwind/react";
import Axios from "../../helper/axiosApi";

const CategorySetting = ({invoiceData, setInvoiceItem, businessCategory, expenseCategory, vendorCategory, descriptionCategory, pMethodCategory, pAccountCategory}) => {
    var invoiceData = invoiceData;
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

    const handleClick = async () => {
        if (!businessCategoryId || !invoiceState || !expenseCategoryId || !vendorCategoryId || !descriptionCategoryId || !pMethodCategoryId || !pAccountCategoryId) {
            alert('Please select categories!');
            return false;
        }
        await Axios().post('/api/addConfig', {
            textItem: invoiceData[0],
            businessCategoryId: businessCategoryId,
            invoiceType: invoiceState,
            expenseCategoryId: expenseCategoryId,
            vendorCategoryId: vendorCategoryId,
            descriptionCategoryId: descriptionCategoryId,
            pMethodCategoryId: pMethodCategoryId,
            pAccountCategoryId: pAccountCategoryId
        })
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
    
    useEffect(() => {
        getCategories()
        getExpenseOrDeposit()
    }, [businessCategoryId])
    
    useEffect(() => {
        getExpenseOrDeposit()
        console.log(expenseItem)
    }, [invoiceState])
    return (
        <div>
            {/* Display category setting page items */}
            
            <div>
                <div class="mb-3 border-b-4">
                    <div class="mb-1 grid grid-cols-12">
                        <div class='col-span-11'>
                            <h1 class="font-bold">Text:</h1>
                            <div class="mb-2">{invoiceData[0][1]}</div>
                        </div>
                    </div>
                    <div className="mb-1 grid grid-cols-7">
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
                            <Select label="Type" val={invoiceState} onChange={(val) => {SetInvoiceState(val)}}>
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
                        <div class="col-span-1">
                            <Select label="Pay From Account" onChange={(val) => setPAccountCategoryId(val)}>
                                {pAccountItem.map((pAccount) => {
                                    return (
                                        <Option value={pAccount.id} key={pAccount.id}>{pAccount.name}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    };

export default CategorySetting;