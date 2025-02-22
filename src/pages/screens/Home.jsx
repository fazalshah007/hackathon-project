import React, { useEffect, useState } from 'react';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/slices/asyncTaskSlice'
import axios from 'axios';

function App() {


  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rooms, setRooms] = useState(null);


  const fetchDataFromApi = async () => {  

  const response = await axios.get("http://localhost:3000/rooms") 

  setRooms(response.data)
  

  }

  useEffect(() => {
    fetchDataFromApi()
  },[])

  const navigate = useNavigate()


  const handleSignIn = () => {
    navigate('/login', { replace: true })
  }


  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920',
      title: 'Luxury Accommodations',
      description: 'Experience unparalleled comfort in our premium suites'
    },
    {
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920',
      title: 'Stunning Ocean Views',
      description: 'Wake up to breathtaking panoramic ocean vistas'
    },
    {
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920',
      title: 'World-Class Amenities',
      description: 'Indulge in our premium facilities and services'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center justify-between">
            <BedOutlinedIcon className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Room Booking</h1>
          </div>
          <button onClick={handleSignIn} className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center mt-6'>Sign In</button>
            
        </div>
      </header>

       {/* Carousel Section */}
       <div className="relative h-[600px] overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-30 transition-colors"
        >
          <ChevronLeftOutlinedIcon className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-30 transition-colors"
        >
          <ChevronRightOutlinedIcon className="h-6 w-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>


      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Check-in</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="date"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalendarMonthOutlinedIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Check-out</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="date"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalendarMonthOutlinedIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Guests</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  min="1"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <PeopleOutlineOutlinedIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center mt-6">
              <SearchOutlinedIcon className="h-5 w-5 mr-2" />
              Search Rooms
            </button>
          </div>
        </div>
      </div>

      {/* Room Listings */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms && rooms.map((room, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                  <div className="flex items-center">
                    <StarBorderPurple500OutlinedIcon className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{room.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PeopleOutlineOutlinedIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-1 text-sm text-gray-600">Up to {room.capacity} guests</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">${room.price}</span>
                    <span className="text-gray-600">/night</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;