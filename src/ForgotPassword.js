import { useHistory } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

//using formik and yup for form validation and handling


const validateForm =yup.object({ 
    email:yup.string().required() 
        }
  )
  

export function ForgotPassword() {

    const history = useHistory();

    const [error,seterror]=React.useState("");
    const [visible,setvisible]=React.useState(false);
    const style1 = (visible)?{display:"block"}:{display:"none"};

    const sendemail =(values) =>{
        console.log("forgot password");
        console.log(values)
        fetch(`https://node-url-shortener-100.herokuapp.com/users/forgot-password`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
          setvisible(true);
          console.log(res);
          seterror(res.message)
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{ email:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        console.log("On submit value",values);
        sendemail(values)
        }
    })

  return (
    <div>
       <div className='box'>
        <div className='header'>Forgot Password</div>
        <form onSubmit={handleSubmit}>
            <br></br>
        <div  style={style1} >
          <div className="message">
              {error}
          </div>
        </div>
        <br></br>
       <div>
       <TextField  className="textbox" label="Username" variant="filled" required
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
        <Button variant='contained' className='textbox' type="submit" style={{background:"lightgreen"}} >
        Send Email
      </Button>
        </div>
      <br></br>
      <div style={{display:"flex"}}>
        <span style={{marginRight:"auto",paddingLeft:"8%"}} onClick={()=>{
          history.push("/Login")
        }} className="link">Already a user? Sign in</span>
        <span style={{marginLeft:"auto",paddingRight:"8%"}}  onClick={()=>{
          history.push("/Signup")
        }} className="link">Create new account</span>
      </div>
      <br></br>
        </form>
      </div>
    </div>
  );
}
