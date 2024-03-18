import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { MinusCircleIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Card } from '@material-tailwind/react';
import YDivider from '../ComponentUtils/YDivider';
import AddButton from './Components/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import AddExpenseModal from './Components/AddExpenseModal';
import Axios from '../helper/axiosApi';
import useErrorHandler from '../helper/handleError';
import RenderTree from './Components/RenderTree';
import ConfirmModal from './Components/ConfirmModal';

export default function ExpenseTree() {

    const handleError = useErrorHandler()

    const categoryNodeId = useSelector(state => state.status.categoryNodeId)
    const categoryNodeLabel = useSelector(state => state.status.categoryNodeLabel)
    const [type, setType] = useState('')
    const [modalType, setModalType] = useState('')
    const [expenseNodeId, setExpenseNodeId] = useState('0')
    const [expenseNodeLabel, setExpenseNodeLabel] = useState('')
    const [showExpenseModal, setShowExpenseModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [expenseData, setExpenseData] = useState([])
    const [incomeData, setIncomeData] = useState([])

    const [pageUpdate, setPageUpdate] = useState(false)

    const handlePageUpdate = () => {
        setPageUpdate(!pageUpdate)
    }

    const handleExpenseClick = () => {
        setType('Expense')
        setModalType('Add')
        setShowExpenseModal(true)
    }

    const handleIncomeClick = () => {
        setType('Income')
        setModalType('Add')
        setShowExpenseModal(true)
    }

    const handleClickAdd = (nodeId, type) => {
        setExpenseNodeId(nodeId)
        setType(type)
        setModalType('Add')
        setShowExpenseModal(true)
    }

    const handleClickEdit = (nodeId, type, nodeLabel) => {
        setExpenseNodeId(nodeId)
        setExpenseNodeLabel(nodeLabel)
        setType(type)
        setModalType('Edit')
        setShowExpenseModal(true)
    }

    const handleClickDelete = (nodeId) => {
        setExpenseNodeId(nodeId)
        setShowConfirmModal(true)
    }

    const fetchExpenses = async () => {
        try {
            const res = await Axios().get(`/api/expenseCategory/?businessCategoryId=${categoryNodeId}`)
            setExpenseData(res.data.expense)
            setIncomeData(res.data.income)
        } catch (err) {
            handleError(err)
        }
    }

    useEffect(() => {
        fetchExpenses()
    }, [pageUpdate, categoryNodeId])

    return (
        <>
            {
                showExpenseModal &&
                <AddExpenseModal
                    showModal={showExpenseModal}
                    setShowModal={setShowExpenseModal}
                    handlePageUpdate={handlePageUpdate}
                    categoryNodeId={categoryNodeId}
                    expenseNodeId={expenseNodeId}
                    expenseNodeLabel={expenseNodeLabel}
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
                    nodeId={expenseNodeId}
                    type='expense'
                />
            }
            <div className='flex flex-col items-center'>
                <Card className='bg-secondary w-full text-white flex justify-center items-center p-3 text-[1.5rem]'>
                    <h1>Ex/In: {categoryNodeLabel}</h1>
                </Card>
                <div className='flex flex-col w-full gap-4'>
                    <Box className='w-full my-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-[1.5rem]'>Expenses</h1>
                            <AddButton
                                onClick={() => handleExpenseClick()}
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
                                expenseData.map((expense) => {
                                    return (
                                        <RenderTree
                                            category={expense}
                                            type='expense'
                                            handleClickAdd={handleClickAdd}
                                            handleClickEdit={handleClickEdit}
                                            handleClickDelete={handleClickDelete}
                                        />
                                    )
                                })
                            }
                        </TreeView>
                    </Box>
                    <Box className='w-full my-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-[1.5rem]'>Income</h1>
                            <AddButton
                                onClick={() => handleIncomeClick()}
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
                                incomeData.map((income) => {
                                    return (
                                        <RenderTree
                                            category={income}
                                            type='income'
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
            </div>
        </>
    );
}