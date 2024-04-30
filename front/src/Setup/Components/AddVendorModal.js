import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function AddVendorModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    categoryNodeId,
    vendorNodeId,
    vendorNodeLabel,
    type,
    modalType
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }
    const [vendorName, setVendorName] = useState(modalType == 'Edit' ? vendorNodeLabel : '')

    const handleClick = async () => {
        try {
            if (!vendorName) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') {
                    Axios().post('/api/vendorCategory', {
                        name: vendorName,
                        type: type,
                        categoryNodeId: categoryNodeId,
                        parent: vendorNodeId
                    })
                }
                else {
                    Axios().put('/api/vendorCategory', {
                        name: vendorName,
                        categoryNodeId: categoryNodeId,
                        vendorNodeId: vendorNodeId
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
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
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