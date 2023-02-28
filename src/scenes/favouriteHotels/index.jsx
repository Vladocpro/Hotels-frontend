import React,{useEffect,useState} from 'react';
import {Box,Button,Fade,Grow,IconButton,Tooltip,Typography,useTheme,Zoom} from "@mui/material";
import {tokens} from "../../theme";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import {fetchHotels,fetchHotelsByUser,fetchProfileHotels,fetchProfilePayments} from "../../redux/slices/hotels";
import {fetchAuthMe} from "../../redux/slices/auth";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from "../../axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const FavouriteHotels = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const hotelsSelector= useSelector(state => state.hotels.userHotels)
   const authData = useSelector(state => state.auth.data)
   const languageSelector= useSelector(state => state.isEnglish)
   const [hotels, setHotels] = useState([])
   const [isLoaded, setIsLoaded] = useState(false);
   const navigate = useNavigate();


   useEffect(() => {
      if(hotelsSelector.data.length === 0) return
      else {
         let id = 1;
         let tempArray = []
         hotelsSelector.data.reduce((acc, item) => {
            let {  ...data} = item
            data = {...data, id};
            tempArray.push(data)
            id++;

         }, [])
         setHotels(Object.assign([], tempArray));
         setIsLoaded(true);
      }
   },[hotelsSelector])

   useEffect(() => {
      if(!authData) return;
         dispatch(fetchHotelsByUser(authData._id))
   },[authData])

   // navigate to /hotels/:id/services
   const columns = [
      {field: "name", headerName:  languageSelector.current.name, editable: true,  flex: 1},
      {field: "location", headerName: languageSelector.current.location, editable:true,  flex: 1},
      {field: "userInfo", width: 180,sortable: false, headerName: languageSelector.current.owner, renderCell: (params) => {
            return <div className="rowitem">{params.row.user.firstName} {params.row.user.secondName}</div>;
         }},
      {field: "services", width: 120,sortable: false, headerName: languageSelector.current.services, renderCell: (params) => {
            return    <Button variant="contained" sx={{padding: "6px"}} fullWidth onClick={() => navigate(`/hotels/${params.row._id}/services`)}>{languageSelector.current.view}</Button>
         }},
      {field: "actions", headerName: languageSelector.current.actions, sortable: false, flex: 1,  renderCell : (params) => {
            return (
                <Box>
                   {authData._id == params.row.user._id ?
                       <Box>
                          <Tooltip title={<Typography style={{fontSize: 14}}>{languageSelector.bool ? "View receipts" : "Дивитися платежі"}</Typography>}  enterDelay={1500} leaveDelay={200}>
                             <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} fullWidth onClick={() => navigate(`/hotels/${params.row._id}/payments`)}>
                                <ReceiptOutlinedIcon sx={{"marginRight": "2px"}} />
                             </IconButton>
                          </Tooltip>
                          <Tooltip title={<Typography style={{fontSize: 14}}>{languageSelector.bool ? "Save changes" : "Зберігти зміни"}</Typography>}  enterDelay={1500} leaveDelay={200}>
                             <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} fullWidth onClick={async ()=> {
                                await axios.patch('/hotels', {hotel: params.row._id, name: params.row.name,  location: params.row.location}).catch(e => console.log(e))}}>
                                <SaveAsOutlinedIcon sx={{"marginRight": "2px"}} />
                             </IconButton>
                          </Tooltip>
                          <Tooltip title={<Typography style={{fontSize: 14}}>{languageSelector.bool ? "Delete hotel" : "Видалити готель"}</Typography>}  enterDelay={1500} leaveDelay={200}>
                             <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} fullWidth onClick={async () => {
                                await axios.delete('/hotels',{data: {hotel: params.row._id, user: authData._id,}})
                                dispatch(fetchHotelsByUser(authData._id))
                             }}>
                                <DeleteForeverOutlinedIcon sx={{"marginRight": "2px"}} />
                             </IconButton>
                          </Tooltip>

                       </Box>
                       :
                       <Tooltip title={<Typography style={{fontSize: 14}}>{languageSelector.bool ? "Remove from favourites" : "Видалити з улублених"}</Typography>}  enterDelay={1500} leaveDelay={200}>
                          <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} fullWidth onClick={async () => {
                             await axios.delete('/userHotels',{
                                data: {
                                   hotel: params.row._id,
                                   user: authData._id,
                                }
                             })
                             dispatch(fetchHotelsByUser(authData._id))
                          }}>
                             <FavoriteBorderOutlinedIcon sx={{"marginRight": "2px"}} />
                          </IconButton>
                       </Tooltip>
                   }

                </Box>
            )
         }}
   ];

   return (
       <Box m="20px">
          <Header title={languageSelector.bool ? "HOTELS" : "ГОТЕЛІ"} subtitle={languageSelector.bool ? "Favourite Hotels" : "Улюблені готелі"}  buttonName={languageSelector.current.createHotel} user={authData} hotel={hotelsSelector.current}/>
          <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                 "& .MuiDataGrid-root": {
                    border: "none",
                 },
                 "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                 },
                 "& .name-column--cell": {
                    color: colors.greenAccent[300],
                 },
                 "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                 },
                 "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                 },
                 "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                 },
                 "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                 },
              }}
          >
             {/*{*/}
             {/*   isLoaded ?*/}
             <DataGrid  rows={hotels} columns={columns} loading={!isLoaded}  />
             {/*       : <Box></Box>*/}
             {/*}*/}
          </Box>
       </Box>
   );
};

export default FavouriteHotels;


/* delete from favourites
<Tooltip title={<Typography style={{fontSize: 14}}>Delete Hotel</Typography>}  enterDelay={1500} leaveDelay={200}>
                             <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} fullWidth onClick={async () => {
                                await axios.delete('/hotels',{
                                   data: {
                                      hotel: params.row._id,
                                      user: authData._id,
                                   }
                                })
                             }}>
                                <DeleteForeverOutlinedIcon sx={{"marginRight": "2px"}} />
                             </IconButton>
                          </Tooltip>
 */