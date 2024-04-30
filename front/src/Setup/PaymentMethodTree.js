import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Card } from '@material-tailwind/react';
import YDivider from '../ComponentUtils/YDivider';
import AddButton from './Components/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import AddPaymentMethodModal from './Components/AddPaymentMethodModal';
import Axios from '../helper/axiosApi';
import useErrorHandler from '../helper/handleError';
import RenderTree from './Components/RenderTree';
import ConfirmModal from './Components/ConfirmModal';

export default function PaymentMethodTree() {

    const handleError = useErrorHandler()

    const categoryNodeId = useSelector(state => state.status.categoryNodeId)
    const categoryNodeLabel = useSelector(state => state.status.categoryNodeLabel)
    const [type, setType] = useState('')
    const [modalType, setModalType] = useState('')
    const [pMethodNodeId, setPMethodNodeId] = useState('0')
    const [pMethodNodeLabel, setPMethodNodeLabel] = useState('')
    const [showPMethodModal, setShowPMethodModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [pMethodData, setPMethodData] = useState([])

    const [pageUpdate, setPageUpdate] = useState(false)

    const handlePageUpdate = () => {
        setPageUpdate(!pageUpdate)
    }

    const handlePMethodClick = () => {
        setType('Vendor')
        setModalType('Add')
        setShowPMethodModal(true)
    }

    const handleClickEdit = (nodeId, type, nodeLabel) => {
        setPMethodNodeId(nodeId)
        setPMethodNodeLabel(nodeLabel)
        setType(type)
        setModalType('Edit')
        setShowPMethodModal(true)
    }

    const handleClickDelete = (nodeId) => {
        setPMethodNodeId(nodeId)
        setShowConfirmModal(true)
    }

    const fetchPMethod = async () => {
        try {
            const res = await Axios().get(`/api/pMethodCategory/?businessCategoryId=${categoryNodeId}`)
            setPMethodData(res.data.pMethod)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchPMethod()
    }, [pageUpdate, categoryNodeId])

    return (
        <>
            {
                showPMethodModal &&
                <AddPaymentMethodModal
                    showModal={showPMethodModal}
                    setShowModal={setShowPMethodModal}
                    handlePageUpdate={handlePageUpdate}
                    categoryNodeId={categoryNodeId}
                    pMethodNodeId={pMethodNodeId}
                    pMethodNodeLabel={pMethodNodeLabel}
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
                    nodeId={pMethodNodeId}
                    type='pMethod'
                />
            }
            
            <div className='flex flex-col items-center'>
                <Card className='bg-secondary w-full text-white flex justify-center items-center p-3'>
                    <h1>Payment Method:</h1>
                    <h1 className='text-[1.5rem]'>{categoryNodeLabel}</h1>
                </Card>
                <div className='flex flex-col w-full gap-4'>
                    <Box className='w-full my-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-[1.5rem]'>Payment Method</h1>
                            <AddButton
                                onClick={() => handlePMethodClick()}
                            />
                        </div>
                        <YDivider />
                        <TreeView
                            aria-label="file system navigator"
                            defaultEndIcon={<i className="fa-solid fa-circle text-secondary opacity-80"></i>}
                        >
                            {
                                pMethodData.map((pmethod) => {
                                    return (
                                        <RenderTree
                                            category={pmethod}
                                            type='pMethod'
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