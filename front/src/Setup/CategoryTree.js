import React from 'react';
import Box from '@mui/material/Box';
import { useSpring, animated } from '@react-spring/web';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { MinusCircleIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Collapse } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Card, IconButton } from '@material-tailwind/react';
import YDivider from '../ComponentUtils/YDivider';
import AddButton from './Components/AddButton';


function TransitionComponent(props) {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

const CustomTreeItem = React.forwardRef((props, ref) => {
    const { label, nodeId, children, ...other } = props;

    return (
        <TreeItem nodeId={nodeId} label={(
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div>{label}</div>
                <div className='flex'>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Add clicked for', label);
                        }}
                        size="small"
                        className='ml-2 text-primary underline'
                    >
                        Add
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Edit clicked for', label);
                        }}
                        size="small"
                        className='ml-2 text-secondary underline'
                    >
                        Edit
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Delete clicked for', label);
                        }}
                        size="small"
                        className='ml-2 text-tertiary underline'
                    >
                        Delete
                    </div>
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

export default function CategoryTree() {
    return (
        <div className='flex flex-col items-center'>
            <Card className='bg-secondary w-full text-white flex justify-center items-center p-3 text-[1.5rem]'>
                <h1>Set Up Categories</h1>
            </Card>
            <Box className='w-full my-2'>
                <div className='flex justify-between'>
                    <h1 className='text-[1.5rem]'>Categories</h1>
                    <AddButton />
                </div>
                <YDivider />
                <TreeView
                    aria-label="file system navigator"
                    defaultEndIcon={<XMarkIcon className='text-secondary' />}
                    defaultCollapseIcon={<MinusCircleIcon className='text-secondary' />}
                    defaultExpandIcon={<PlusCircleIcon className='text-secondary' />}
                >
                    <StyledTreeItem nodeId="1" label="Wholesaling">
                        <StyledTreeItem nodeId="2" label="Property 1" />
                        <StyledTreeItem nodeId="2-3" label="Property 2" />
                    </StyledTreeItem>
                    <StyledTreeItem nodeId="5" label="Fix & Flip">
                        <StyledTreeItem nodeId="10" label="Property Group 1" />
                        <StyledTreeItem nodeId="6" label="Property Group 2">
                            <StyledTreeItem nodeId="8" label="Property 1" />
                            <StyledTreeItem nodeId="9" label="Property 2" />
                        </StyledTreeItem>
                    </StyledTreeItem>
                </TreeView>
            </Box>
        </div>
    );
}