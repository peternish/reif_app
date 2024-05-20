import React from "react";
import {
    Button,
    Dialog,
    DialogBody, DialogFooter, DialogHeader,
    Select, Option,
    Input,
} from "@material-tailwind/react";
import {
    PlusIcon
  } from "@heroicons/react/24/outline";
import { DataGrid, GridPagination, GridToolbarColumnsButton, 
    GridToolbarContainer, GridToolbarExport, 
    GridToolbarFilterButton, gridPageCountSelector, 
    useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import MuiPagination from "@mui/material/Pagination";
import { Box } from '@mui/material';
import Axios from "../../helper/axiosApi";
import useErrorHandler from "../../helper/handleError";
import { useState, useEffect } from "react";

const columns = [
    { field: 'id', headerName: 'Id', flex: 1, align:'center', headerAlign: 'center' },
    { field: 'file_name', headerName: 'File Name', flex: 1, align:'center', headerAlign: 'center' },
  ];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}

function Pagination({ page, onPageChange, className}) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return  (
        <MuiPagination 
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event, newPage - 1);
        }}/>
    )
}

function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props}/>;
}

export function UploadedPDFModal({ showModal, setShowModal, handlePageUpdate, setInvoiceData, uploadedData, setImportedFileID, 
                                    setBusinessCategory, setExpenseCategory, setCustomerCategory, setVendorCategory, setDescriptionCategory,
                                    setPMethodCategory, setPAccountCategory}) {
    const [selectedRowId, setSelectedRowId] = useState(0)

    const handleOpen = () => {
        setShowModal(false)
    }
    const handleClick = async () => {
        if (selectedRowId == '0') {
            alert("Please select file");
            return;
        }
        const filtered = uploadedData.filter((u) => u['id'] == selectedRowId)
        if (filtered.length == 0) {
            alert("This file already finished uploading");
            return;
        }

        setInvoiceData(JSON.parse(filtered[0]['extra_data']));
        setImportedFileID(filtered[0]['id'])

        //Get All Categories List
        const res = await Axios().get('/api/getAllCategories');
        
        setBusinessCategory(res.data.businessCategory)
        setExpenseCategory(res.data.expenseCategory)
        setCustomerCategory(res.data.customerCategory)
        setVendorCategory(res.data.vendorCategory)
        setDescriptionCategory(res.data.descriptionCategory)
        setPMethodCategory(res.data.pMethodCategory)
        setPAccountCategory(res.data.pAccountCategory)
        setShowModal(false);
    }

    return (
        <Dialog
        open={showModal}
        size="xl"
        handler={handleOpen}
        >
            <DialogHeader>Uploaded File</DialogHeader>
            <DialogBody className="" >
                <Box style={{ height: 500, width: '100%' }}>
                    <DataGrid rows={uploadedData} columns={columns} rowSelectionModel={selectedRowId} onRowSelectionModelChange={(newRowSelection) => {setSelectedRowId(newRowSelection);}}
                        slots={{ toolbar: CustomToolbar, pagination: CustomPagination }} 
                        initialState={{
                            pagination: {paginationModel: {pageSize: 10}}
                        }}
                        pageSizeOptions={[10, 20, 50, 100]}
                    />
                </Box>
            </DialogBody>
            <DialogFooter className="flex">
                <Button
                    className="bg-primary  mr-2"
                    onClick={() => handleClick()}
                >
                    Continue
                </Button>
                <Button
                    className="bg-tertiary"
                    onClick={() => { handleOpen(); handlePageUpdate();}}
                >
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    )
}