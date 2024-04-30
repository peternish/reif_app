import { useState } from "react";
import YDivider from "../ComponentUtils/YDivider";
import CategoryTree from "./CategoryTree";
import ExpenseTree from "./ExpenseTree";
import VendorTree from "./VendorTree";
import DescriptionTree from "./DescriptionTree";
import PaymentMethodTree from "./PaymentMethodTree";
import PayFromAccountTree from "./PayFromAccountTree";
import SettingTable from "./SettingTable";

// import { PencilIcon } from "@heroicons/react/24/solid";
// import {
//   PlusIcon
// } from "@heroicons/react/24/outline";

// import { GridDeleteIcon } from "@mui/x-data-grid";

import {
    Card,
    Button
  } from "@material-tailwind/react";
// import { AddSettingModal } from "./Components/AddSettingModal";
// import ConfirmSettingModal from "./Components/ConfirmSettingModal";
export default function Setup() {
    const [pageUpdate, setPageUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [selectedRowId, setSelectedRowId] = useState(0);
  
    const handlePageUpdate = () => {
        setPageUpdate(!pageUpdate)
    }
    const handleClickAdd = () => {
        setModalType("Add")
        setShowModal(true)
    }
    const handleClickEdit = () => {
        if (selectedRowId == 0) {
            window.alert('Please select row')
            return
        }
        setModalType("Edit")
        setShowModal(true)
    }
    const handleClickDelete = () => {
        if (selectedRowId == 0) {
            window.alert('Please select row')
            return
          }
          setShowConfirmModal(true)
    }

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
            <div className="grid grid-cols-12 my-3 gap-4">
                <div className="col-span-12 md:col-span-12 p-6">
                    <CategoryTree />
                </div>
                <div className="col-span-6 md:col-span-4">
                    <ExpenseTree />
                </div>
                <div className="col-span-6 md:col-span-4">
                    <VendorTree />
                </div>
                <div className="col-span-6 md:col-span-4">
                    <DescriptionTree />
                </div>
                <div className="col-span-6 md:col-span-6">
                    <PaymentMethodTree />
                </div>
                <div className="col-span-6 md:col-span-6">
                    <PayFromAccountTree />
                </div>
            </div>
            
            {/* <Card className="p-3">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-[1.5rem] px-4">Setting</h1>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <Button className="flex items-center gap-3 bg-primary" size="sm" onClick={handleClickAdd}>
                            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                        </Button>
                        <Button className="flex items-center gap-3 bg-secondary" size="sm" onClick={handleClickEdit}>
                            <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit
                        </Button>
                        <Button className="flex items-center gap-3 bg-tertiary" size="sm" onClick={handleClickDelete}>
                            <GridDeleteIcon strokeWidth={2} className="h-4 w-4" /> Delete
                        </Button>
                    </div>
                </div>
                <YDivider />
                <SettingTable pageUpdate={pageUpdate} selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId}/>
                <AddSettingModal showModal={showModal} setShowModal={setShowModal} modalType={modalType} selectedRowId={selectedRowId} handlePageUpdate={handlePageUpdate}/>
                <ConfirmSettingModal showModal={showConfirmModal} setShowModal={setShowConfirmModal} selectedRowId={selectedRowId} handlePageUpdate={handlePageUpdate}/>
            </Card> */}
        </>
    );
}
