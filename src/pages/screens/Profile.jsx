import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import Loader from '../../components/Loader';



const Profile = () => {

  const navigate = useNavigate()

 const userId =  localStorage.getItem("authUserIdWithFirebase")

 const [rows, setRows] = useState([])
 const [loading, setLoading] = useState(true)
 let roomList = []

 const fetchInventoryData = async () => {

  // new 
  const roomCollectionRef = collection(db,`inventory/${userId}/bookRoom`)
        const snapShot = await getDocs(roomCollectionRef)
        snapShot.forEach((doc)=>{
          roomList.push({id: doc.id, ...doc.data()})          
        })

        setRows(roomList)
        setLoading(false)
        
   
  }

  const handleSignIn = () => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    fetchInventoryData()
  },[])


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Room name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'roomStatus',
      headerName: 'Status',
      type: 'number',
      width: 90,
    },
    {
      field: 'capacity',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.capacity || ''}`,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };


  return (
    <>
       <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div onClick={() => { navigate(`/home`) } } className="flex items-center justify-between hover:cursor-pointer">
          <BedOutlinedIcon className="h-8 w-8 text-blue-600" />
          <h1 className="ml-2 text-2xl font-bold text-gray-900">Room Booking</h1>
        </div>
        <div className='flex items-center'>
        <button onClick={handleSignIn} className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center'>Sign Out</button>
        <span onClick={() => { navigate("/home/profile") }} className='px-2 py-2 border-2 border-black rounded-full ml-2 hover:cursor-pointer'>
        <PersonOutlineIcon />
        </span>
        </div>
          
      </div>
    </header>

   {
    loading ? (
      <div className='h-screen'>
        <Loader />
      </div>
    ) : (
      <div className='w-4xl mt-8 mx-auto'>
   <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
   </div>
    )
   }
    </>
  )
}

export default Profile