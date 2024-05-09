import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function AddCustomerModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    categoryNodeId,
    customerNodeId,
    customerNodeLabel,
    type,
    modalType
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }
    const [customerName, setCustomerName] = useState(modalType == 'Edit' ? customerNodeLabel : '')

    const handleClick = async () => {
        try {
            if (!customerName) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/customerCategory', {
                        name: customerName,
                        type: type,
                        categoryNodeId: categoryNodeId,
                        parent: customerNodeId
                    })
                }
                else {
                    Axios().put('/api/customerCategory', {
                        name: customerName,
                        categoryNodeId: categoryNodeId,
                        customerNodeId: customerNodeId
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
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
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