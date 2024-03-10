import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function AddExpenseModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    categoryNodeId,
    expenseNodeId,
    expenseNodeLabel,
    type,
    modalType
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }
    const [expenseName, setExpenseName] = useState(modalType == 'Edit' ? expenseNodeLabel : '')

    const handleClick = async () => {
        try {
            if (!expenseName) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/expenseCategory', {
                        name: expenseName,
                        type: type,
                        categoryNodeId: categoryNodeId,
                        parent: expenseNodeId
                    })
                }
                else {
                    Axios().put('/api/expenseCategory', {
                        name: expenseName,
                        categoryNodeId: categoryNodeId,
                        expenseNodeId: expenseNodeId
                    })
                }
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
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                />
            </DialogBody>
            <DialogFooter className="flex justify-between">
                <Button
                    className="bg-primary"
                    onClick={() => handleClick()}
                >
                    {modalType} {type}
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