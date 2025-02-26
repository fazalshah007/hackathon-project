import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import Loader from '../../../components/Loader';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';



const Products = () => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([])
  const [rows, setRows] = useState([])

const fetchDataFromUsers = async () => {


const usersSnap = await getDocs(collection(db, "user"));
const adminSnap = await getDocs(collection(db, "admin"));

const userData = usersSnap.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

const adminData = adminSnap.docs.map((doc) => ({
  id: doc.id+"admin",
  ...doc.data(),
}));

const mergeData = [...userData, ...adminData]

setRows(mergeData)

setLoading(false)


}

useEffect(() => {

  fetchDataFromUsers()

},[])


const columns = [
  { field: 'id', headerName: 'ID', width: 350 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'role', headerName: 'Role', width: 130 },
  
];

const paginationModel = { page: 0, pageSize: 5 }


  return (
<>
    {
      loading ? (<Loader />) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">

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
      </div>
      )
    }
</>
   
    )
}

export default Products