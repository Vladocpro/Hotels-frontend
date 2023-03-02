import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchAuthMe,selectIsAuth} from "../../redux/slices/auth";

const Dashboard = () => {
   const isAuth = useSelector(selectIsAuth);

   const authData= useSelector(state => state.auth)
   const dispatch = useDispatch();

   // const authData =  useSelector(state => state.auth.data)

   let navigate = useNavigate()
   const redirect = () => {
      if(authData?.status === "loading") return
      if(authData.data == null && !isAuth) navigate("/login")
   }
   useEffect(() => {
      if (!isAuth) dispatch(fetchAuthMe())
   },[])
   useEffect(() => {
      redirect()
   },[authData])
   return (
       <div style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
          {
             authData?.data === null ?
                 <div>
                    <h1>Connecting to the server...</h1>
                    <h1>Please wait around 10-15 seconds</h1>
                 </div>
                 :
                 <div></div>
          }

       </div>
   );
};

export default Dashboard;
