
import React, { useEffect, useState } from 'react';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

import Loader from '../../../components/Loader'



function Inventory() {


  const [usersInventory, setUsersInventory] = useState([]);
  const [loading, setLoading] = useState(true);


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
  

  

useEffect(() => {

    fetchAllRoomInventory()

},[])



  return (
<>
{
  loading ? (
    <div className='h-screen'>
      <Loader />
    </div>
  ) : (
    <div className=" bg-gray-50 overflow-y-scroll">


    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <FilterAltIcon className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <KeyboardArrowUpIcon className="h-4 w-4 mr-2" />
            Sort
          </button>
        </div>
      </div>

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
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <EditIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <DeleteOutlineIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
          <span className="font-medium">5</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
  )
}
</>
   
  );
}

export default Inventory;