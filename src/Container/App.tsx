import React, { useEffect, useState } from 'react';
import { HeaderComponent, Footer } from '../Components/Layout';
import { TournamentMeetTeam, TournamentMeet, TeamPlayer, Info, Teams, Players, Countries, Tournament, GameItems, Home, Login,  NotFound, Register } from '../Pages';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { userModel } from '../Interfaces';
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { jwtDecode } from "jwt-decode";
import '../dark-theme.css';
import News from '../Components/Page/News/News';
//import 'antd/dist/antd.css';

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData = useSelector((state: RootState) => state.userAuthStore);

 /* const [isDarkTheme, setIsDarkTheme] = useState(false);

 /* const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.body.classList.toggle('dark-theme');
  };*/

  
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { name, id, email, role, phoneNumber }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ name, id, email, role, phoneNumber }));
    }
  }, []);

  return (
    
    <div>
      <HeaderComponent />  
          <> 
          <Routes>
            <Route path='/' element={<Home />}> </Route>
            <Route path='/gameItems' element ={<GameItems/>}> </Route>
            <Route path='/tournament' element ={<Tournament/>}> </Route>
            <Route path='/countries' element ={<Countries/>}> </Route>
            <Route path='/players' element ={<Players/>}> </Route>
            <Route path='/teams' element ={<Teams/>}> </Route>
            <Route path='/teamplayer' element ={<TeamPlayer/>}> </Route>
            <Route path='/info' element ={<Info/>}> </Route>
            <Route path='/TournamentMeet' element ={<TournamentMeet/>}> </Route>
            <Route path='/TournamentMeetTeam' element ={<TournamentMeetTeam/>}> </Route>

    


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
<button onClick={toggleTheme}>Toggle Theme</button>
<Route path='/forecastItemDetails/:forecastItemId' element={<ForecastItemDetails />}> </Route>
*/