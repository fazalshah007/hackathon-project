
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

import Loader from '../../../components/Loader'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';



function Inventory() {

  const [usersInventory, setUsersInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpenBox, setIsOpenBox] = useState(false)
  const [reservation, setReservation] = React.useState('');
  const [popupData, setPopupData] = useState(null)
  const [reRender, setReRender] = useState(false)


  const fetchAllRoomInventory = async () => {
    let finalData = [];
  
    try {
      const allRoomInventory = collection(db, `inventory`);
      const inventorySnap = await getDocs(allRoomInventory);
  
      const inventoryData = inventorySnap.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }));
  
      for (const user of inventoryData) {
        const allRoomInventoryCollectionRef = collection(db, `inventory/${user.userId}/bookRoom`);
        const allInventorySnap = await getDocs(allRoomInventoryCollectionRef);
  
        const completeRoomInventory = allInventorySnap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name, 
          email: user.email, 
          customerUserId:user.userId,
          price: doc.data().price,
          capacity: doc.data().capacity, 
          roomStatus: doc.data().roomStatus, 
          rating: doc.data().rating, 
        }));
  
       
        finalData.push(...completeRoomInventory);
      }
  
      setUsersInventory(finalData); 
     
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };



  const updateReservation = (data) => {
    setIsOpenBox(true)
    setPopupData(data)
    setReservation(data.roomStatus)

   
    
  }

  const saveDataForReservation = async () => {

     const updateRef = doc(db, "inventory",popupData.customerUserId, "bookRoom", popupData.id)
    await updateDoc(updateRef,{
      roomStatus: reservation
    })

    setIsOpenBox(false)
    setReRender(!reRender)


  }

  const deleteDataForReservation = async (inventoryData) => {
    

     const deleteRef = doc(db, "inventory",inventoryData.customerUserId, "bookRoom", inventoryData.id)
    await deleteDoc(deleteRef)

    setReRender(!reRender)


  }
  


useEffect(() => {

    fetchAllRoomInventory()

},[reRender])



  return (
<>
{
  isOpenBox ? (
    <div className='transparent-black absolute top-0 left-0 w-full h-screen z-40 grid place-items-center'>
  <div className='w-2xl h-96 bg-white rounded-2xl opacity-100'>

    <div className='flex justify-between p-4'>
    <h1 className='text-2xl font-bold uppercase'>Confirm Room</h1>
    <span onClick={() => { setIsOpenBox(false) }} className='bg-black text-white rounded-full p-2' ><CloseIcon  /></span>
    </div>
    <div className='grid grid-cols-2'>
      <h1 className='text-md mt-4 ml-8 font-bold uppercase'>Room Name</h1>   <h1 className='mt-4 text-md uppercase'>{popupData?.name}</h1>
      <h1 className='text-md mt-4 ml-8 font-bold uppercase'>email</h1> <h1 className='mt-4 text-md uppercase'>{popupData?.email}</h1>
      <h1 className='text-md mt-4 ml-8 font-bold uppercase'>Price</h1> <h1 className='mt-4 text-md uppercase'>Rs {popupData?.price}</h1>
      <h1 className='text-md mt-4 ml-8 font-bold uppercase'>Reservation</h1>
      <span>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Reserve</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={reservation}
          onChange={e=>setReservation(e.target.value)}
          label="Age"
        >
         
          <MenuItem value="occupied">Occupied</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          
        </Select>
      </FormControl>
      </span>
      <div className='mt-4 ml-8'>
      <Button onClick={saveDataForReservation} className=''  variant='contained'>Save</Button>
      </div>
      
    </div>
   
  </div>

</div>
  ) : ('')
}
{
  loading ? (
    <div className='h-screen'>
      <Loader />
    </div>
  ) : (
    <div className=" bg-gray-50 overflow-y-scroll no-scrollbar ">


    {/* Main Content */}
    <main className="min-w-7xl md:!min-w-full overflow-x-scroll no-scrollbar mx-auto px-4 py-6">


      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersInventory.map((inventoryData) => (
              <tr key={inventoryData.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{inventoryData.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{inventoryData.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{inventoryData.capacity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{inventoryData.rating} Stars</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Rs {inventoryData.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${inventoryData.roomStatus === 'active' ? 'bg-green-100 text-green-800' : 
                      inventoryData.roomStatus === 'occupied' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {inventoryData.roomStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => { updateReservation(inventoryData) }}  className="text-indigo-600 hover:text-indigo-900">
                      <EditIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => { deleteDataForReservation(inventoryData) }} className="text-red-600 hover:text-red-900">
                      <DeleteOutlineIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
    </main>
  </div>
  )
}
</>
   
  );
}

export default Inventory;