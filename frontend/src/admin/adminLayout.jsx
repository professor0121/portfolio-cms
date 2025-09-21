import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const adminLayout = () => {
    return (
        <div className='w-full min-h-screen flex'>
            <Sidebar />
            <div className='flex-1 overflow-y-auto bg-[#212121] text-[#fff]'>
                <Outlet />
            </div>
        </div>
    )
}

export default adminLayout