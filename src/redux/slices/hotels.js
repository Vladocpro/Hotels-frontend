import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';



export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async ()=> {
   const {data} = await axios.get('/hotels')
   return data;
})
export const fetchHotelsByUser = createAsyncThunk('hotels/fetchHotelsByUser', async (id)=> {
   const {data} = await axios.get(`/userHotels/${id}`)
   return data;
})

export const fetchCurrentHotel = createAsyncThunk('hotels/fetchCurrentHotel', async (id)=> {
   const {data} = await axios.get(`/hotels/${id}`)
   return data;
})
export const fetchProfileHotels = createAsyncThunk('hotels/fetchProfileHotels', async (id)=> {
   const {data} = await axios.get(`/userHotels/${id}`)
   const returnData = data.reverse().slice(0, 5)
   return returnData;
})
export const fetchProfilePayments = createAsyncThunk('payments/fetchProfilePayments', async ({id,smth,short})=> {
   const {data} = await axios.get(`/userPayments/${id}`)
   if(short) {
      const returnData = data.reverse().slice(0, 5)
      return returnData;
   }
   else return data;
})


const initialState = {
   hotels: {
      data: [],
      status: 'loading'
   },
   userHotels: {
      data: [],
      status: 'loading'
   },
   current: {
      data: null,
      status: 'loading'
   },
   profileHotels: {
      data: [],
      status: 'loading'
   },
   profilePayments: {
      data: [],
      status: 'loading'
   }
};
const hotelsSlice = createSlice({
   name: 'hotels',
   initialState,
   reducers: {},
   extraReducers: {
      //getting hotels
      [fetchHotels.pending]: (state) => {
         state.hotels.data = [];
         state.hotels.status = 'loading';
      },
      [fetchHotels.fulfilled]: (state, action) => {
         state.hotels.data = action.payload;
         state.hotels.status = 'loaded';
      },
      [fetchHotels.rejected]: (state) => {
         state.hotels.data = [];
         state.hotels.status = 'error';
      },

      //getting hotels by user
      [fetchHotelsByUser.pending]: (state) => {
         state.userHotels.data = [];
         state.userHotels.status = 'loading';
      },
      [fetchHotelsByUser.fulfilled]: (state, action) => {
         state.userHotels.data = action.payload;
         state.userHotels.status = 'loaded';
      },
      [fetchHotelsByUser.rejected]: (state) => {
         state.userHotels.data = [];
         state.userHotels.status = 'error';
      },

      //getting profile hotels
      [fetchProfileHotels.pending]: (state) => {
         state.profileHotels.data = [];
         state.profileHotels.status = 'loading';
      },
      [fetchProfileHotels.fulfilled]: (state, action) => {
         state.profileHotels.data = action.payload;
         state.profileHotels.status = 'loaded';
      },
      [fetchProfileHotels.rejected]: (state) => {
         state.profileHotels.data = [];
         state.profileHotels.status = 'error';
      },
      //getting profile payments
      [fetchProfilePayments.pending]: (state) => {
         state.profilePayments.data = [];
         state.profilePayments.status = 'loading';
      },
      [fetchProfilePayments.fulfilled]: (state, action) => {
         state.profilePayments.data = action.payload;
         state.profilePayments.status = 'loaded';
      },
      [fetchProfilePayments.rejected]: (state) => {
         state.profilePayments.data = [];
         state.profilePayments.status = 'error';
      },
      // fetch current hotel
      [fetchCurrentHotel.pending]: (state) => {
         state.current.data = null;
         state.current.status = 'loading';
      },
      [fetchCurrentHotel.fulfilled]: (state, action) => {
         state.current.data = action.payload;
         state.current.status = 'loaded';
      },
      [fetchCurrentHotel.rejected]: (state) => {
         state.current.data = null;
         state.current.status = 'error';
      },
   },
})

export  const hotelsReducer = hotelsSlice.reducer;