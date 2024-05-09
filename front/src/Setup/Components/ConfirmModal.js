import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function ConfirmModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    type,
    nodeId,
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }

    const handleClick = async () => {
        try {
            if (type == 'category') {
                await Axios().delete(`/api/businessCategory?nodeId=${nodeId}`)
            }
            else if (type === 'expense') {
                await Axios().delete(`/api/expenseCategory?nodeId=${nodeId}`)
            }
            else if (type == 'customer') {
                await Axios().delete(`/api/customerCategory?nodeId=${nodeId}`)
            }
            else if (type == 'vendor') {
                await Axios().delete(`/api/vendorCategory?nodeId=${nodeId}`)
            }
            else if (type == 'description') {
                await Axios().delete(`/api/descriptionCategory?nodeId=${nodeId}`)
            }
            else if (type == 'pMethod') {
                await Axios().delete(`/api/pMethodCategory?nodeId=${nodeId}`)
            }
            else if (type == 'pAccount') {
                await Axios().delete(`/api/pAccountCategory?nodeId=${nodeId}`)
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