import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  PlusIcon
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import IncomeTable from "./IncomeTable";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { AddIncomeModal } from "./AddIncomeModal";
import ConfirmModal from "./ConfirmModal";
 
export default function IncomeContent(props) {
  const categoryId = props.categoryId;
  const categoryName = props.categoryName;
  const [pageUpdate, setPageUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedRowId, setSelectedRowId] = useState(0);


  const handlePageUpdate = () => {
    setPageUpdate(!pageUpdate)
  }
  const handleClickAdd = () => {
    setModalType("Add")
    setShowModal(true)
  }
  const handleClickEdit = () => {
    if (selectedRowId == 0) {
      window.alert('Please select row')
      return
    }
    setModalType("Edit")
    setShowModal(true)
  }
  const handleClickDelete = () => {
    if (selectedRowId == 0) {
      window.alert('Please select row')
      return
    }
    setShowConfirmModal(true)
  }

  return (
    <>
      <AddIncomeModal showModal={showModal} setShowModal={setShowModal} modalType={modalType} selectedRowId={selectedRowId} handlePageUpdate={handlePageUpdate} categoryId={categoryId}/>
      <ConfirmModal showModal={showConfirmModal} setShowModal={setShowConfirmModal} selectedRowId={selectedRowId} handlePageUpdate={handlePageUpdate} type={"income"}/>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                {categoryName} - Income
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Details about Income of {categoryName}
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Button className="flex items-center gap-3 bg-primary" size="sm" onClick={handleClickAdd}>
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Income
              </Button>
              <Button className="flex items-center gap-3 bg-secondary" size="sm" onClick={handleClickEdit}>
                <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit Income
              </Button>
              <Button className="flex items-center gap-3 bg-tertiary" size="sm" onClick={handleClickDelete}>
                <GridDeleteIcon strokeWidth={2} className="h-4 w-4" /> Delete Income
              </Button>
              {/* <Button className="flex items-center gap-3 bg-secondary" size="sm">
                <ArrowUpTrayIcon strokeWidth={2} className="h-4 w-4" /> Import
              </Button> */}
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <IncomeTable categoryId={categoryId} pageUpdate={pageUpdate} selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId}/>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        </CardFooter>
      </Card>
    </>
  );
}