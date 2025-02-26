import { collection, getCountFromServer, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig'
import Loader from "../../components/Loader"

const States = () => {

    const [loading, setLoading] = useState(true)

    const [users, setUsers] = useState(0)
    const [rooms, setRooms] = useState(0)
    const [inventories, setInventories] = useState(0)
    const [payments, setPayments] = useState(0)

    const feltchAllDatas = async () => {

        // user counts 
        const userColl = collection(db, "user");
        const userSnapshot = await getCountFromServer(userColl);
        


        // rooms count 
        const roomsColl = collection(db, "rooms");
        const roomSnapshot = await getCountFromServer(roomsColl);
        


        // inventroies count 
        let counts = [];
        const inventoriesColl = collection(db, "inventory")
        const inventoriesDocData = await getDocs(inventoriesColl)
        const inventoryDoc = inventoriesDocData.docs.map((doc) => ({
            id: doc.id
        }))
        for (const user of inventoryDoc) {
            const allRoomInventoryCollectionRef = collection(db, `inventory/${user.id}/bookRoom`);
            const allRoomInventoryData = await getDocs(allRoomInventoryCollectionRef);
            counts.push({
                subCollectionCount: allRoomInventoryData.size
            });
        }
        let totalCount = counts.reduce((sum, item) => sum + item.subCollectionCount, 0);
       


        // payment count 
        const paymentColl = collection(db, "payment")
        const paymentSnap = await getCountFromServer(paymentColl)
        


        // all state updates 
        setUsers(userSnapshot.data().count)
        setRooms(roomSnapshot.data().count)
        setInventories(totalCount)
        setPayments(paymentSnap.data().count)
        setLoading(false)
    }

    useEffect(() => {
        feltchAllDatas()
    }, [])

    return (
        <>
        {
            loading ? (
                <div className='w-full h-60 text-center'>
                    <Loader />
                    <h1 className='text-2xl'>Please Wait Few Minutes...</h1>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                <div className='w-full h-60 rounded-2xl bg-amber-200 flex flex-col justify-center items-center'>
                    <h1 className='text-xl md:text-2xl font-bold uppercase'>All Users</h1>
                    <h1 className='text-4xl md:text-8xl mt-4'>{users && users}</h1>
                </div>

                <div className='w-full h-60 rounded-2xl bg-purple-300 flex flex-col justify-center items-center'>
                    <h1 className='text-xl md:text-2xl font-bold uppercase'>All Rooms</h1>
                    <h1 className='text-4xl md:text-8xl mt-4'>{rooms && rooms}</h1>
                </div>

                <div className='w-full h-60 rounded-2xl bg-green-300 flex flex-col justify-center items-center'>
                    <h1 className='text-xl md:text-2xl font-bold uppercase'>All Inventories</h1>
                    <h1 className='text-4xl md:text-8xl mt-4'>{inventories && inventories}</h1>
                </div>

                <div className='w-full h-60 rounded-2xl bg-sky-300 flex flex-col justify-center items-center'>
                    <h1 className='text-xl md:text-2xl font-bold uppercase'>All Payments</h1>
                    <h1 className='text-4xl md:text-8xl mt-4'>{payments && payments}</h1>
                </div>

                <div className='w-full h-60 rounded-2xl bg-pink-300 flex flex-col justify-center items-center'>
                    <h1 className='text-xl md:text-2xl font-bold uppercase'>All Services</h1>
                    <h1 className='text-4xl md:text-8xl mt-4'>16</h1>
                </div>

            </div>
            )
        }


        </>
    )
}

export default States