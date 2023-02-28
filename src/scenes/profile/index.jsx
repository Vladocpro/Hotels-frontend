import React,{useEffect,useState} from 'react';
import {Box,Button,Popover,Typography,useTheme} from "@mui/material";
import {useDispatch,useSelector} from "react-redux";
import {tokens} from "../../theme";
import {setLanguage} from "../../redux/slices/language";
import {fetchHotelsByUser,fetchProfileHotels,fetchProfilePayments} from "../../redux/slices/hotels";
import {MenuItem} from "react-pro-sidebar";

import {Link,useNavigate} from "react-router-dom";
import {fetchAuthMe} from "../../redux/slices/auth";
import TextField from "@mui/material/TextField";
import {inputLabelClasses} from "@mui/material/InputLabel";
import axios from "../../axios";

const Profile = () => {
   const authData = useSelector(state => state.auth.data)
   const theme = useTheme();
   const languageSelector= useSelector(state => state.isEnglish)
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const hotelsSelector= useSelector(state => state.hotels)
   const [firstName, setFirstName] = useState('');
   const [secondName, setSecondName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [anchorEl, setAnchorEl] = useState(null);
   const navigate = useNavigate();
   const [firstButtonLabel, setFirstButtonLabel] = useState("Show all my payments");
   const [secondButtonLabel, setSecondButtonLabel] = useState("Show my favourite hotels");


   useEffect(() => {
      if(!authData) return;
      else {
         dispatch(fetchProfileHotels(authData._id))
         dispatch(fetchProfilePayments({id :authData._id, short: true}))
         setFirstName(authData.firstName)
         setSecondName(authData.secondName)
         setEmail(authData.email)
      }
   },[authData])

   useEffect(() => {
      if(languageSelector.bool) setFirstButtonLabel("Show all my payments"); else setFirstButtonLabel("Показати всі мої платежі");
      if(languageSelector.bool) setSecondButtonLabel("Show my favourite hotels"); else setSecondButtonLabel("Показати мої улюблені готелі");
   },[languageSelector])
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setPassword("");
   };


   const MyProfileInfo = ({ title, buttonTitle, data }) => {
      return (
          <Box
              flex="500px 0 1" minWidth="310px"
              // margin="0 auto"
          >
             <Box  borderRadius="10px" marginBottom="10px" padding="7px" sx={{background: `${colors.primary[400]} !important`}}>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="4px" borderBottom="2px solid gray">
                   <Typography variant="h5" sx={{fontWeight: 600, marginBottom: "7px"}}>
                      {title}
                   </Typography>
                   <Button variant="contained" sx={{marginBottom: "7px"}} onClick={()=> {if(buttonTitle === firstButtonLabel) {
                      navigate("/receipts")
                   } else {
                      navigate("/favouriteHotels")
                   }}}>
                      {buttonTitle}
                   </Button>
                </Box >
                {data && data.map((item,index) => <Box display="flex" key={index} justifyContent="space-between" alignItems="center" marginTop="3px">
                   <Box marginBottom="6px">
                      <Typography variant="h5" margin="2px 0">{item.name}</Typography>
                      <Typography variant="h5">{item.location ? item.location : item.createdAt}</Typography>
                   </Box>
                   <Box>
                      {
                         item.price ?
                             <Typography variant="h5">${item.price}</Typography>
                             :
                             <Box></Box>
                      }
                   </Box>
                </Box>)}
             </Box>
          </Box>
      );
   };

   return (
       <Box display="flex" justifyContent="space-between" alignItems="start" padding="15px" flexWrap="wrap">
          <Box padding="2px"
               border="2px solid transparent"
               borderRadius="5px" minWidth="300px" maxWidth="700px" margin="0 10px 10px 0" textAlign="center" sx={{background: `${colors.primary[400]} !important`}}>
             <Box mb="5px" display="flex" justifyContent="center" padding="12px 2px 2px 2px">
                <img
                    alt="profile-user"
                    width="200px"
                    height="250px"
                    src={`../../assets/hero.png`}
                    style={{ borderRadius: "12%" }}
                />
             </Box>
             <Box padding="5px" >
                <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{margin: "2px 2px 20px 2px"}}
                    textAlign="center"
                >
                   {languageSelector.bool ? "My Profile" : "Мій профіль"}
                </Typography>
                <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{margin: "2px 10px"}}
                    textAlign="center"
                >
                   {authData?.firstName} {authData?.secondName}
                </Typography>
                <Typography
                    variant="h4"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{margin: "2px 10px"}}
                >{authData?.email}
                </Typography>
                <Typography
                    variant="h4"
                    color={colors.greenAccent[500]}
                    fontWeight="bold"
                    sx={{margin: "14px 10px 2px 10px"}}
                >{authData?.role}
                </Typography>
             </Box>
             <Box>
                <Button variant="contained" fullWidth
                        sx={{ border: "1px solid gray", borderRadius: "10px" ,margin: "4px 0 8px 0"}}
                        onClick={handleClick}>
                   Edit</Button>
                <Popover
                    anchorReference="anchorPosition"
                    anchorPosition={{top: 350,left: 900}}

                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                       vertical: 'bottom',
                       horizontal: 'left',
                    }}
                    transformOrigin={{
                       vertical: 'center',
                       horizontal: 'center',
                    }}
                >
                   <Box width="400px" backgroundColor={colors.primary[400]}>
                      <TextField
                          sx={{
                             margin: "20px 10px !important",
                             width: "380px !important",
                             '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
                                '& fieldset': {            // - The <fieldset> inside the Input-root
                                   borderColor: '#4A505E',   // - Set the Input border

                                },
                                '&:hover fieldset': {
                                   borderColor: '#60A9B5', // - Set the Input border when parent has :hover
                                },
                                '&.Mui-focused fieldset': { // - Set the Input border when parent is focused
                                   borderColor: '#6BBCC9',
                                },
                             },
                          }}
                          label="First Name"
                          value={firstName}
                          InputLabelProps={{
                             sx: {
                                [`&.${inputLabelClasses.shrink}`]: {
                                   // set the color of the label when shrinked (usually when the TextField is focused)
                                   color: "#6BBCC9"
                                }
                             }
                          }}

                          onChange={e => setFirstName(e.target.value)}
                      />
                      <TextField
                          sx={{
                             margin: "0 10px 20px 10px !important",
                             width: "380px !important",
                             '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
                                '& fieldset': {            // - The <fieldset> inside the Input-root
                                   borderColor: '#4A505E',   // - Set the Input border

                                },
                                '&:hover fieldset': {
                                   borderColor: '#60A9B5', // - Set the Input border when parent has :hover
                                },
                                '&.Mui-focused fieldset': { // - Set the Input border when parent is focused
                                   borderColor: '#6BBCC9',
                                },
                             },
                          }}
                          label="Second Name"
                          value={secondName}
                          InputLabelProps={{
                             sx: {
                                [`&.${inputLabelClasses.shrink}`]: {
                                   // set the color of the label when shrinked (usually when the TextField is focused)
                                   color: "#6BBCC9"
                                }
                             }
                          }}
                          fullWidth
                          onChange={e => setSecondName(e.target.value)}
                      />
                      <TextField
                          sx={{
                             margin: "0 10px 20px 10px !important",
                             width: "380px !important",
                             '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
                                '& fieldset': {            // - The <fieldset> inside the Input-root
                                   borderColor: '#4A505E',   // - Set the Input border

                                },
                                '&:hover fieldset': {
                                   borderColor: '#60A9B5', // - Set the Input border when parent has :hover
                                },
                                '&.Mui-focused fieldset': { // - Set the Input border when parent is focused
                                   borderColor: '#6BBCC9',
                                },
                             },
                          }}
                          label="Email"
                          type="email"
                          value={email}
                          InputLabelProps={{
                             sx: {
                                [`&.${inputLabelClasses.shrink}`]: {
                                   // set the color of the label when shrinked (usually when the TextField is focused)
                                   color: "#6BBCC9"
                                }
                             }
                          }}
                          fullWidth
                          onChange={e => setEmail(e.target.value)}
                      />
                      <TextField
                          sx={{
                             margin: "0 10px 20px 10px !important",
                             width: "380px !important",
                             '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
                                '& fieldset': {            // - The <fieldset> inside the Input-root
                                   borderColor: '#4A505E',   // - Set the Input border

                                },
                                '&:hover fieldset': {
                                   borderColor: '#60A9B5', // - Set the Input border when parent has :hover
                                },
                                '&.Mui-focused fieldset': { // - Set the Input border when parent is focused
                                   borderColor: '#6BBCC9',
                                },
                             },
                          }}
                          label="Password"
                          value={password}
                          type="password"
                          InputLabelProps={{
                             sx: {
                                [`&.${inputLabelClasses.shrink}`]: {
                                   // set the color of the label when shrinked (usually when the TextField is focused)
                                   color: "#6BBCC9"
                                }
                             }
                          }}
                          fullWidth
                          onChange={e => setPassword(e.target.value)}
                      />
                      <Button size="large" variant="contained" fullWidth sx={{backgroundColor: "black"}} onClick={async () => {
                         if(firstName.length < 2) {
                            alert("First Name must contain at least 2 symbols");
                            return;
                         }
                         if(secondName.length < 2) {
                            alert("Second Name must contain at least 2 symbols");
                            return;
                         }
                         if(password.length < 5) {
                            alert("Password must contain at least 5 symbols");
                            return
                         }
                         if(!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                            alert("Incorrect email address");
                            return
                         }
                         await axios.patch("/auth/patch", {firstName : firstName, secondName: secondName, email: email, password: password, user: authData._id})
                         handleClose()
                         dispatch(fetchAuthMe())

                      }}>
                         Save
                      </Button>
                   </Box>
                </Popover>
             </Box>
          </Box>
          <MyProfileInfo title={languageSelector.bool ? "Recent payments" : "Останні платежі"}buttonTitle={firstButtonLabel} data={hotelsSelector.profilePayments.data}/>
          <MyProfileInfo title={languageSelector.bool ? "Favourite hotels": "Улюблені готелі"} buttonTitle={secondButtonLabel} data={hotelsSelector.profileHotels.data}/>
       </Box>
   );
};

export default Profile;

