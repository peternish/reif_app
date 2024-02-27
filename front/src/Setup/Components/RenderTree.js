import React, { useEffect, useState } from 'react';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { alpha, styled } from '@mui/material/styles';

const CustomTreeItem = React.forwardRef((props, ref) => {
    const { label, nodeId, children, ...other } = props;

    return (
        <TreeItem nodeId={nodeId} label={(
            <div className='flex items-center justify-between w-full py-1 border-b-2 border-gray-300'>
                <div>{label}</div>
                <div className='flex items-center'>
                    <i
                        className="fa-regular fa-square-plus text-primary text-xl ml-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Add clicked for', label);
                            props.handleClickAdd(nodeId)
                        }}
                    />
                    <i
                        className='fa-regular fa-edit text-secondary text-xl ml-4'
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Edit clicked for', label);
                            props.handleClickEdit(nodeId, label)
                        }}
                    />
                    <i class="fa-regular fa-trash-can text-tertiary text-xl ml-4"
                        className='fa-regular fa-trash-can text-tertiary text-xl ml-4'
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Delete clicked for', label);
                            props.handleClickDelete(nodeId)
                        }}
                    />
                    {/* <div
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Delete clicked for', label);
                        }}
                        size="small"
                        className='ml-2 text-tertiary underline'
                    >
                        Delete
                    </div> */}
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
    handleClickAdd,
    handleClickEdit,
    handleClickDelete
}) {
    if (!category) return null; // Add a check for category existence

    const data = category.data ? JSON.parse(category.data) : category;

    return (
        <StyledTreeItem
            key={data.id ? data.id : category.id}
            nodeId={data.id ? `${data.id}` : `${category.id}`}
            label={data.name ? data.name : category.name}
            handleClickAdd={handleClickAdd}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
        >
            {data.children && data.children.length > 0 && data.children.map((node) => (
                <RenderTree
                    key={node.id}
                    category={node}
                    handleClickAdd={handleClickAdd}
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                />
            ))}
        </StyledTreeItem>
    );
}
