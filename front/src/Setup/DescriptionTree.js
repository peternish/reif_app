import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Card } from '@material-tailwind/react';
import YDivider from '../ComponentUtils/YDivider';
import AddButton from './Components/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import AddDescriptionModal from './Components/AddDescriptionModal';
import Axios from '../helper/axiosApi';
import useErrorHandler from '../helper/handleError';
import RenderTree from './Components/RenderTree';
import ConfirmModal from './Components/ConfirmModal';

export default function DescriptionTree() {

    const handleError = useErrorHandler()

    const categoryNodeId = useSelector(state => state.status.categoryNodeId)
    const categoryNodeLabel = useSelector(state => state.status.categoryNodeLabel)
    const [type, setType] = useState('')
    const [modalType, setModalType] = useState('')
    const [descriptionNodeId, setDescriptionNodeId] = useState('0')
    const [descriptionNodeLabel, setDescriptionNodeLabel] = useState('')
    const [showDescriptionModal, setShowDescriptionModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [descriptionData, setDescriptionData] = useState([])

    const [pageUpdate, setPageUpdate] = useState(false)

    const handlePageUpdate = () => {
        setPageUpdate(!pageUpdate)
    }

    const handleDescriptionClick = () => {
        setType('Description')
        setModalType('Add')
        setShowDescriptionModal(true)
    }

    const handleClickEdit = (nodeId, type, nodeLabel) => {
        setDescriptionNodeId(nodeId)
        setDescriptionNodeLabel(nodeLabel)
        setType(type)
        setModalType('Edit')
        setShowDescriptionModal(true)
    }

    const handleClickDelete = (nodeId) => {
        setDescriptionNodeId(nodeId)
        setShowConfirmModal(true)
    }

    const fetchDescription = async () => {
        try {
            const res = await Axios().get(`/api/descriptionCategory/?businessCategoryId=${categoryNodeId}`)
            setDescriptionData(res.data.description)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchDescription()
    }, [pageUpdate, categoryNodeId])

    return (
        <>
            {
                showDescriptionModal &&
                <AddDescriptionModal
                    showModal={showDescriptionModal}
                    setShowModal={setShowDescriptionModal}
                    handlePageUpdate={handlePageUpdate}
                    categoryNodeId={categoryNodeId}
                    descriptionNodeId={descriptionNodeId}
                    descriptionNodeLabel={descriptionNodeLabel}
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
                    nodeId={descriptionNodeId}
                    type='description'
                />
            }
            <div className='flex flex-col items-center'>
                <Card className='bg-secondary w-full text-white flex justify-center items-center p-3'>
                    <h1>Description:</h1>
                    <h1 className='text-[1.5rem]'>{categoryNodeLabel}</h1>
                </Card>
                <div className='flex flex-col w-full gap-4'>
                    <Box className='w-full my-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-[1.5rem]'>Description</h1>
                            <AddButton
                                onClick={() => handleDescriptionClick()}
                            />
                        </div>
                        <YDivider />
                        <TreeView
                            aria-label="file system navigator"
                            defaultEndIcon={<i className="fa-solid fa-circle text-secondary opacity-80"></i>}
                        >
                            {
                                descriptionData.map((desc) => {
                                    return (
                                        <RenderTree
                                            category={desc}
                                            type='description'
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