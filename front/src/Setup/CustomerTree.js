import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Card } from '@material-tailwind/react';
import YDivider from '../ComponentUtils/YDivider';
import AddButton from './Components/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import AddCustomerModal from './Components/AddCustomerModal';
import Axios from '../helper/axiosApi';
import useErrorHandler from '../helper/handleError';
import RenderTree from './Components/RenderTree';
import ConfirmModal from './Components/ConfirmModal';

export default function Customer() {

    const handleError = useErrorHandler()

    const categoryNodeId = useSelector(state => state.status.categoryNodeId)
    const categoryNodeLabel = useSelector(state => state.status.categoryNodeLabel)
    const [type, setType] = useState('')
    const [modalType, setModalType] = useState('')
    const [customerNodeId, setCustomerNodeId] = useState('0')
    const [customerNodeLabel, setCustomerNodeLabel] = useState('')
    const [showCustomerModal, setShowCustomerModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [customerData, setCustomerData] = useState([])

    const [pageUpdate, setPageUpdate] = useState(false)

    const handlePageUpdate = () => {
        setPageUpdate(!pageUpdate)
    }

    const handleCustomerClick = () => {
        setType('Customer')
        setModalType('Add')
        setShowCustomerModal(true)
    }

    const handleClickEdit = (nodeId, type, nodeLabel) => {
        setCustomerNodeId(nodeId)
        setCustomerNodeLabel(nodeLabel)
        setType(type)
        setModalType('Edit')
        setShowCustomerModal(true)
    }

    const handleClickDelete = (nodeId) => {
        setCustomerNodeId(nodeId)
        setShowConfirmModal(true)
    }

    const fetchCustomer = async () => {
        try {
            const res = await Axios().get(`/api/customerCategory/?businessCategoryId=${categoryNodeId}`)
            setCustomerData(res.data.customer)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchCustomer()
    }, [pageUpdate, categoryNodeId])

    return (
        <>
            {
                showCustomerModal &&
                <AddCustomerModal
                    showModal={showCustomerModal}
                    setShowModal={setShowCustomerModal}
                    handlePageUpdate={handlePageUpdate}
                    categoryNodeId={categoryNodeId}
                    customerNodeId={customerNodeId}
                    customerNodeLabel={customerNodeLabel}
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
                    nodeId={customerNodeId}
                    type='customer'
                />
            }
            
            <div className='flex flex-col items-center'>
                <Card className='bg-secondary w-full text-white flex justify-center items-center p-3'>
                    <h1>Customer/Properties:</h1>
                    <h1 className='text-[1.5rem]'>{categoryNodeLabel}</h1>
                </Card>
                <div className='flex flex-col w-full gap-4'>
                    <Box className='w-full my-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-[1.5rem]'>Customer/Properties</h1>
                            <AddButton
                                onClick={() => handleCustomerClick()}
                            />
                        </div>
                        <YDivider />
                        <TreeView
                            aria-label="file system navigator"
                            defaultEndIcon={<i className="fa-solid fa-circle text-secondary opacity-80"></i>}
                        >
                            {
                                customerData.map((customer) => {
                                    return (
                                        <RenderTree
                                            category={customer}
                                            type='customer'
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