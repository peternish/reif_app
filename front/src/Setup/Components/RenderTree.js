import React, { useEffect, useState } from 'react';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { alpha, styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { setCategoryNodeId, setCategoryNodeLabel } from '../../store/StatusSlice';

const CustomTreeItem = React.forwardRef((props, ref) => {
    const dispatch = useDispatch()
    const { label, nodeId, children, type, ...other } = props;

    return (
        <TreeItem
            onClick={() => {
                if (type == 'category') {
                    dispatch(setCategoryNodeId(nodeId))
                    dispatch(setCategoryNodeLabel(label))
                }
            }}
            nodeId={nodeId}
            label={(
                <div className='flex items-center justify-between w-full py-1 border-b-2 border-gray-300'>
                    <div>{label}</div>
                    <div className='flex items-center'>
                        <i
                            className="fa-regular fa-square-plus text-primary text-xl ml-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Add clicked for', label);
                                if (type == 'category') {
                                    props.handleClickAdd(nodeId)
                                }
                                else {
                                    props.handleClickAdd(nodeId, type)
                                }
                            }}
                        />
                        <i
                            className='fa-regular fa-edit text-secondary text-xl ml-4'
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Edit clicked for', label);
                                if (type == 'category') {
                                    props.handleClickEdit(nodeId)
                                }
                            }}
                        />
                        <i class="fa-regular fa-trash-can text-tertiary text-xl ml-4"
                            className='fa-regular fa-trash-can text-tertiary text-xl ml-4'
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Delete clicked for', label);
                                if (type == 'category') {
                                    props.handleClickDelete(nodeId)
                                }
                            }}
                        />
                    </div>
                </div>
            )} ref={ref} {...other}>
            {children}
        </TreeItem>
    );
});

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        paddingTop: 5,
        paddingBottom: 5,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

export default function RenderTree({
    category,
    type,
    handleClickAdd,
    handleClickEdit,
    handleClickDelete
}) {
    let children
    if (typeof category.children == 'string') {
        children = JSON.parse(category.children);
    }
    else {
        children = category.children
    }
    if (!category) return null; // Add a check for category existence

    return (
        <StyledTreeItem
            key={category.id}
            nodeId={`${category.id}`}
            label={category.name}
            type={type}
            handleClickAdd={handleClickAdd}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
        >
            {children && children.length > 0 && children.map((node) => (
                <RenderTree
                    key={node.id}
                    category={node}
                    type={type}
                    handleClickAdd={handleClickAdd}
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                />
            ))}
        </StyledTreeItem>
    );
}
