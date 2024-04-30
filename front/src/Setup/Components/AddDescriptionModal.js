import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function AddDescriptionModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    categoryNodeId,
    descriptionNodeId,
    descriptionNodeLabel,
    type,
    modalType
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }
    const [descriptionName, setDescriptionName] = useState(modalType == 'Edit' ? descriptionNodeLabel : '')

    const handleClick = async () => {
        try {
            if (!descriptionName) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/descriptionCategory', {
                        name: descriptionName,
                        type: type,
                        categoryNodeId: categoryNodeId,
                        parent: descriptionNodeId
                    })
                }
                else {
                    Axios().put('/api/descriptionCategory', {
                        name: descriptionName,
                        categoryNodeId: categoryNodeId,
                        vendorNodeId: descriptionNodeId
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
                    value={descriptionName}
                    onChange={(e) => setDescriptionName(e.target.value)}
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