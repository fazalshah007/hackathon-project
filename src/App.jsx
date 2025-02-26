import { Navigate, Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import Home from "./pages/screens/Home"
import Signup from "./pages/SignUp"
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/dashboard/users/Users";
import Customer from "./pages/screens/Customer";
import BookRoom from "./pages/screens/BookRoom";
import Rooms from "./pages/dashboard/rooms/Rooms";
import Profile from "./pages/screens/Profile";
import AllRooms from "./pages/dashboard/rooms/AllRooms";
import Inventory from "./pages/dashboard/inventory/Inventory";
import Payment from "./pages/dashboard/payment/Payment";

function App() {



  const [userID, setUserID] = useState(localStorage.getItem("authUserIdWithFirebase"));
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('signInUserData')))

  useEffect(() => {
    
    const handleStorageChange = () => {
      const newUserID = localStorage.getItem("authUserIdWithFirebase");
      const newUserData = JSON.parse(localStorage.getItem("signInUserData"))

      if(newUserID !== userID){
        setUserID(newUserID);
      }

      if (JSON.stringify(newUserData) !== JSON.stringify(userData)) {
        setUserData(newUserData);
      }

    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userID, userData?.role]);

  return (
    <>

      <Routes>

        {/* user routes */}
        <Route exac path="/" element={userID && userData?.role === "user" ? (<Customer />) : (<Home /> )} />
        <Route path="/home" element={userID && userData?.role === "user" ? (<Customer />) : (<Navigate to='/login' replace />)} >
            <Route path="profile/" element={<Profile />} />
        </Route>
        <Route path="/customer/:id" element={userID && userData?.role === "user" ? (<BookRoom />) : (<Navigate to='/login' replace />)} />

        {/* admin routes  */}
        <Route path="/admin" element={userID && userData?.role === "admin" ? (<Dashboard setUserID={setUserID} />) : (<Navigate to='/login' replace />)} >
          <Route path="users" element={ <Users /> } />
          <Route path="rooms" element={ <Rooms /> } />
          <Route path="allrooms" element={ <AllRooms /> } />
          <Route path="inventory" element={ <Inventory /> } />
          <Route path="payment" element={ <Payment /> } />
        </Route>

        <Route path="/login" element={userID && userData?.role === "user" ? (<Navigate to='/home' replace />) : userID && userData?.role === "admin" ? (<Navigate to='/admin' replace />) : (<SignIn setUserID={setUserID} setUserData={setUserData} />) } />

     
        <Route path="/signup" element={userID && userData?.role === "user" ? (<Navigate to='/home' replace />) : userID && userData?.role === "admin" ? (<Navigate to='/admin' replace />) : (<Signup />)} />



        {/* Default Redirect */}
        <Route path="*" element={<h1>page Not Found</h1>} />
      </Routes>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
