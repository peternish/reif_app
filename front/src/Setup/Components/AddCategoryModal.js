import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";

export default function AddCategoryModal({
    showModal,
    setShowModal,
    handlePageUpdate,
    nodeId,
    nodeLabel,
    modalType
}) {
    const handleError = useErrorHandler()

    const handleOpen = () => {
        setShowModal(false)
    }

    const [categoryName, setCategoryName] = useState(modalType == 'Edit' ? nodeLabel : null);

    const handleClick = async () => {
        try {
            if (!categoryName) {
                window.alert('fill out.')
            }
            else {
                if (modalType == 'Add') { // add category
                    await Axios().post('/api/businessCategory', {
                        name: categoryName,
                        parent: nodeId
                    })
                }
                else { // edit category
                    await Axios().put('/api/businessCategory', {
                        name: categoryName,
                        nodeId: nodeId,
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
                    label="Name the Category"
                    size="lg"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </DialogBody>
            <DialogFooter className="flex justify-end">
                <Button
                    className="bg-primary"
                    onClick={() => handleClick()}
                >
                    {modalType}
                </Button>
            </DialogFooter>
        </Dialog>
    )
}