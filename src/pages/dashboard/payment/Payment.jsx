import React, { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Loader from '../../../components/Loader';


const Payment = () => {

    const [paymentData, setPaymentData] = useState(null)
    const [loading, setloading] = useState(true)
    const [reRender, setReRender] = useState(false)

    

    const fetchAllPaymentData = async () => {

        const allPaymentCollectionRef = collection(db, `payment`);
        const allPaymentSnap = await getDocs(allPaymentCollectionRef);

        const allPayments = allPaymentSnap.docs.map((doc) => ({
            id : doc.id,
            ...doc.data()
        }))

        setPaymentData(allPayments)
        setloading(false)


    }

    const handleDelete = async (id) => {

         const paymentDeleteRef = doc(db, "payment", id)
            await deleteDoc(paymentDeleteRef)

            setReRender(!reRender)
    }

    

    useEffect(() => {

        fetchAllPaymentData()

    },[reRender])
    




  return (
    <>

    {
        loading ? (
            <div className='w-full h-96'>
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
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {paymentData && paymentData.map((payment) => (
          <tr key={payment.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900"> {payment.roomsDetail.name} </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500"> {`${payment.firstName} ${payment.lastName}`} </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500"> {payment.email} </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900"> {payment.phone} </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">Rs {payment.roomsDetail.price}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${payment.paid === 'paid' ? 'bg-green-100 text-green-800' : 
                payment.paid === 'un-paid' ? 'bg-red-100 text-red-800' : 
                'bg-red-100 text-red-800'}`}>
              paid
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex space-x-3">
              
              <button onClick={() => { handleDelete(payment.id) }} className="text-red-600 hover:text-red-900">
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
  )
}

export default Payment