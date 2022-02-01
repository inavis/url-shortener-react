
import { useHistory } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Formik,useFormik } from 'formik';
import * as yup from 'yup';
//using formik and yup for form validation and handling
import Cookies from 'js-cookie'

const validateForm =yup.object({ 
    email:yup.string().required() , 
    password:yup.string().required().min(8)
        }
  )
  
    

export function Login(){

    
  const history = useHistory();

  const [error,seterror]=React.useState("");
  const [visible,setvisible]=React.useState(false);
  const style1 = (visible)?{display:"block"}:{display:"none"};


    const login =(values) =>{
        console.log("On submit value",values);
        fetch(`https://node-url-shortener-100.herokuapp.com/users/login`,{
            // mode: 'no-cors', // 'cors' by default
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
            console.log(res)
          setvisible(true);
          console.log(res.message);
          if(res.message==="successful login")
          {
            history.push("/Welcome");
            Cookies.set(`login-token-node`, res.token,{ expires: 1 })
           // console.log("cookie",Cookies.get('login-token-node'))
          }else{
            seterror(res.message)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{ email:"",password:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        console.log("On submit value",values);
        login(values)
        }
    })

    //Check if cookie already exists then can route to application directly
    //cookie is set to expire after 1 day
    if(Cookies.get('login-token-node')){
      history.push("/Welcome")
    }

    return(
      <div>
            <div className='box'>
        <div className='header'>Login</div>
        <form onSubmit={handleSubmit}>
            <br></br>
        <div  style={style1} >
          <div className="message">
              {error}
          </div>
        </div>
        <br></br>
       <div>
       <TextField id="filled-basic" className="textbox" label="Username" variant="filled" required
           id='email'
           name='email'
           value={values.email}
           onChange={handleChange}
           onBlur={handleBlur}
           error={touched.email && errors.email} //textfield becomes red in coor if validation failes
           helperText={touched.email && errors.email ? errors.email :""} //it display small message below
        />
       </div>
      <br></br>

     <div>
     <TextField id="filled-basic" className="textbox" type="password" label="Password" variant="filled" required
           id='password'
           name='password'
           value={values.password}
           onChange={handleChange}
           onBlur={handleBlur}
           error={touched.password && errors.password} //textfield becomes red in coor if validation failes
           helperText={touched.password && errors.password ? errors.password :""} //it display small message below
        />
     </div>
      <br></br>

        <div>
        <Button variant='contained' className='textbox' type="submit" style={{background:"lightslategray"}} >
        Login
      </Button>
        </div>
      <br></br>
      <div style={{display:"flex"}}>
        <span style={{marginRight:"auto",paddingLeft:"8%"}} onClick={()=>{
          history.push("/Signup")
        }} className="link">New user? Sign up</span>
        <span style={{marginLeft:"auto",paddingRight:"8%"}}  onClick={()=>{
          history.push("/ForgotPassword")
        }} className="link">Forgot Password?</span>
      </div>
      <br></br>
        </form>
      </div>
      </div>
    )
  }