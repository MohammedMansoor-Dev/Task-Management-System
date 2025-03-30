import React from 'react'
import SidebarAdmin from './SidebarAdmin'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'

const AdminHome = () => {
    return (
        <div className='flex bg-[#111828]'>
            <div className='w-[20vw]'>
                <SidebarAdmin />
            </div>
            <div className='w-[80vw]'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminHome
