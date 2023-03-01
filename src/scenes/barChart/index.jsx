import React,{useEffect,useState} from 'react';
import {Box,useTheme} from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import Header from "../../components/Header";
import {tokens} from "../../theme";
import {useDispatch,useSelector} from "react-redux";
import {fetchHotelsByUser} from "../../redux/slices/hotels";

const BarChart = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const hotelsSelector = useSelector(state => state.hotels)
   const authData = useSelector(state => state.auth.data)
   const languageSelector= useSelector(state => state.isEnglish)

   const [data, setData] = useState([])
   const dispatch = useDispatch()
   const getData = async () => {
      let hotels = []
      hotelsSelector.userHotels.data.forEach( item => {
         if (item.user._id == authData._id) hotels.push(item)
      });
      let customizedData = [];
      hotels.forEach(item => {
         let object = {};
         let accIncome = 0;
         let accExp = 0;
         if(item.payments.length > 0) {
            for (let i = 0; i < item.payments.length; i++) {
               accIncome += item.payments[i].price
               accExp += item.payments[i].resources
            }
         }
         object.name = item.name;
         object.income = accIncome;
         object.expenses= accExp
         customizedData.push(object)
      })
      setData(customizedData);
   }
   useEffect(() => {
      if(!authData) return;
      dispatch(fetchHotelsByUser(authData._id))
   },[authData])
   useEffect(()=> {
      if(hotelsSelector.userHotels.data.length == 0) return;
      getData()
   },[hotelsSelector.userHotels])

   return (
       <Box m="20px">
          <Header title={languageSelector.bool ? "Bar Chart" : "Гістограма"} subtitle={languageSelector.bool ? "Income - Expenses Comparison" : "Прибуток - Витрати Порівняння"} />
          <Box height="75vh">
             <ResponsiveBar
                 data={data}
                 theme={{
                    // added
                    axis: {
                       domain: {
                          line: {
                             stroke: colors.grey[100],
                          },
                       },
                       legend: {
                          text: {
                             fill: colors.grey[100],
                             fontSize: "16px"
                          },
                       },
                       ticks: {
                          line: {
                             stroke: colors.grey[100],
                             strokeWidth: 1,
                          },
                          text: {
                             fill: colors.grey[100],
                          },
                       },
                    },
                    legends: {
                       text: {
                          fill: colors.grey[100],
                       },
                    },
                 }}
                 keys={["income", "expenses"]}
                 indexBy="name"
                 margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                 padding={0.3}
                 valueScale={{ type: "linear" }}
                 indexScale={{ type: "band", round: true }}
                 colors={{ scheme: "nivo" }}
                 defs={[
                    {
                       id: "dots",
                       type: "patternDots",
                       background: "inherit",
                       color: "#38bcb2",
                       size: 4,
                       padding: 1,
                       stagger: true,
                    },
                    {
                       id: "lines",
                       type: "patternLines",
                       background: "inherit",
                       color: "#eed312",
                       rotation: -45,
                       lineWidth: 6,
                       spacing: 10,
                    },
                 ]}
                 borderColor={{
                    from: "color",
                    modifiers: [["darker", "1.6"]],
                 }}
                 axisTop={null}
                 axisRight={null}
                 axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: languageSelector.bool ? "Hotels" : "Готелі",
                    legendPosition: "middle",
                    legendOffset: 32,
                 }}
                 axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend:  languageSelector.bool ? "Finances" : "Фінанси",
                    legendPosition: "middle",
                    legendOffset: -40,
                 }}
                 tooltip={d => {
                    return (
                        <Box fontSize="15px" color="white">
                           {
                              d.id == "expenses" ?
                                  <Box display="flex" alignItems="center" backgroundColor={colors.primary[200]} padding="4px 8px" borderRadius="4%">
                                     <Box>
                                        <Box>{d.data.name}</Box>
                                        <Box display="flex">
                                           <Box>{languageSelector.bool ? "Expenses" : "Витрати"}</Box>
                                           <Box margin="0 10px">-</Box>
                                           <Box>{languageSelector.current?.currency}{Number(d.data.expenses) * languageSelector.current.currencyMultiplier}</Box>
                                        </Box>
                                     </Box>
                                  </Box>
                                  :
                                  <Box display="flex" alignItems="center" backgroundColor={colors.primary[200]} padding="4px 8px" borderRadius="4%">
                                     <Box>
                                        <Box>{d.data.name}</Box>
                                        <Box display="flex">
                                           <Box>{languageSelector.bool ? "Income" : "Прибуток"}</Box>
                                           <Box margin="0 10px">-</Box>
                                           <Box>{languageSelector.current?.currency}{Number(d.data.income) * languageSelector.current.currencyMultiplier}</Box>
                                        </Box>
                                     </Box>
                                  </Box>
                           }

                        </Box>
                        )
                 }}
                 labelSkipWidth={12}
                 labelSkipHeight={12}
                 label={d => languageSelector.current?.currency + `${Number(d.value) * languageSelector.current.currencyMultiplier}`}
                 labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                 }}
                 legends={[
                    {
                       dataFrom: "keys",
                       anchor: "bottom-right",
                       direction: "column",
                       justify: false,
                       translateX: 120,
                       translateY: 0,
                       itemsSpacing: 2,
                       itemWidth: 100,
                       itemHeight: 20,
                       itemDirection: "left-to-right",
                       itemOpacity: 0.85,
                       symbolSize: 20,
                       effects: [
                          {
                             on: "hover",
                             style: {
                                itemOpacity: 1,
                             },
                          },
                       ],
                    },
                 ]}
                 role="application"
                 barAriaLabel={function (e) {
                    return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
                 }}
             />
          </Box>
       </Box>
   );
};

export default BarChart;
