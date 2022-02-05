import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Bar } from './Bar';

const validateForm =yup.object({ 
    longurl:yup.string().required().min(8)
        }
  )

export function GenerateUrl() {

    const history = useHistory();

    //adding date,long,short url to database
    const addurl =(values) =>{
        console.log("addurl")
        fetch(`https://node-url-shortener-100.herokuapp.com/url/add`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
            console.log(res)
            history.push("/geturl")
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    //get short from long url
    const generateshorturl =(values) =>{
        console.log("reset",values);
         // new Date object
         const currentdate = new Date(); 
         const datetime = (currentdate.getDate() + "/"
         + (currentdate.getMonth()+1)  + "/" 
         + currentdate.getFullYear()) 
        //  + " "  
        //  + currentdate.getHours() + ":"  
        //  + currentdate.getMinutes() + ":" 
        //  + currentdate.getSeconds()); 

        fetch(`https://node-url-shortener-100.herokuapp.com/url/shorturl`,{
          method:"POST",
          body: JSON.stringify(values),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((data)=>data.json())
        .then((res)=>{
            console.log(res.short_url)
            addurl({date:datetime,longurl:values.longurl,shorturl:res.short_url})
        })
        .catch((err)=>{
          console.log(err)
        })
      }

      

    const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
        initialValues:{ longurl:""},
        validationSchema:validateForm,
        onSubmit:(values) =>{
        console.log("On submit value",values);
        generateshorturl({"longurl":values.longurl})
        }
    })

    return(
       <div>
            <Bar/>
        
            <div className='box'>

            <form onSubmit={handleSubmit}>
                <br></br>
                <div>
                    <TextField className="textbox"  label="Long URL" variant="filled" required
                        id='longurl'
                        name='longurl'
                        value={values.longurl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.longurl && errors.longurl} //textfield becomes red in coor if validation failes
                        helperText={touched.longurl && errors.longurl ? errors.longurl :""} //it display small message below
                        />
                </div>
            <br></br>

                <div>
                    <Button variant='contained' className='textbox' type="submit" style={{background:"lightgreen"}} >
                        Get Short URL
                    </Button>
                </div>
                <br></br>
            </form>
            
            </div>
       </div>
    )
}
