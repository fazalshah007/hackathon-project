import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';

const Rooms = () => {


    const [roomName, setRoomName] = useState('');
    const [roomDisc, setRoomDisc] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [roomStatus, setRoomStatus] = useState('');
    const [capicity, setCapicity] = useState('');
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState(0);
   

    const handleSubmitData = async () => {

       await axios.post("http://localhost:3000/rooms",{
        name: roomName,
        description: roomDisc,
        price: price,
        image: imgURL,
        capacity: capicity,
        rating: rating
       })

    }



  return (
   <>
   <div className='w-full h-full flex justify-center items-center mt-10 '>

<div className='grid grid-cols-4 gap-8'>

    <TextField
        onChange={e => setRoomName(e.target.value)}
        className='col-span-2' id="outlined-basic" label="Room Name" variant="outlined" />
    <TextField
        onChange={e => setRoomDisc(e.target.value)}
        className='col-span-2' id="outlined-basic" label="Room Discription" variant="outlined" />

    <TextField
        onChange={e => setImgURL(e.target.value)}
        className='col-span-3' id="outlined-basic" label="Image URL" variant="outlined" />

    <FormControl className='col-span-1' variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={roomStatus}
            onChange={e => setRoomStatus(e.target.value)}
            label="roomStatus"
        >

            <MenuItem value='active'>active</MenuItem>
            <MenuItem value='occupied'>occupied</MenuItem>
       
        </Select>
    </FormControl>

 

    <TextField
        onChange={e => setCapicity(e.target.value)}
        className='col-span-1' id="outlined-basic" label="Capicity" variant="outlined" />
    <TextField
        onChange={e => setPrice(e.target.value)}
        className='col-span-1' id="outlined-basic" label="Price" variant="outlined" />


    <FormControl className='col-span-1' variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Rating</InputLabel>
        <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={rating}
            onChange={e => setRating(e.target.value)}
            label="Gender"
        >

            <MenuItem value={1}>1 stars</MenuItem>
            <MenuItem value={2}>2 stars</MenuItem>
            <MenuItem value={3}>3 stars</MenuItem>
            <MenuItem value={4}>4 stars</MenuItem>
            <MenuItem value={5}>5 stars</MenuItem>
        </Select>
    </FormControl>

  

    <Button onClick={handleSubmitData} className="col-span-4" variant="contained">Create Room</Button>

</div>

</div>
   </>
  );
}

export default Rooms;
