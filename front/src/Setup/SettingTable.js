import * as React from 'react';
import { DataGrid, GridPagination, GridToolbarColumnsButton, 
    GridToolbarContainer, GridToolbarExport, 
    GridToolbarFilterButton, gridPageCountSelector, 
    useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import MuiPagination from "@mui/material/Pagination";
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import useErrorHandler from '../helper/handleError';
import Axios from '../helper/axiosApi';

const columns = [
    { field: 'inputValue', headerName: 'Input Value', flex: 1, align:'center', headerAlign: 'center', resizable: true },
    { field: 'type', headerName: 'Type', flex: 0.8, align:'center', headerAlign: 'center' },
    { field: 'categoryName', headerName: 'Category', flex: 1, align:'center', headerAlign: 'center' },
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



export default function SettingTable(props) {
    const pageUpdate = props.pageUpdate;
    const selectedRowId = props.selectedRowId;
    const setSelectedRowId = props.setSelectedRowId;

    const [settingData, setSettingData] = useState([]);

    const handleError = useErrorHandler();

    const getSettingData = async () => {
        try {
            const res = await Axios().get(`/api/allSettingData`)
            setSettingData(res.data);
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        getSettingData();
    }, [pageUpdate])

    return (
        <Box style={{ height: 500, width: '100%' }}>
            {/* <DataGrid rows={incomeData} columns={columns}  */}
            <DataGrid rows={settingData} columns={columns} rowSelectionModel={selectedRowId} onRowSelectionModelChange={(newRowSelection) => {setSelectedRowId(newRowSelection);}}
                slots={{ toolbar: CustomToolbar, pagination: CustomPagination }} 
                initialState={{
                    pagination: {paginationModel: {pageSize: 10}}
                }}
                pageSizeOptions={[10, 20, 50, 100]}
            />
        </Box>
  );
}
