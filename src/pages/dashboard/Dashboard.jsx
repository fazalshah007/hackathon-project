import React, { useState } from 'react'
import Loader from '../../components/Loader'

import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { Collapse } from "@mui/material";
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'

const Dashboard = ({ setUserID }) => {

  const navigate = useNavigate()

  const location = useLocation()

  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // menu options states here 
  const [users, setUsers] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [payment, setPayment] = useState(false);


  const signOut = () => {
    localStorage.clear()
    setUserID(null)
  }

  return (
    <>
     {
     isLoading ? (<Loader />) : (
      <>
      
      <div className="flex h-screen no-scrollbar">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white p-4 transition-all duration-300  ${
          isSidebarOpen ? "w-48 md:w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="mb-8 text-white"
        >
          <MenuIcon />
        </button>

        <div className=''>
          
          {/* menu collapesible here  */}

        <div className="cursor-pointer mt-4" onClick={() => setUsers(!users)}>
          <div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
            <div>
            <PersonOutlinedIcon className='mr-2' />
            {isSidebarOpen && <span>Users</span>}
            </div>
            {isSidebarOpen && (users ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />)}
          </div>
        </div>
       

        <Collapse in={users}>
          <div className="pl-4">
            <Link className="p-2 hover:bg-gray-700 rounded block" to={`/admin/users`}>User List</Link> 
          </div>
        </Collapse>

          {/* menu collapesible here  */}
          
          
          {/* menu collapesible here  */}

        <div className="cursor-pointer mt-4" onClick={() => setRooms(!rooms)}>
          <div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
            <div>
            <BedOutlinedIcon className='mr-2' />
            {isSidebarOpen && <span>Rooms</span>}
            </div>
            {isSidebarOpen && (rooms ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />)}
          </div>
        </div>
       

        <Collapse in={rooms}>
          <div className="pl-4">
          <Link className="p-2 hover:bg-gray-700 rounded block" to={`/admin/rooms`}>Create Room</Link> 
          <Link className="p-2 hover:bg-gray-700 rounded block" to={`/admin/allrooms`}>All Rooms</Link> 
       
          </div>
        </Collapse>

          {/* menu collapesible here  */}
          
          
          {/* menu collapesible here  */}

        <div className="cursor-pointer mt-4" onClick={() => setInventory(!inventory)}>
          <div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
            <div>
            <BedOutlinedIcon className='mr-2' />
            {isSidebarOpen && <span>Inventory</span>}
            </div>
            {isSidebarOpen && (inventory ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />)}
          </div>
        </div>
       

        <Collapse in={inventory}>
          <div className="pl-4">
          <Link className="p-2 hover:bg-gray-700 rounded block" to={`/admin/inventory`}>All Inventories</Link> 
          {/* <Link className="p-2 hover:bg-gray-700 rounded block" to={`/admin/allrooms`}>All Rooms</Link>  */}
       
          </div>
        </Collapse>

          {/* menu collapesible here  */}
          
          
          
          {/* menu collapesible here  */}

        <div className="cursor-pointer mt-4" onClick={() => setPayment(!payment)}>
          <div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
            <div>
            <BedOutlinedIcon className='mr-2' />
            {isSidebarOpen && <span>Payment</span>}
            </div>
            {isSidebarOpen && (payment ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />)}
          </div>
        </div>
       

        <Collapse in={payment}>
          <div className="pl-4">
          <Link className="p-2 hover:bg-gray-700 rounded block" to={`/admin/payment`}>Payment View</Link> 
       
          </div>
        </Collapse>

          {/* menu collapesible here  */}
          
        </div>
       
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col no-scrollbar">
        {/* Navbar */}
        <div className="bg-gray-800 text-white shadow p-4 flex justify-between">
          <h1 onClick={() => { navigate("/admin") }} className="text-lg font-bold hover:text-gray-400">Dashboard</h1>
          <div>
            <button className='cursor-pointer ' onClick={signOut} ><ExitToAppIcon /></button>
          </div>
        </div>

        {/* Core Content */}
        <div className="p-4 grid place-items-center h-[85%]">
     
          <div className='h-full w-full overflow-y-scroll no-scrollbar'>

            {
              location.pathname === "/admin" ? (

                // dashboard admin home page code here ...
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div className='bg-green-300'>hello</div>
                  <div className='bg-green-300'>hello</div>
                  <div className='bg-green-300'>hello</div>
                  
                </div>
                // <Loader />

              ) : (

                // nested routing all component will be rendered here ...
                
                <div className=''>
                  <Outlet />
                </div>
              )
            }
 
         

          </div>
        </div>
      </div>
    </div>
      
      </>
     )
    }
    </>
  )
}

export default Dashboard