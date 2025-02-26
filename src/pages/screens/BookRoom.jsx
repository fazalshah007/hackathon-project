import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader'
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';



const BookRoom = () => {

    const { id } = useParams(); 
    const navigate = useNavigate();

    const userId = localStorage.getItem("authUserIdWithFirebase");
    const { email } = JSON.parse(localStorage.getItem("signInUserData"))

    const [isOpenBox, setIsOpenBox] = useState(false)
    
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [paid, setPaid] = useState('');
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


    const handleDialogBox =() => {
      setIsOpenBox(true)
    }

    const  HandleFormData = () => {

      if(!firstName || !lastName || !phone){
        toast('All feilds are required.', {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
        return;

      }
      
      const paymentRef = collection(db,"payment")
      addDoc(paymentRef,{
        firstName,
        lastName,
        email:email && email,
        phone,
        paid,
        payment: room.price,
        roomsDetail : {
          ...room
        }
      }).then(() => {

        handleBooking()

      })

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
      {
  isOpenBox ? (
    <div className='transparent-black absolute top-0 left-0 w-full h-screen z-40 grid place-items-center'>
  <div className='w-2xl bg-white rounded-2xl opacity-100'>

    <div className='flex justify-between p-4'>
    <h1 className='text-2xl font-bold uppercase'>Confirm Room</h1>
    <span onClick={() => { setIsOpenBox(false) }} className='bg-black text-white rounded-full p-2' ><CloseIcon  /></span>
    </div>
    <div className='grid grid-cols-4 gap-5 p-8'>

    <TextField className='col-span-2' value={firstName} onChange={e => setFirstName(e.target.value)} label="First Name" variant="outlined" />
    <TextField className='col-span-2' value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name" variant="outlined" />
    <TextField className='col-span-3' value={email} label="Email" variant="outlined" disabled />
    <TextField className='col-span-1' value={`Rs ${room.price}`}  label="Payment" variant="outlined" disabled/>
    <TextField className='col-span-2' value={phone} onChange={e => setPhone(e.target.value)} label="Phone No" variant="outlined"  />

      <FormControl className='col-span-2' fullWidth>
  <InputLabel id="demo-simple-select-label">Payment</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={paid}
    label="Age"
    onChange={e=>setPaid(e.target.value)}
  >
    <MenuItem value="paid">Pay Now</MenuItem>
    <MenuItem value="un-paid">Pay Later</MenuItem>
    
  </Select>
</FormControl>    
    <Button onClick={HandleFormData} variant='contained'>Book Now</Button>


    </div>
   
   
  </div>

</div>
  ) : ('')
}
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

      <div className="w-full flex justify-center items-center  mx-auto mt-16 bg-white rounded-lg shadow-lg p-8">
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
              onClick={handleDialogBox}
              className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Confirm Book
            </button>
          </div>
        </div>
      </div>
      </>
    );
}

export default BookRoom;
