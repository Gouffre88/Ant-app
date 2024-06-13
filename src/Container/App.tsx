import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../Components/Layout';
import {  Home, Login, NotFound, Register } from '../Pages';
import { Router, Route, Routes, BrowserRouter, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { userModel } from '../Interfaces';
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import jwt_decode, { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData = useSelector((state: RootState) => state.userAuthStore);

  
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  return (
    
    <div>
      <Header />  
          <> 
          <Routes>
            <Route path='/' element={<Home />}> </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/logout' element = {<Home/>}> </Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Routes>  
          </>
      <Footer />
    </div>

  );
}

export default App;

/*
<Route path='/forecastItemDetails/:forecastItemId' element={<ForecastItemDetails />}> </Route>
*/