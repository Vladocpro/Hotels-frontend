import React,{useEffect} from 'react';
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {useDispatch,useSelector} from "react-redux";
import {fetchAuthMe,logout,selectIsAuth} from "../../redux/slices/auth";
import {Link,Navigate,useNavigate} from "react-router-dom";
import {setLanguage} from "../../redux/slices/language";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';

const Topbar = () => {
   let navigate = useNavigate()
   const theme = useTheme()
   const colors = tokens(theme.palette.mode)
   const colorMode = useContext(ColorModeContext);
   const dispatch = useDispatch();
   const isAuth = useSelector(selectIsAuth);
   const authData= useSelector(state => state.auth)
   const languageSelector= useSelector(state => state.isEnglish.bool)
   const navigateTo = () => {
      if(authData?.status == "loading") return
      if(authData?.data == null && !isAuth) navigate("/login")
      else {
         navigate("/profile")
      }
   }
   useEffect(() => {
      dispatch(fetchAuthMe())
   },[])
   return (
       <Box display="flex" justifyContent="space-between" p={2}>
          {/*SearchBar*/}
          {/*{*/}
          {/*   (!authData.data) ?*/}
          {/*       <div></div>*/}
          {/*       :*/}
          {/*       <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">*/}
          {/*          <InputBase sx={{ml: 2, flex: 1}} placeholder="search"></InputBase>*/}
          {/*          <IconButton type="button" sx={{p: 1}}>*/}
          {/*             <SearchIcon/>*/}
          {/*          </IconButton>*/}
          {/*       </Box>*/}
          {/*}*/}
          <Box></Box>


          {/*<Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">*/}
          {/*     <InputBase sx={{ml: 2, flex: 1}} placeholder="search"></InputBase>*/}
          {/*     <IconButton type="button" sx={{p: 1}}>*/}
          {/*        <SearchIcon/>*/}
          {/*     </IconButton>*/}
          {/*</Box>*/}
          <Box display="flex">
             <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlinedIcon/>
                ) : <LightModeOutlinedIcon/>}
             </IconButton>
             <IconButton
                 onClick={() => dispatch(setLanguage(languageSelector ? false : true))}
             >
                    <TranslateOutlinedIcon/>
             </IconButton>
             <IconButton
                 onClick={() => authData.status == "loaded" ? navigateTo() : navigate("/login")}
             >
                <PersonOutlinedIcon/>
             </IconButton>
             <IconButton
                 onClick={() => {
                    dispatch(logout())
                    window.localStorage.removeItem('token')
                 }}
             >
                <LogoutOutlinedIcon/>
             </IconButton>
          </Box>
       </Box>
   );
};

export default Topbar;
