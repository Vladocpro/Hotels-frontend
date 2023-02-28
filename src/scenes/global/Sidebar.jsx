import React,{useEffect,useState} from 'react';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {Link,useLocation,useNavigate} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {useDispatch,useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";



const Sidebar =  () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode)
   const [isCollapsed, setIsCollapsed] = useState(false)
   const [selected, setSelected] = useState("")
   const dispatch = useDispatch();
   const isAuth =  useSelector(selectIsAuth);
   const authData =  useSelector(state => state.auth.data)
   const languageSelector= useSelector(state => state.isEnglish.bool)
   const [activeItem, setActiveItem] = useState('')
   let navigate = useNavigate()
   let currentLocation = useLocation();


   useEffect(() => {
      switch (currentLocation.pathname.split("/")[1]) {
         case 'favouriteHotels':
            if(languageSelector) setActiveItem("Favourite hotels")
             else setActiveItem("Улюблені готелі")
            break;
         case 'hotels':
            if(languageSelector) setActiveItem("Hotels")
             else setActiveItem("Готелі")
            break;
         case 'faq':
            if(languageSelector) setActiveItem("FAQ Page")
             else setActiveItem("Запитання й відповіді")
            break;
         case 'receipts':
            if(languageSelector) setActiveItem("My Receipts")
             else setActiveItem("Мої платежі")
            break;
         case 'profile':
            if(languageSelector) setActiveItem("Profile")
             else setActiveItem("Профіль")
            break;
         case 'barchart':
            if(languageSelector) setActiveItem("Payments evaluation")
             else setActiveItem("Оцінка платежів")
            break;
         default:
            if(languageSelector) setActiveItem('Dashboard')
            else setActiveItem("Обзор")
      }
   },[currentLocation, languageSelector])
   const redirect = (to, title) => {
      if(authData?.status == "loading") return
      if(authData?.data == null && !isAuth) navigate("/login")
      else {
         navigate(to);
         setSelected(title);
      }

   }

   const Item = ({ title, to, icon, selected }) => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      return (
          <MenuItem
              active={activeItem === title}
              style={{
                 color: colors.grey[100],
              }}
              onClick={() => {
                 redirect(to, title)
              }}
              icon={icon}
          >
             <Typography>{title}</Typography>
             <Link to={to} />
          </MenuItem>
      );
   };



   return (
       <div>
          {
             currentLocation.pathname.split("/")[1] !== "login" && currentLocation.pathname.split("/")[1] !== "register"
                 &&
                 (<Box sx={{
                    "& .pro-sidebar-inner": {
                       background: `${colors.primary[400]} !important`,
                    },
                    "& .pro-icon-wrapper": {
                       backgroundColor: "transparent !important",
                    },
                    "& .pro-inner-item": {
                       padding: "5px 35px 5px 20px !important",
                    },
                    "& .pro-inner-item:hover": {
                       color: "#868dfb !important",
                    },
                    "& .pro-menu-item.active": {
                       color: "#6870fa !important",
                    },
                    "height": "100vh"
                 }}>
                    <ProSidebar collapsed={isCollapsed}>
                       <Menu iconShape="square">
                          {/* LOGO AND MENU ICON */}
                          <MenuItem
                              onClick={() => setIsCollapsed(!isCollapsed)}
                              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                              style={{
                                 margin: "10px 0 20px 0",
                                 color: colors.grey[100],
                              }}
                          >
                             {!isCollapsed && (
                                 <Box
                                     display="flex"
                                     justifyContent="space-between"
                                     alignItems="center"
                                     ml="15px"
                                 >
                                    <Typography variant="h3" color={colors.grey[100]}>

                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                       <MenuOutlinedIcon />
                                    </IconButton>
                                 </Box>
                             )}
                          </MenuItem>

                          {!isCollapsed && (
                              <Box mb="25px">
                                 <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="profile-user"
                                        width="105px"
                                        height="120px"

                                        src={`../../assets/hero.png`}
                                        style={{ cursor: "pointer", borderRadius: "32%" }}
                                    />
                                 </Box>
                                 <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ m: "10px 0 0 0" }}
                                    >
                                       {authData?.firstName} {authData?.secondName}
                                    </Typography>
                                    <Typography variant="h5" color={colors.greenAccent[500]}>
                                       {authData?.role}
                                    </Typography>
                                 </Box>
                              </Box>
                          )}

                          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                             <Item
                                 title={languageSelector ? "Dashboard" : "Обзор"}
                                 to="/"
                                 icon={<HomeOutlinedIcon />}
                                 selected={selected}
                                 setSelected={setSelected}
                             />
                             <Typography
                                 variant="h6"
                                 color={colors.grey[300]}
                                 sx={{ m: "15px 0 5px 20px" }}
                             >
                                {languageSelector ? "Hotels info" : "Інформація про готелі"}
                             </Typography>
                             <Item
                                 title={languageSelector ? "Favourite hotels" : "Улюблені готелі"}
                                 to="/favouriteHotels"
                                 icon={<FavoriteBorderOutlinedIcon />}
                                 selected={selected}
                                 setSelected={setSelected}
                             />
                             <Item
                                 title={languageSelector ? "Hotels" : "Готелі"}
                                 to="/hotels"
                                 icon={<ApartmentOutlinedIcon />}
                                 selected={selected}
                                 setSelected={setSelected}
                             />


                             <Typography
                                 variant="h6"
                                 color={colors.grey[300]}
                                 sx={{ m: "15px 0 5px 20px" }}
                             >
                                {languageSelector ? "Pages" : "Сторінки"}
                             </Typography>
                             <Item
                                 title={languageSelector ? "Profile" : "Профіль"}
                                 to="/profile"
                                 icon={<PersonOutlinedIcon />}
                                 selected={selected}
                                 setSelected={setSelected}
                             />
                             <Item
                                 title={languageSelector ? "My Receipts" : "Мої платежі"}
                                 to="/receipts"
                                 icon={<ReceiptOutlinedIcon />}
                                 selected={selected}
                                 setSelected={setSelected}
                             />
                             <Item
                                 title={languageSelector ? "FAQ Page" : "Запитання й відповіді"}
                                 to="/faq"
                                 icon={<HelpOutlineOutlinedIcon />}
                                 selected={selected}
                                 setSelected={setSelected}
                             />

                             <Typography
                                 variant="h6"
                                 color={colors.grey[300]}
                                 sx={{ m: "15px 0 5px 20px" }}
                             >
                                {languageSelector ? "Statistics" : "Статистика"}
                             </Typography>
                             <Item
                                 title={languageSelector ? "Payments evaluation" : "Оцінка платежів"}
                                 to="/barchart"
                                 icon={<BarChartOutlinedIcon />}
                                 selected={selected}
                                 setSelected={setSelected}
                             />
                          </Box>
                       </Menu>
                    </ProSidebar>
                 </Box>)
          }
       </div>

   );
};

export default Sidebar;
