import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function AddPaymentMethodModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    categoryNodeId,
    pMethodNodeId,
    pMethodNodeLabel,
    type,
    modalType
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }
    const [pMethodName, setPMethodName] = useState(modalType == 'Edit' ? pMethodNodeLabel : '')

    const handleClick = async () => {
        try {
            if (!pMethodName) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/pMethodCategory', {
                        name: pMethodName,
                        type: type,
                        categoryNodeId: categoryNodeId,
                        parent: pMethodNodeId
                    })
                }
                else {
                    Axios().put('/api/pMethodCategory', {
                        name: pMethodName,
                        categoryNodeId: categoryNodeId,
                        pMethodNodeId: pMethodNodeId
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
                    value={pMethodName}
                    onChange={(e) => setPMethodName(e.target.value)}
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