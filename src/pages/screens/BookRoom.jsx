import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


const BookRoom = () => {
    const { id } = useParams(); 

    const userId = localStorage.getItem("authUserIdWithFirebase");
    const { email } = JSON.parse(localStorage.getItem("signInUserData"))
    
    
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);


    const fetchDataRoom = async () => {
      
      const data = await getDoc(doc(db,"rooms", id))

      if (data.exists()) {

        setRoom(data.data())
        
      }
        
    }
  
    useEffect(() => {
    fetchDataRoom()
    }, [id]);

    const handleSignIn = () => {
      localStorage.clear()
      navigate(`/`)
    }
  
    const handleBooking = async () => {

      await setDoc(doc(db,"inventory",userId),{
        email,
        userId
      });

      await addDoc(collection(db, `inventory/${userId}/bookRoom`), {
        ...room
      });

     
      navigate('/home/profile');
    };
  
    if (!room) {
      return <div className='w-screen h-screen'>
        <Loader />
      </div>;
    }
  
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

      <div className="w-full flex justify-center items-center h-screen mx-auto mt-8 bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row">
          <img
            className="w-full md:w-1/2 h-72 object-cover rounded-md"
            src={room.image}
            alt={room.name}
          />
          <div className="md:ml-8 mt-4 md:mt-0 flex flex-col justify-between">
            <h2 className="text-3xl font-bold text-gray-900">{room.name}</h2>
            <p className="text-gray-700 mt-4">{room.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-xl font-semibold text-gray-900">${room.price} / night</div>
              <div className="text-sm text-gray-600">Max {room.capacity} Guests</div>
            </div>
            <button
              onClick={handleBooking}
              className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      </>
    );
}

export default BookRoom;
