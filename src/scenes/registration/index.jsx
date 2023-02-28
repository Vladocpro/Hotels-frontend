import React from 'react';
import Typography from "@mui/material/Typography";
import styles from "./Registration.module.css";
import {inputLabelClasses} from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import {useDispatch,useSelector} from "react-redux";
import {fetchAuth,fetchRegister,selectIsAuth} from "../../redux/slices/auth";
import {tokens,useMode} from "../../theme";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FormControl,InputLabel,MenuItem,Paper,Select,SelectChangeEvent,styled} from "@mui/material";
import TextField from "@mui/material/TextField";
import {setLanguage} from "../../redux/slices/language";

const Registration = () => {
   const languageSelector= useSelector(state => state.isEnglish)



   const dispatch = useDispatch();
   let navigate = useNavigate()

   const {register, handleSubmit,   formState: {errors, isValid}} = useForm({
      defaultValues: {
         firstName: '',
         secondName: '',
         email: '',
         password: '',
      },
      mode: 'onChange'
   })
   const onSubmit = async (values) => {
      values = {...values, role}
      const data = await dispatch(fetchRegister(values))
      if(data?.meta.requestStatus == "rejected"){alert('The email is already taken'); return; }
      if(!data.payload) {alert('Unable to register account'); return; }
      if('token' in data.payload) window.localStorage.setItem('token', data.payload.token)
      navigate("/")
   }


   const [role, setRole] = React.useState('');

   const handleChange = (SelectChangeEvent) => {
      setRole(SelectChangeEvent.target.value);
      console.log(SelectChangeEvent.target.value)
   };




   return (
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "100px auto 0px auto",
             maxWidth: "500px"
          }}>
             <Typography  variant="h5" className={styles.title}>
                {languageSelector.bool ? "Create account" : "Створити обліковий запис"}
             </Typography>
             <form
                 onSubmit={handleSubmit(onSubmit)}
             >
                <TextField
                    label={languageSelector.bool ? "First Name" : "Ім`я"}
                //autoFocus
                    InputLabelProps={{
                       sx: {
                          [`&.${inputLabelClasses.shrink}`]: {
                             // set the color of the label when shrinked (usually when the TextField is focused)
                             color: "#6BBCC9"
                          }
                       }
                    }}
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
                    error={!!errors?.firstName}
                    helperText={errors?.firstName ? errors.firstName?.message : null}
                    {...register('firstName', {required: 'Specify first name', minLength: {
                          value: 2,
                          message: "At least 2 characters"
                       }})}
                    fullWidth
                />
                <TextField
                    label={languageSelector.bool ? "Second Name" : "Прізвище"}
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
                    error={!!errors?.secondName}
                    helperText={errors?.secondName ? errors.secondName?.message : null}
                    {...register('secondName', {required: 'Specify second name', minLength: {
                          value: 2,
                          message: "At least 2 characters"
                       }})}
                    fullWidth
                />
                <TextField
                    label={languageSelector.bool ? "E-Mail" : "Електронна пошта"}
                    //autoFocus
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

                    InputLabelProps={ {
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
                    {...register('email', {required: 'Specify email', pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                       }})}
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
                    label={languageSelector.bool ? "Password" : "Пароль"}
                    fullWidth
                    error={!!errors?.password}
                    type="password"
                    helperText={errors?.password ? errors.password?.message : null}
                    {...register('password', {required: 'Specify password', minLength: {
                          value: 5,
                          message: "At least 5 characters"
                       }})}
                    //autoFocus

                />
                <FormControl fullWidth sx={{marginBottom: "20px !important"}} >
                   <InputLabel id="demo-simple-select-label"
                               sx={{
                                  '&.Mui-focused ' : {
                                     color:'#6BBCC9'
                                  }
                   }}>{languageSelector.bool ? "Role" : "Роль"}</InputLabel>
                   <Select
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       value={role}
                       label={languageSelector.bool ? "Role" : "Роль"}
                       onChange={handleChange}
                       sx={{
                          // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          //    borderColor: '#6BBCC9',
                          // },
                          '.MuiOutlinedInput-notchedOutline': {
                             borderColor: '#4A505E',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                             borderColor: '#6BBCC9',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                             borderColor: '#60A9B5',
                          }
                       }}
                   >
                      <MenuItem value="Hotel Owner">{languageSelector.bool ? "Hotel Owner" : "Власник Готелю"}</MenuItem>
                      <MenuItem value="Hotel Resident">{languageSelector.bool ? "Hotel Resident" : "Житель Готелю"}</MenuItem>
                   </Select>
                </FormControl>
                <Button
                    disabled={!isValid || role == ""}
                    type="submit" size="large" variant="contained" fullWidth sx={{backgroundColor: "black"}}>
                   {languageSelector.bool ? "Sign up" : "Зареєструватись"}
                </Button>

                <Button
                    size="large"
                    fullWidth
                    sx={{marginTop: "20px", backgroundColor: "black", color: "white", textAlign: "center", alignSelf: "center", padding: "6px 0", cursor: "pointer", "&:hover": {color: "black", backgroundColor: "#F2F2F2"}}}
                    onClick={()=> navigate("/login")}
                >
                   {languageSelector.bool ? "Back to log in" : "Повернутися до входу"}
                </Button>
             </form>
          </div>

   );
};

export default Registration;
