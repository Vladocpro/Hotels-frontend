import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth";
import {languageReducer} from "./slices/language";
import {hotelsReducer} from "./slices/hotels";


const store = configureStore({
   reducer: {
      auth: authReducer,
      isEnglish: languageReducer,
      hotels: hotelsReducer
   },
   devTools: false
})
export default store;
