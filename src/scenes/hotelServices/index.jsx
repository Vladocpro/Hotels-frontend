import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {Box,Button,IconButton,Tooltip,Typography,useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {fetchCurrentHotel,fetchHotelsByUser,fetchProfileHotels,fetchProfilePayments} from "../../redux/slices/hotels";
import {useLocation,useParams} from "react-router-dom";
import Header from "../../components/Header";
import {DataGrid,GridToolbar} from "@mui/x-data-grid";
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import {fetchAuthMe} from "../../redux/slices/auth";
import axios from "../../axios";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
const HotelServices = () => {

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const [services, setServices] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const hotelsSelector = useSelector(state => state.hotels)
   const authData = useSelector(state => state.auth.data)
   const [columns, setColumns] = useState([]);
   const languageSelector= useSelector(state => state.isEnglish)


   let {id} = useParams();
   useEffect(() => {
         // dispatch(fetchAuthMe())
         dispatch(fetchCurrentHotel(id))
   },[])

   useEffect(() => {
      if(authData == null || hotelsSelector.current.data == null) return
      adjustColumns()
   },[authData, hotelsSelector.current.data, languageSelector])

   useEffect(() => {
      if(hotelsSelector.current.data === null) return
      else {
         let id = 1;
         let tempArray = []
         hotelsSelector.current.data.services.reduce((acc, item) => {
            let { ...data} = item
            data = {...data, id};
            tempArray.push(data)
            id++;

         }, [])
         setServices(Object.assign([], tempArray));
         setIsLoaded(true);
      }
   },[hotelsSelector.current.data])

   const adjustColumns = () => {
      if(hotelsSelector.current.data == null) return;
      if(authData._id == hotelsSelector.current.data.user._id) {
         setColumns(
             [
                {field: "name", headerName: languageSelector.current.name, editable:true, flex: 1},
                {field: "price", headerName: languageSelector.current.price, editable:true, renderCell: (params) => {
                      return <div className="rowitem">{languageSelector.current.currency}{Number(params.row.price) * languageSelector.current.currencyMultiplier}</div>;
                   }, flex: 1},
                {field: "actions", headerName: languageSelector.current.actions, renderCell: (params) => {
                      return (
                          <Box>
                             <Button variant="contained" fullWidth onClick={async ()=> await axios.post('/hotels/:id/services/:serviceId/payments',{hotel: hotelsSelector.current.data._id, service: params.row._id, user: authData._id})}><PaymentOutlinedIcon sx={{marginRight: "2px"}}/>{languageSelector.current.pay}</Button>
                             <Tooltip title={<Typography style={{fontSize: 14}}>{languageSelector.bool ? "Save changes" : "Зберігти зміни"}</Typography>}  enterDelay={1500} leaveDelay={200}>
                                <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} fullWidth onClick={async ()=> {
                                   let price = Number(params.row.price)
                                   await axios.patch('/hotels/:id/services/:serviceId', {hotel: hotelsSelector.current.data._id, service: params.row._id , name: params.row.name,  price: price}).then(() => alert("Success"))
                                }}>
                                   <SaveAsOutlinedIcon sx={{"margin": "0 2px"}} />
                                </IconButton>
                             </Tooltip>
                             <Tooltip title={<Typography style={{fontSize: 14}}>{languageSelector.bool ? "Remove service" : "Видалити послугу"}</Typography>}  enterDelay={1500} leaveDelay={200}>
                                <IconButton variant="contained" sx={{margin: "0 4px 0 0"}} fullWidth onClick={async () => {
                                   await axios.delete('/hotels/:id/services/:serviceId',{data: {hotel: hotelsSelector.current.data._id, service: params.row._id,}})
                                   dispatch(fetchCurrentHotel(id))
                                }}>
                                   <DeleteForeverOutlinedIcon sx={{"marginRight": "2px"}} />
                                </IconButton>
                             </Tooltip>
                          </Box>
                      )
                   }, flex: 1},
             ]
         )
      }
      else {
         setColumns(
             [
                {field: "name", headerName: languageSelector.current.name, editable: false, flex: 1},
                {field: "price", headerName: languageSelector.current.price, editable: false,  renderCell: (params) => {
                      return <div className="rowitem">{languageSelector.current.currency}{Number(params.row.price) * languageSelector.current.currencyMultiplier}</div>;
                   }, flex: 1},
                {field: "actions", headerName: "Actions", renderCell: (params) => {
                      return (
                          <Button variant="contained" fullWidth onClick={async ()=> await axios.post('/hotels/:id/services/:serviceId/payments',{hotel: hotelsSelector.current.data._id, service: params.row._id, user: authData._id}).then(() => alert(languageSelector.bool ?"Success" : "Успіх"))}><PaymentOutlinedIcon sx={{marginRight: "2px"}}/>{languageSelector.current.pay}</Button>
                      )
                   }, flex: 1},
             ]
         )
      }
   }


   return (
       <Box m="20px">
          {
             hotelsSelector.current.data ?
                 <Header title={hotelsSelector.current.data?.name} subtitle={languageSelector.current.services} buttonName={languageSelector.current.createService} user={authData != null ? authData : null} hotel={hotelsSelector.current} />
                 :
                 <Box height="64.74px"></Box>
          }
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
              }}>
             <DataGrid  rows={services} columns={columns} loading={!isLoaded}  />
          </Box>
       </Box>
   );
};

export default HotelServices;
