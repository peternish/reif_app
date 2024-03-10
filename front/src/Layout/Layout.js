import React, { useEffect } from 'react';
import Header from '../Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import SideMenu from '../SideMenu/SideMenu';

export default function Layout() {
    const navigate = useNavigate()
    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        if (!authToken) {
            navigate('/login')
        }
    }, [])
    return (
        <>
            <Header />
            <div className="grid grid-cols-12 bg-gray-100 items-baseline h-[calc(100vh-4rem)]">
                <div className="h-full col-span-2 sticky top-0 hidden md:block">
                    <SideMenu />
                </div>
                <div className='col-span-12 max-h-full md:col-span-10 p-6 h-full overflow-x-auto'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}