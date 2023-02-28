import {ColorModeContext, useMode} from "./theme";
import {Button,CssBaseline,ThemeProvider} from "@mui/material";
import Topbar from './scenes/global/Topbar'
import Sidebar from './scenes/global/Sidebar'
import {Link,Navigate,Route,Router,Routes,useNavigate,useParams} from "react-router-dom";
import Index from "./scenes/Dashboard";
import {useEffect,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe,selectIsAuth} from "./redux/slices/auth";
import Login from "./scenes/login";
import Registration from "./scenes/registration";
import Profile from "./scenes/profile";
import Dashboard from "./scenes/Dashboard";
import {setLanguage} from "./redux/slices/language";
import Hotels from "./scenes/hotels";
import HotelServices from "./scenes/hotelServices";
import FAQ from "./scenes/faq";
import Payments from "./scenes/payments";
import FavouriteHotels from "./scenes/favouriteHotels";
import Receipts from "./scenes/receipts";
import BarChart from "./scenes/barChart";


function App() {
   const [theme, colorMode] = useMode();
   const dispatch = useDispatch();
   const isAuth = useSelector(selectIsAuth);
   const authData= useSelector(state => state.auth)
   // const authData =  useSelector(state => state.auth.data)

   let navigate = useNavigate()
   const redirect = () => {
      if(authData?.status == "loading") return
      if(authData.data == null && !isAuth) navigate("/login")
   }
   useEffect(() => {
      dispatch(fetchAuthMe())
   },[])
   useEffect(() => {
      redirect()
   },[authData])
  return (
      <ColorModeContext.Provider value={colorMode} >
         <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
               <Sidebar />
               <main className="content">
                  <Topbar/>
                  <Routes>
                     <Route path="/" element={<Dashboard/>}/>
                     <Route path="/favouriteHotels" element={<FavouriteHotels/>}/>
                     <Route path="/hotels" element={<Hotels/>}/>
                     <Route path="/hotels/:id/payments" element={<Payments/>}/>
                     <Route path="/hotels/:id/services" element={<HotelServices/>}/>
                     <Route path="/faq" element={<FAQ/>}/>
                     <Route path="/receipts" element={<Receipts/>}/>
                     <Route path="/login" element={<Login/>}/>
                     <Route path="/register" element={<Registration/>}/>
                     <Route path="/profile" element={<Profile/>}/>
                     <Route path="/barchart" element={<BarChart/>}/>
                  </Routes>
               </main>
            </div>
         </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
