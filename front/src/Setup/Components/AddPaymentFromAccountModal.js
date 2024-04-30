import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function AddPaymentFromAccountModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    categoryNodeId,
    pAccountNodeId,
    pAccountNodeLabel,
    type,
    modalType
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }
    const [pAccountName, setPAccountName] = useState(modalType == 'Edit' ? pAccountNodeLabel : '')

    const handleClick = async () => {
        try {
            if (!pAccountName) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/pAccountCategory', {
                        name: pAccountName,
                        type: type,
                        categoryNodeId: categoryNodeId,
                        parent: pAccountNodeId
                    })
                }
                else {
                    Axios().put('/api/pAccountCategory', {
                        name: pAccountName,
                        categoryNodeId: categoryNodeId,
                        pAccountNodeId: pAccountNodeId
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
                    value={pAccountName}
                    onChange={(e) => setPAccountName(e.target.value)}
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