import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Card } from '@material-tailwind/react';
import YDivider from '../ComponentUtils/YDivider';
import AddButton from './Components/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import AddPaymentFromAccountModal from './Components/AddPaymentFromAccountModal';
import Axios from '../helper/axiosApi';
import useErrorHandler from '../helper/handleError';
import RenderTree from './Components/RenderTree';
import ConfirmModal from './Components/ConfirmModal';

export default function PayFromAccount() {

    const handleError = useErrorHandler()

    const categoryNodeId = useSelector(state => state.status.categoryNodeId)
    const categoryNodeLabel = useSelector(state => state.status.categoryNodeLabel)
    const [type, setType] = useState('')
    const [modalType, setModalType] = useState('')
    const [pAccountNodeId, setPAccountNodeId] = useState('0')
    const [pAccountNodeLabel, setPAccountNodeLabel] = useState('')
    const [showPAccountModal, setShowPAccountModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [pAccountData, setPAccountData] = useState([])

    const [pageUpdate, setPageUpdate] = useState(false)

    const handlePageUpdate = () => {
        setPageUpdate(!pageUpdate)
    }

    const handlePAccountClick = () => {
        setType('Vendor')
        setModalType('Add')
        setShowPAccountModal(true)
    }

    const handleClickEdit = (nodeId, type, nodeLabel) => {
        setPAccountNodeId(nodeId)
        setPAccountNodeLabel(nodeLabel)
        setType(type)
        setModalType('Edit')
        setShowPAccountModal(true)
    }

    const handleClickDelete = (nodeId) => {
        setPAccountNodeId(nodeId)
        setShowConfirmModal(true)
    }

    const fetchPAccount = async () => {
        try {
            const res = await Axios().get(`/api/pAccountCategory/?businessCategoryId=${categoryNodeId}`)
            setPAccountData(res.data.pAccount)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchPAccount()
    }, [pageUpdate, categoryNodeId])

    return (
        <>
            {
                showPAccountModal &&
                <AddPaymentFromAccountModal
                    showModal={showPAccountModal}
                    setShowModal={setShowPAccountModal}
                    handlePageUpdate={handlePageUpdate}
                    categoryNodeId={categoryNodeId}
                    pAccountNodeId={pAccountNodeId}
                    pAccountNodeLabel={pAccountNodeLabel}
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
                    nodeId={pAccountNodeId}
                    type='pAccount'
                />
            }
            
            <div className='flex flex-col items-center'>
                <Card className='bg-secondary w-full text-white flex justify-center items-center p-3'>
                    <h1>Payment From Account:</h1>
                    <h1 className='text-[1.5rem]'>{categoryNodeLabel}</h1>
                </Card>
                <div className='flex flex-col w-full gap-4'>
                    <Box className='w-full my-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-[1.5rem]'>Payment From Account</h1>
                            <AddButton
                                onClick={() => handlePAccountClick()}
                            />
                        </div>
                        <YDivider />
                        <TreeView
                            aria-label="file system navigator"
                            defaultEndIcon={<i className="fa-solid fa-circle text-secondary opacity-80"></i>}
                        >
                            {
                                pAccountData.map((paccount) => {
                                    return (
                                        <RenderTree
                                            category={paccount}
                                            type='pAccount'
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