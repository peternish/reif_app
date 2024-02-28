import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function AddExpenseModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    categoryNodeId,
    modalType
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }

    const [expenseName, setExpenseName] = useState('')

    const handleClick = async () => {
        try {
            if (!expenseName) {
                window.alert('fill out.')
            }
            else {
                Axios().post('/api/expenseCategory', {
                    name: expenseName,
                    type: modalType,
                    categoryNodeId: categoryNodeId,
                    parent: 0
                })
                handleOpen()
                handlePageUpdate()
            }
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
            <DialogBody>
                <Input
                    type="text"
                    label={`Input ${modalType}`}
                    size="lg"
                    onChange={(e) => setExpenseName(e.target.value)}
                />
            </DialogBody>
            <DialogFooter className="flex justify-end">
                <Button
                    className="bg-primary"
                    onClick={() => handleClick()}
                >
                    Add {modalType}
                </Button>
            </DialogFooter>
        </Dialog>
    )
}