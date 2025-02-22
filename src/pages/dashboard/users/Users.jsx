import React, { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import Loader from '../../../components/Loader';



const Products = () => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([])

const fetchDataFromUsers = async () => {


const usersSnap = await getDocs(collection(db, "user"));
const adminSnap = await getDocs(collection(db, "admin"));

const userData = usersSnap.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

const adminData = adminSnap.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

const mergeData = [...userData, ...adminData]

setUser(mergeData)
setLoading(false)


}

useEffect(() => {

  fetchDataFromUsers()

},[])


  return (
<>
    {
      loading ? (<Loader />) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto hidden sm:table">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Age</th>
            </tr>
          </thead>
          <tbody>
            {user.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.email}</td>
                <td className="px-4 py-2">{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Card-style table for small screens */}
        <div className="sm:hidden">
          {user.map((row, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
            >
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-blue-600">ID: {row.id}</div>
                <div className="text-sm text-gray-700">Name: {row.email}</div>
                <div className="text-sm text-gray-700">Age: {row.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )
    }
</>
   
    )
}

export default Products