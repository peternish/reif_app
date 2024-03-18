import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function ConfirmModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    type,
    selectedRowId
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }

    const handleClick = async () => {
        try {
            if (type === 'income') {
                await Axios().delete(`/api/incomeData?id=${selectedRowId}`)
            }
            else {
                await Axios().delete(`/api/expenseData?id=${selectedRowId}`)
            }
            handleOpen()
            handlePageUpdate()
        } catch (err) {
            console.log(err)
            handleError(err)
        }
    }

    return (
        <Dialog
            open={showModal}
            size="sm"
            handler={handleOpen}
        >
            <DialogFooter className="flex justify-between">
                <Button
                    className="bg-tertiary"
                    onClick={() => handleClick()}
                >
                    Delete
                </Button>
                <Button
                    className="bg-primary"
                    onClick={() => setShowModal(false)}
                >
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    )
}