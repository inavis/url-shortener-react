import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Formik,useFormik } from 'formik';
import * as yup from 'yup';

//using formik and yup for form validation and handling

const validateForm =yup.object({ 
    password:yup.string().required().min(8)
        }
  )

export function ResetPassword() {

    const {sid} = useParams();
    console.log(sid);
    ///

    const history = useHistory();

    const [error,seterror]=React.useState("");
    const [visible,setvisible]=React.useState(false);
    const style1 = (visible)?{display:"block"}:{display:"none"};

    const resetpassword =(values) =>{
        console.log("reset",values);
        fetch(`https://node-url-shortener-100.herokuapp.com/users/reset`,{
          method:"PUT",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
          setvisible(true);
         // console.log(res);
          (res.acknowledged)?history.push("/Login"):seterror(res.message)
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{ password:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        console.log("On submit value",values);
        resetpassword({password:values.password,sid:sid})
        }
    })

  return (
    <div>
         <div className='box'>
        <div className='header'>Change Password</div>
        <form onSubmit={handleSubmit}>
            <br></br>
        <div  style={style1} >
          <div className="message">
              {error}
          </div>
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
            Update Password
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
