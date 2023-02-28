import React,{useEffect,useState} from 'react';
import {Box,Button,FormControl,IconButton,InputLabel,MenuItem,Select,useTheme} from "@mui/material";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {useDispatch,useSelector} from "react-redux";
import {
   fetchHotels,
   fetchHotelsByUser,
} from "../../redux/slices/hotels";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {DataGrid} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import axios from "../../axios";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import {fetchAuthMe} from "../../redux/slices/auth";

const Hotels = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const hotelsSelector= useSelector(state => state.hotels.hotels)
   const userHotels= useSelector(state => state.hotels.userHotels)
   const languageSelector= useSelector(state => state.isEnglish)
   const authData = useSelector(state => state.auth.data)
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
      if(!authData) return
      dispatch(fetchHotelsByUser(authData?._id))
   },[authData])
   useEffect(() => {
       dispatch(fetchHotels())
   },[])

   const columns = [
       {field: "name", headerName:  languageSelector.current.name,  flex: 1},
      {field: "location", headerName: languageSelector.current.location,  flex: 1},
      {field: "userInfo", width: 180,sortable: false, headerName: languageSelector.current.owner, renderCell: (params) => {
            return <div className="rowitem">{params.row.user.firstName} {params.row.user.secondName}</div>;
         }},
      {field: "services",sortable: false, headerName: languageSelector.current.services, width: 120,  renderCell : (params) => {
         return (
                <Button variant="contained" sx={{padding: "6px"}} onClick={() => navigate(`/hotels/${params.row._id}/services`)}>{languageSelector.current.view}</Button>
         )
         }},
      {field: "actions", width: 100, sortable: false, headerName: languageSelector.current.actions, renderCell: (params) => {
            return(
                <Box>
                   {userHotels.data.some((e) => e._id == params.row._id)
                       ?
                       <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} onClick={ async () => {
                          if(authData._id == params.row.user._id) {
                             alert(languageSelector.bool ? "You can't remove hotel that you own from favourites" : "Ви не можете видали готель з улюблених бо ви є власник")
                             return;
                          }
                          await axios.delete(`/userHotels`, {data: {user: authData._id, hotel: params.row._id}})
                              .then((response) => {
                                 dispatch(fetchHotelsByUser(authData?._id))
                                 alert("Removed from favourites")
                              }, (error) => {
                                 alert(error.response.data);
                              });
                       }}>
                          <FavoriteOutlinedIcon sx={{"marginRight": "2px"}}/>
                       </IconButton>
                       :
                       <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} onClick={async () => {
                          await axios.post('/userHotels',  {user: authData._id, hotel: params.row._id})
                              .then((response) => {
                                 dispatch(fetchHotelsByUser(authData?._id))
                                 alert("Success")
                              }, (error) => {
                                 alert(error.response.data);
                              });
                       }}>
                          <FavoriteBorderOutlinedIcon sx={{"marginRight": "2px"}} />
                       </IconButton>

                   }
                </Box>

                )
         }},
   ];
   return (
       <Box m="20px">
          <Header title={languageSelector.bool ? "HOTELS" : "ГОТЕЛІ"} subtitle={languageSelector.bool ? "All Hotels" : "Усі готелі"} />
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
                    <DataGrid  rows={hotels} columns={columns} loading={!isLoaded} />
          </Box>
       </Box>
   );
};

export default Hotels;
