import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Card } from '@material-tailwind/react';
import YDivider from '../ComponentUtils/YDivider';
import AddButton from './Components/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import AddVendorModal from './Components/AddVendorModal';
import Axios from '../helper/axiosApi';
import useErrorHandler from '../helper/handleError';
import RenderTree from './Components/RenderTree';
import ConfirmModal from './Components/ConfirmModal';

export default function VendorTree() {

    const handleError = useErrorHandler()

    const categoryNodeId = useSelector(state => state.status.categoryNodeId)
    const categoryNodeLabel = useSelector(state => state.status.categoryNodeLabel)
    const [type, setType] = useState('')
    const [modalType, setModalType] = useState('')
    const [vendorNodeId, setVendorNodeId] = useState('0')
    const [vendorNodeLabel, setVendorNodeLabel] = useState('')
    const [showVendorModal, setShowVendorModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [vendorData, setVendorData] = useState([])

    const [pageUpdate, setPageUpdate] = useState(false)

    const handlePageUpdate = () => {
        setPageUpdate(!pageUpdate)
    }

    const handleVendorClick = () => {
        setType('Vendor')
        setModalType('Add')
        setShowVendorModal(true)
    }

    const handleClickEdit = (nodeId, type, nodeLabel) => {
        setVendorNodeId(nodeId)
        setVendorNodeLabel(nodeLabel)
        setType(type)
        setModalType('Edit')
        setShowVendorModal(true)
    }

    const handleClickDelete = (nodeId) => {
        setVendorNodeId(nodeId)
        setShowConfirmModal(true)
    }

    const fetchVendor = async () => {
        try {
            const res = await Axios().get(`/api/getVendor/?businessCategoryId=${categoryNodeId}`)
            setVendorData(res.data.vendor)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchVendor()
    }, [pageUpdate, categoryNodeId])

    return (
        <>
            {
                showVendorModal &&
                <AddVendorModal
                    showModal={showVendorModal}
                    setShowModal={setShowVendorModal}
                    handlePageUpdate={handlePageUpdate}
                    categoryNodeId={categoryNodeId}
                    vendorNodeId={vendorNodeId}
                    vendorNodeLabel={vendorNodeLabel}
                    type={type}
                    modalType={modalType}
                />
            }
            {
                showConfirmModal &&
                <ConfirmModal
                    showModal={showConfirmModal}
                    setShowModal={setShowConfirmModal}
                    handlePageUpdate={handlePageUpdate}
                    nodeId={vendorNodeId}
                    type='vendor'
                />
            }
            <div className='flex flex-col items-center'>
                <Card className='bg-secondary w-full text-white flex justify-center items-center p-3'>
                    <h1>Vendor/Worker:</h1>
                    <h1 className='text-[1.5rem]'>{categoryNodeLabel}</h1>
                </Card>
                <div className='flex flex-col w-full gap-4'>
                    <Box className='w-full my-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-[1.5rem]'>Vendor/Worker</h1>
                            <AddButton
                                onClick={() => handleVendorClick()}
                            />
                        </div>
                        <YDivider />
                        <TreeView
                            aria-label="file system navigator"
                            defaultEndIcon={<i className="fa-solid fa-circle text-secondary opacity-80"></i>}
                        >
                            {
                                vendorData.map((vendor) => {
                                    return (
                                        <RenderTree
                                            category={vendor}
                                            type='vendor'
                                            handleClickEdit={handleClickEdit}
                                            handleClickDelete={handleClickDelete}
                                        />
                                    )
                                })
                            }
                        </TreeView>
                    </Box>
                </div>
            </div>
        </>
    );
}