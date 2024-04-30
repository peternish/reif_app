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

var addNewClicked = false;

export function AddSettingModal({ showModal, setShowModal, modalType, selectedRowId, handlePageUpdate}) {
    const handleError = useErrorHandler()
    const handleOpen = () => {
        setShowModal(false)
    }
    const [inputValue, setInputValue] = useState('')
    const [type, setType] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState('')

    const [categories, setCategories] = useState([])
    const getCategories = async () => {
        const res = await Axios().get(`/api/businessCategory`)
        setCategories(res.data)
    }
    console.log(selectedRowId)
    const getSettingData = async () => {
        if (modalType == 'Add') {
            setInputValue('')
            setType('')
            setCategoryName('')
            setCategoryId('')
            return
        }
        else if(modalType == 'Edit') {
            console.log("get edit data")
            const res = await Axios().get(`/api/settingData?id=${selectedRowId}`)
            const editSettingData = res.data[0];
            setInputValue(editSettingData.inputValue)
            setType(editSettingData.type)
            setCategoryName(editSettingData.category_name)
            setCategoryId(editSettingData.categoryId)
        }
    }

    useEffect(() => {
        getCategories()
        getSettingData();
    }, [showModal, modalType])

    const handleClick = async () => {
        try {
            if (!inputValue || !type || !categoryName) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/settingData', {
                        inputValue: inputValue,
                        type: type,
                        categoryName: categoryName,
                        categoryId: categoryId,
                    })
                    getSettingData()
                }
                else {
                    Axios().put('/api/settingData', {
                        id: selectedRowId,
                        inputValue: inputValue,
                        type: type,
                        categoryName: categoryName,
                        categoryId: categoryId,
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
                <div className="grid gap-4 mb-4">
                    <div className="">
                        <Input label="Input Value" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                </div>
                <div className="grid gap-4 mb-4">
                    <div className="">
                        <Select label="Type" value={type} onChange={(val) => {setType(val)}}>
                            <Option value="Start With">Start With</Option>
                            <Option value="Contain">Contain</Option>
                            <Option value="End">End</Option>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-4 mb-4">
                    <div className="">
                    <Select label="Select Category" value={categoryId} onChange={(val) => { setCategoryId(val); setCategoryName(categories.filter(c => c.id == val)[0].name) }}>
                            {categories.map((category, index) => {
                                return (
                                    <Option value={category.id} key={index}>{category.name}</Option>
                                )
                            })}
                        </Select>
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
                    onClick={() => { handleOpen(); handlePageUpdate(); getSettingData(); }}
                >
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    )
}