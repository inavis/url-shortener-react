import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Bar } from './Bar';
import { useState } from 'react';


const validateForm =yup.object({ 
    shorturl:yup.string().required()
        }
  )

export function GetLongUrl(){

    const [output,setoutput] = useState("")

      //get long from short url
      const getlongurl =(values) =>{
       // console.log("get longurl",values);

        fetch(`https://node-url-shortener-100.herokuapp.com/url/longurl`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
            // console.log(res.long_url.longurl)
            setoutput(`The long url of ${values.sid} is ${res.long_url.longurl}`)
        })
        .catch((err)=>{
          console.log(err)
        })
      }


    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{ shorturl:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
       // console.log("On submit value",values);
        getlongurl({"sid":values.shorturl})
        }
    })

    return (
        <div>

<Bar/>
        
        <div className='box'>

        <form onSubmit={handleSubmit}>
            <br></br>
            <div>
                <TextField className="textbox"  label="Short url / Sid of longurl" variant="filled" required
                    id='shorturl'
                    name='shorturl'
                    value={values.shorturl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.shorturl && errors.shorturl} //textfield becomes red in coor if validation failes
                    helperText={touched.shorturl && errors.shorturl ? errors.longurl :""} //it display small message below
                    />
            </div>
        <br></br>

            <div>
                <Button variant='contained' className='textbox' type="submit" style={{background:"lightgreen"}} >
                    Get Long URL
                </Button>
            </div>
            <br></br>
            <div className='output'>
                {
                    output
                }
            </div>
            <br></br>
        </form>
        
        </div>

           

        </div>
    )
}