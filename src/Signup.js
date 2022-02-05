import { useHistory } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';

//using formik and yup for form validation and handling



const validateForm =yup.object({ 
  firstname:yup.string().required() , 
  lastname:yup.string().required() , 
    email:yup.string().required() , 
    password:yup.string().required().min(8)
        }
  )
  

export function Signup() {

    const history = useHistory();

    const [error,seterror]=React.useState("");
    const [visible,setvisible]=React.useState(false);
    const style1 = (visible)?{display:"block"}:{display:"none"};

    const adduser =(values) =>{
        console.log("add");
        fetch(`https://node-url-shortener-100.herokuapp.com/users/signup`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
          setvisible(true);
          console.log(res.acknowledged);
          (res.acknowledged)?history.push("/Login"):seterror(res.message)
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{ email:"",password:"",firstname:"",lastname:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        console.log("On submit value",values);
        adduser(values)
        }
    })

  return (
    <div>
      <div className='box'>
        <div className='header'>Signup</div>
        <form onSubmit={handleSubmit}>
            <br></br>
        <div  style={style1} >
          <div className="message">
              {error}
          </div>
        </div>
        <br></br>

        <div>
       <TextField  className="textbox" label="First Name" variant="filled" required
           id='firstname'
           name='firstname'
           value={values.firstname}
           onChange={handleChange}
           onBlur={handleBlur}
           error={touched.firstname && errors.firstname} //textfield becomes red in coor if validation failes
           helperText={touched.firstname && errors.firstname ? errors.firstname :""} //it display small message below
        />
       </div>
      <br></br>

      <div>
       <TextField  className="textbox" label="Last Name" variant="filled" required
           id='lastname'
           name='lastname'
           value={values.lastname}
           onChange={handleChange}
           onBlur={handleBlur}
           error={touched.lastname && errors.lastname} //textfield becomes red in coor if validation failes
           helperText={touched.lastname && errors.lastname ? errors.lastname :""} //it display small message below
        />
       </div>
      <br></br>

       <div>
       <TextField  className="textbox" label="Email" variant="filled" required
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
     <TextField  className="textbox" type="password" label="Password" variant="filled" required
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
        <Button variant='contained' className='textbox' type="submit" style={{background:"lightgreen"}} >
        Create Account
      </Button>
        </div>
      <br></br>
      <div style={{display:"flex"}}>
        <span style={{marginRight:"auto",paddingLeft:"8%"}} onClick={()=>{
          history.push("/Login")
        }} className="link">Already a user? Sign in</span>
        <span style={{marginLeft:"auto",paddingRight:"8%"}}  onClick={()=>{
          history.push("/ForgotPassword")
        }} className="link">Forgot Password?</span>
      </div>
      <br></br>
        </form>
      </div>
    </div>
  );
}
