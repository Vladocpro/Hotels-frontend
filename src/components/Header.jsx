import {Typography,Box,useTheme,Popover,makeStyles} from "@mui/material";
import { tokens } from "../theme";
import Button from "@mui/material/Button";
import {useEffect,useState} from "react";
import TextField from "@mui/material/TextField";
import {inputLabelClasses} from "@mui/material/InputLabel";
import {fetchAuth} from "../redux/slices/auth";
import {setLanguage} from "../redux/slices/language";
import {useForm} from "react-hook-form";
import {fetchCurrentHotel,fetchHotelsByUser} from "../redux/slices/hotels";
import axios from "../axios";
import {useDispatch,useSelector} from "react-redux";

const Header = ({ title, subtitle, buttonName, user, hotel }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [name, setName] = useState('');
   const [location, setLocation] = useState('');
   const [price, setPrice] = useState(0);
   const [anchorEl, setAnchorEl] = useState(null);
   const languageSelector= useSelector(state => state.isEnglish)
   const dispatch = useDispatch();


   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setName("");
      setLocation("");
      setPrice(0);
   };



   return (
       <Box mb="30px" display="flex" justifyContent="space-between">
          <Box>
             <Typography
                 variant="h2"
                 color={colors.grey[100]}
                 fontWeight="bold"
                 sx={{ m: "0 0 5px 0" }}
             >
                {title}
             </Typography>
             <Typography variant="h5" color={colors.greenAccent[400]}>
                {subtitle}
             </Typography>
          </Box>
          <Box>
             {(() => {
                if (user != null) {
                   if (buttonName == languageSelector.current.createHotel  && user && user?.role === "Hotel Owner") {
                      return (
                          <Box>
                             <Button variant="contained" sx={{backgroundColor: "black",margin: "10px 0"}}
                                     onClick={handleClick}>
                                {buttonName}
                             </Button>
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
                                       label="Name"
                                       value={name}
                                       InputLabelProps={{
                                          sx: {
                                             [`&.${inputLabelClasses.shrink}`]: {
                                                // set the color of the label when shrinked (usually when the TextField is focused)
                                                color: "#6BBCC9"
                                             }
                                          }
                                       }}

                                       onChange={e => setName(e.target.value)}
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
                                       label="Location"
                                       value={location}
                                       InputLabelProps={{
                                          sx: {
                                             [`&.${inputLabelClasses.shrink}`]: {
                                                // set the color of the label when shrinked (usually when the TextField is focused)
                                                color: "#6BBCC9"
                                             }
                                          }
                                       }}
                                       fullWidth
                                       onChange={e => setLocation(e.target.value)}
                                   />
                                   <Button size="large" variant="contained" fullWidth sx={{backgroundColor: "black"}} onClick={async () => {
                                      // console.log(name.length)
                                      if(name.length >=2 && location.length >= 3) {
                                         await axios.post("/hotels", {name : name, location: location, user: user._id})
                                         handleClose()
                                       dispatch(fetchHotelsByUser(user._id))

                                      }
                                   }}>
                                      Add Hotel
                                   </Button>
                                </Box>
                             </Popover>
                          </Box>
                      )
                   } else if (buttonName == languageSelector.current.createService && hotel?.data?.user?._id == user._id) {
                      return (
                          <Box>
                             <Button variant="contained" sx={{backgroundColor: "black",margin: "10px 0"}}
                                     onClick={handleClick}>
                                {buttonName}
                             </Button>
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
                                       label="Price"
                                       value={name}
                                       InputLabelProps={{
                                          sx: {
                                             [`&.${inputLabelClasses.shrink}`]: {
                                                // set the color of the label when shrinked (usually when the TextField is focused)
                                                color: "#6BBCC9"
                                             }
                                          }
                                       }}

                                       onChange={e => setName(e.target.value)}
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
                                          input: {
                                             '& input[type=number]': {
                                                '-moz-appearance': 'textfield'
                                             },
                                             '& input[type=number]::-webkit-outer-spin-button': {
                                                '-webkit-appearance': 'none',
                                                margin: 0
                                             },
                                             '& input[type=number]::-webkit-inner-spin-button': {
                                                '-webkit-appearance': 'none',
                                                margin: 0
                                             }
                                          },
                                       }}
                                       label="Price"
                                       value={price}
                                       InputLabelProps={{
                                          sx: {
                                             [`&.${inputLabelClasses.shrink}`]: {
                                                // set the color of the label when shrinked (usually when the TextField is focused)
                                                color: "#6BBCC9"
                                             }
                                          }
                                       }}
                                       fullWidth
                                       onChange={e => setPrice(e.target.value)}
                                       type="number"
                                   />
                                   <Button size="large" variant="contained" fullWidth sx={{backgroundColor: "black"}} onClick={async () => {
                                      // console.log(price)
                                      if(name.length >=1 && price > 0) {
                                         let priceInNumber = Number(price)
                                         await axios.post("/hotels/:id/services", {name : name, price: priceInNumber, hotel: hotel.data._id})
                                         handleClose()
                                         dispatch(fetchCurrentHotel(hotel.data._id))
                                      }
                                   }}>
                                      Add Service
                                   </Button>
                                </Box>
                             </Popover>
                          </Box>

                      )
                   }
                }

             })()}
          </Box>

       </Box>
   );
};

export default Header;