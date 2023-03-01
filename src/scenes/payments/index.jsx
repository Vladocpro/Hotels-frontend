import React,{useEffect,useState} from 'react';
import {Box,Button,useTheme} from "@mui/material";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";
import {fetchCurrentHotel,fetchHotels} from "../../redux/slices/hotels";
import axios from "../../axios";

const Payments = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const hotelsSelector = useSelector(state => state.hotels)
   const [payments, setPayments] = useState([]);
   const languageSelector= useSelector(state => state.isEnglish)
   const [isLoaded, setIsLoaded] = useState(false);
   const navigate = useNavigate();
   let {id} = useParams();

   useEffect(() => {
      dispatch(fetchCurrentHotel(id))
   },[])

   useEffect(() => {
      if(hotelsSelector.current.data === null) return
      else {
         let id = 1;
         let tempArray = []
         hotelsSelector.current.data.payments.reduce((acc, item) => {
            let {  ...data} = item
            data = {...data, id};
            tempArray.push(data)
            id++;

         }, [])
         setPayments(Object.assign([], tempArray));
         setIsLoaded(true);
      }
   },[hotelsSelector])

   // navigate to /hotels/:id/services
   const columns = [
      {field: "user", headerName: languageSelector.bool ? "User Id" : "Айді Користувача", flex: 1},
      {field: "name", headerName: languageSelector.current.name,  flex: 1},
      {field: "price", headerName: languageSelector.current.price, renderCell: (params) => {
            return <div className="rowitem">{languageSelector.current.currency}{Number(params.row.price) * languageSelector.current.currencyMultiplier}</div>;
         }, flex: 1},
      {field: "resources", headerName: languageSelector.bool ? "Resources" : "Ресурси", renderCell: (params) => {
            return <div className="rowitem">{languageSelector.current.currency}{Number(params.row.resources) * languageSelector.current.currencyMultiplier}</div>;
         }, flex: 1},
      {field: "createdAt", headerName: languageSelector.current.date, flex: 1},
   ];


   return (
       <Box m="20px">
          <Header title={hotelsSelector.current.data?.name} subtitle={languageSelector.bool ? "All receipts" : "Усі платежі"} />
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
                 '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                    background: colors.primary[400],
                 },
                 '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                    backgroundColor: colors.grey[100],
                    borderRadius: "30px"
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
             <DataGrid  rows={payments} columns={columns} loading={!isLoaded} />
          </Box>
       </Box>
   );
};

export default Payments;
