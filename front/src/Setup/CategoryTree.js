import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Card } from '@material-tailwind/react';
import YDivider from '../ComponentUtils/YDivider';
import AddButton from './Components/AddButton';
import AddCategoryModal from './Components/AddCategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import useErrorHandler from '../helper/handleError';
import Axios from '../helper/axiosApi';
import { setCategoryNodeId, setCategoryNodeLabel } from '../store/StatusSlice';
import RenderTree from './Components/RenderTree';
import ConfirmModal from './Components/ConfirmModal';

export default function CategoryTree() {

    const dispatch = useDispatch()
    const handleError = useErrorHandler()

    const [pageUpdate, setPageUpdate] = useState(false)

    const nodeLabel = useSelector(state => state.status.categoryNodeLabel)
    const nodeId = useSelector(state => state.status.categoryNodeId)
    const [modalType, setModalType] = useState('Add')
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [categories, setCategories] = useState([])

    const handleClickAdd = (nodeId) => {
        dispatch(setCategoryNodeId(nodeId))
        setModalType('Add')
        setShowAddCategoryModal(true);
    }

    const handleClickEdit = (nodeId, nodeLabel) => {
        dispatch(setCategoryNodeId(nodeId))
        dispatch(setCategoryNodeLabel(nodeLabel))
        setModalType('Edit')
        setShowAddCategoryModal(true)
    }

    const handleClickDelete = (nodeId) => {
        dispatch(setCategoryNodeId(nodeId))
        setShowConfirmModal(true)
    }

    const handlePageUpdate = () => {
        setPageUpdate(!pageUpdate)
    }

    const fetchCategories = async () => {
        try {
            const res = await Axios().get('/api/businessCategory')
            console.log(res.data)
            setCategories(res.data)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [pageUpdate])

    return (
        <>
            {showAddCategoryModal &&
                <AddCategoryModal
                    showModal={showAddCategoryModal}
                    setShowModal={setShowAddCategoryModal}
                    handlePageUpdate={handlePageUpdate}
                    nodeId={nodeId}
                    nodeLabel={nodeLabel}
                    modalType={modalType}
                />
            }
            {showConfirmModal &&
                <ConfirmModal
                    showModal={showConfirmModal}
                    setShowModal={setShowConfirmModal}
                    handlePageUpdate={handlePageUpdate}
                    nodeId={nodeId}
                    type='category'
                />
            }
            <div className='flex flex-col items-center'>
                <Card className='bg-secondary w-full text-white flex justify-center items-center p-3 text-[1.5rem]'>
                    <h1>Set Up Categories</h1>
                </Card>
                <Box className='w-full my-2'>
                    <div className='flex justify-between'>
                        <h1 className='text-[1.5rem]'>Categories</h1>
                        <AddButton
                            onClick={() => { handleClickAdd('0') }}
                        />
                    </div>
                    <YDivider />
                    <TreeView
                        aria-label="file system navigator"
                        defaultEndIcon={<i className="fa-solid fa-circle text-secondary opacity-80"></i>}
                        defaultCollapseIcon={<i className="fa-solid fa-circle-minus text-secondary"></i>}
                        defaultExpandIcon={<i className="fa-solid fa-circle-plus text-secondary"></i>}
                    >
                        {
                            categories.map((category) => {
                                console.log(categories)
                                return (
                                    <RenderTree
                                        category={category}
                                        type='category'
                                        handleClickAdd={handleClickAdd}
                                        handleClickEdit={handleClickEdit}
                                        handleClickDelete={handleClickDelete}
                                    />
                                )
                            })
                        }
                    </TreeView>
                </Box>
            </div>
        </>
    );
}