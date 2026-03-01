import { useState } from 'react'

import './App.css'
import Register from './pages/auth/Register'
import AuthLanding from './components/AuthLanding'
import CreateOffice from './components/Createoffice'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Login from './pages/auth/Login'
import BrowseOffices from './pages/company/BrowseOffices'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import CompanyDashboard from './pages/company/CompanyDashboard'
import { ToastContainer, toast } from 'react-toastify';
import BuildingDashboad from './pages/owner/BuildingDashboad'
import AddBuilding from './pages/owner/AddBuilding'
import Buildings from './pages/owner/Buildings'
import AddOffice from './pages/owner/AddOffice'
import Offices from './pages/owner/Offices'
import BookOffice from './pages/company/BookOffice'
import MyBookings from './pages/company/MyBookings'
import MyProfile from './pages/company/MyProfile'
import GetBookings from './pages/owner/GetBookings'


function App() {
 

  return (
    <div>
      <ToastContainer/>
      <BrowserRouter>
      <AuthProvider>
      <Routes>

            <Route path='/' element={<AuthLanding/>}/>
           <Route path="/register" element= {<Register/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/mybookings" element={<MyBookings/>}/>
           
           <Route path='/company/browseoffices' element={<BrowseOffices/>}/>
          {/* <Route path="/dashboard" element={<ProtectedRoute> <Companydashboard/></ProtectedRoute>}/> */}
          <Route path='/company/dashboard' element={ <ProtectedRoute role="company"><CompanyDashboard/></ProtectedRoute>}/>
          <Route path='/company/dashboard/:officeid/bookoffice' element={ <ProtectedRoute role="company"><BookOffice/></ProtectedRoute>}/>
           <Route path='/myprofile' element={ <ProtectedRoute role={"company"}><MyProfile/> </ProtectedRoute> }/>


          <Route path='/admin/dashboard' element={ <ProtectedRoute role="admin"><BuildingDashboad/></ProtectedRoute>}/>
          <Route path='/admin/addBuilding' element={ <ProtectedRoute role="admin"><AddBuilding/></ProtectedRoute>}/>
          <Route path='/admin/mybuildings' element={ <ProtectedRoute role="admin"><Buildings/></ProtectedRoute>}/>
          <Route path='/admin/mybuildings/:buildingId/addoffice' element={ <ProtectedRoute role="admin"><AddOffice/></ProtectedRoute>}/>
          <Route path='/admin/offices' element={ <ProtectedRoute role="admin"><Offices/></ProtectedRoute>}/>
          <Route path='/admin/getbookings' element={ <ProtectedRoute role="admin"><GetBookings/></ProtectedRoute>}/>
                     
          

 
        </Routes>

      </AuthProvider>
       
      </BrowserRouter>
      
    </div>
   
  )
}

export default App
