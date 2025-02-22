import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookRoom = () => {
    const { id } = useParams(); // Get room id from URL
    
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);

    const fetchDataRoom = async () => {
        const response = await axios.get(`http://localhost:3000/rooms/${id}`)
        setRoom(response.data)
    }
  
    useEffect(() => {
    fetchDataRoom()
    }, [id]);
  
    const handleBooking = () => {
      // Handle the booking logic (e.g. navigate to a booking form)
      alert('Room booked successfully!');
      navigate('/home');
    };
  
    if (!room) {
      return <div>Loading...</div>;
    }
  
    return (
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
    );
}

export default BookRoom;
