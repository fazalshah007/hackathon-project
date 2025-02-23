import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Loader from '../../../components/Loader';

function AllRooms() {

    const [searchTerm, setSearchTerm] = useState('');
    const [product, setProducts] = useState(null);
    const [loading, setLoading] = useState(true)


    const fetchAllRooms = async () => {
        

        const allRoomsCollectionRef = collection(db,"rooms")
        const allRoomsSnap = await getDocs(allRoomsCollectionRef)
        
        const allRoomData = allRoomsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        setProducts(allRoomData)
        
        setLoading(false)
        

    }


    useEffect(() => {
        fetchAllRooms()
    },[])

  


  return (
  <>
  {
    loading ? (
        <div className='h-screen'>
            <Loader />
        
        </div>
    ) : (
        <div>
        <div className="h-full bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
               
                <h1 className="text-2xl font-bold text-gray-800">Products Dashboard</h1>
              </div>
              <div className="relative">
                <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
    
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {product && product.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="h-10 w-10 rounded-full object-cover mr-3 border border-gray-200"
                            />
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.capacity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Rs {product.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.rating} Stars</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.stock > 50 ? 'bg-green-100 text-green-800' : 
                            product.stock > 20 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {product.roomStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
  }

  </>
  );
}

export default AllRooms;