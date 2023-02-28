import React,{useEffect} from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import styles from "./Login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";
import {Navigate,useNavigate} from "react-router-dom";
import store from "../../redux/store";
import {themeSettings,tokens,useMode} from "../../theme";
import {styled} from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import {setLanguage} from "../../redux/slices/language";

const Login = () => {
   const isAuth = useSelector(selectIsAuth)
   const [theme, colorMode] = useMode();
   const colors = tokens(theme.palette.mode);
   const languageSelector= useSelector(state => state.isEnglish)

   const dispatch = useDispatch();
   let navigate = useNavigate()
   const {register, handleSubmit,  formState: {errors, isValid}} = useForm({
      defaultValues: {
         email: 'vlad@gmail.com',
         password: '12345'
      },
      mode: 'onChange'
   })
   const onSubmit = async (values) => {
      const data = await dispatch(fetchAuth(values))
      if(!data.payload) {
         alert('Incorrect login or password');
         return;
      }
      if('token' in data.payload) window.localStorage.setItem('token', data.payload.token)
      navigate("/")
   }



   return (
       <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "100px"}}>
          <Typography  variant="h5" className={styles.title}>
             {languageSelector.bool ? "Log into account" : "Увійти в обліковий запис"}
          </Typography>
          <form
              style={{maxWidth: "500px"}}
              onSubmit={handleSubmit(onSubmit)}
          >
             <TextField
                 sx={{
                    marginBottom: "20px !important",
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
                 label="E-Mail"
                 InputLabelProps={{
                    sx: {
                       [`&.${inputLabelClasses.shrink}`]: {
                          // set the color of the label when shrinked (usually when the TextField is focused)
                          color: "#6BBCC9"
                       }
                    }
                 }}
                 error={!!errors?.email}
                 helperText={errors?.email ? errors.email?.message : null}
                 type="email"
                 {...register('email', {required: 'Specify email'})}
                 fullWidth
             />
             <TextField
                 sx={{
                    marginBottom: "20px !important",
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
                 InputLabelProps={{
                    sx: {
                       [`&.${inputLabelClasses.shrink}`]: {
                          // set the color of the label when shrinked (usually when the TextField is focused)
                          color: "#6BBCC9"
                       }
                    }
                 }}
                 label="Password" fullWidth
                 type="password"
                 error={!!errors?.password}
                 helperText={errors?.password ? errors.password?.message : null}
                 {...register('password', {required: 'Specify password'})}

             />
             <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth sx={{backgroundColor: "black", fontFamily: "Source Sans Pro,sans-serif", fontWeight: "500"}}>
                {languageSelector.bool ? "Log in" : "Увійти"}
             </Button>
             <Button
                 size="large"
                 fullWidth
                 sx={{marginTop: "20px", backgroundColor: "black", color: "white", textAlign: "center", alignSelf: "center", fontFamily: "Source Sans Pro,sans-serif", fontWeight: "500" , cursor: "pointer", "&:hover": {color: "black", backgroundColor: "#F2F2F2"}}}
               onClick={()=> navigate("/register")}
               >
                {languageSelector.bool ? "Sign up" : "Зареєструватися"}
             </Button>
          </form>
       </div>
   );
};

export default Login;
