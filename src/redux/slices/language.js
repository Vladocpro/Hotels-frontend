import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import {fetchAuth,fetchAuthMe,fetchRegister} from "./auth";
import axios from "../../axios";

const initialState = {
   bool: true,
   current: {
      name: "Name",
      location: "Location",
      owner: "Owner",
      services: "Services",
      actions: "Actions",
      price: "Price",
      view: "View",
      pay: "Pay",
      date: "Date",
      createHotel: "Create Hotel",
      createService: "Create Service",
      currency: "$",
      currencyMultiplier: 1,
      faqFirstQuestion: "How to see all payments by specific hotel ?",
      faqFirstAnswer: "It's only available if you are an owner of that hotel. You can see all payments by going into favourites, and clicking the button with matching label.",
      faqSecondQuestion: "Why can't I remove the hotel from my favourites ?",
      faqSecondAnswer: "If you are an owner, it's impossible due to system architecture.",
      faqThirdQuestion: "How can I edit info about my hotels?",
      faqThirdAnswer: "Go to Favourite hotels.  Double click on the cell you want to edit, then press save button."
   },
   ua: {
      name: "Назва",
      location: "Місцезнаходження",
      owner: "Власник",
      services: "Послуги",
      actions: "Дії",
      price: "Ціни",
      view: "Подивитися",
      pay: "Оплатити",
      date: "Дата",
      createHotel: "Створити Готель",
      createService: "Створити Послугу",
      currency: "₴",
      currencyMultiplier: 40,
      faqFirstQuestion: "Як переглянути всі платежі по конкретному готелі?",
      faqFirstAnswer: "Це доступно, лише якщо ви є власником цього готелю. Ви можете переглянути всі платежі, перейшовши у улюблені готелі та натиснувши кнопку з відповідним ярликом.",
      faqSecondQuestion: "Чому я не можу видалити готель з вибраного?",
      faqSecondAnswer: "Якщо ви власник, це неможливо через архітектуру системи.",
      faqThirdQuestion: "Як я можу редагувати інформацію про мої готелі?",
      faqThirdAnswer: "Перейти до улюблених готелів. Двічі клацніть клітинку, яку потрібно редагувати, а потім натисніть кнопку зберегти."
   },
   en: {
      name: "Name",
      location: "Location",
      owner: "Owner",
      services: "Services",
      actions: "Actions",
      price: "Price",
      view: "View",
      pay: "Pay",
      date: "Date",
      createHotel: "Create Hotel",
      createService: "Create Service",
      currency: "$",
      currencyMultiplier: 1,
      faqFirstQuestion: "How to see all payments by specific hotel ?",
      faqFirstAnswer: "It's only available if you are an owner of that hotel. You can see all payments by going into favourites, and clicking the button with matching label.",
      faqSecondQuestion: "Why can't I remove the hotel from my favourites ?",
      faqSecondAnswer: "If you are an owner, it's impossible due to system architecture.",
      faqThirdQuestion: "How can I edit info about my hotels?",
      faqThirdAnswer: "Go to Favourite hotels.  Double click on the cell you want to edit, then press save button."
   }
};

const languageSlice = createSlice({
   name: 'isEnglish',
   initialState,
   reducers: {
      setLanguage: (state, action) => {
         const english = {...state.en};
         const ukrainian = {...state.ua};
        return {...state, bool: action.payload, current: action.payload ? english : ukrainian}
      }
   }

})

export const {setLanguage} =  languageSlice.actions;

export const languageReducer = languageSlice.reducer
