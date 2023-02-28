import React,{useEffect,useState} from 'react';
import {Box,Button,useTheme} from "@mui/material";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {tokens} from "../../theme";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";
import {fetchCurrentHotel,fetchProfilePayments} from "../../redux/slices/hotels";

const Receipts = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const authData = useSelector(state => state.auth.data)
   const [payments, setPayments] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const hotelsSelector= useSelector(state => state.hotels)
   const languageSelector= useSelector(state => state.isEnglish)


   useEffect(() => {
      if(!authData) return;
      dispatch(fetchProfilePayments({id :authData._id, short: false}))
   },[authData])

   useEffect(() => {
      if(hotelsSelector.profilePayments.data === null) return
      else {
         let id = 1;
         let tempArray = []
         hotelsSelector.profilePayments.data.reduce((acc, item) => {
            let {  ...data} = item
            data = {...data, id};
            tempArray.push(data)
            id++;

         }, [])
         setPayments(Object.assign([], tempArray));
         setIsLoaded(true);
      }
   },[hotelsSelector])


   const columns = [
      {field: "hotelName", headerName: languageSelector.bool ? "Hotel Name" : "Назва готелю",  flex: 1},
      {field: "hotelLocation", headerName: languageSelector.bool ? "Hotel Location" : "Місцезнаходження готелю",   flex: 1},
      {field: "name", headerName: languageSelector.bool ? "Service Name" : "Назва послуги",  width: 150},
      {field: "price", headerName: languageSelector.current.price,  renderCell: (params) => {
            return <div className="rowitem">{languageSelector.current.currency}{Number(params.row.price) * languageSelector.current.currencyMultiplier}</div>;
         }, width: 150},
      {field: "createdAt", headerName: languageSelector.current.date, width: 150},
   ];

   return (
       <Box m="20px">
          <Header title={languageSelector.bool ? "Receipts" : "Платежі"} subtitle={languageSelector.bool ? "My Receipts": "Мої платежі"} />
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
             <DataGrid  rows={payments} columns={columns} loading={!isLoaded} />
             {/*       : <Box></Box>*/}
             {/*}*/}
          </Box>
       </Box>
   );
};

export default Receipts;
