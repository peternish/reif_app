import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function ConfirmSettingModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    selectedRowId,
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }

    const handleClick = async () => {
        try {
            await Axios().delete(`/api/settingData?id=${selectedRowId}`)
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
                    className="bg-primary"
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