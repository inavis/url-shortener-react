import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from "react";

export function ConfirmUser() {
  const { sid } = useParams();
  console.log(sid);
  const values = { "url":`http://localhost:3000/confirmation/${sid}` };
  let [message,setmessage]=useState("");


  const confirmemail = (values) => {
    console.log("confirm", values);
    fetch(`https://node-url-shortener-100.herokuapp.com/users/confirm`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res.acknowledged)
        message= (res.acknowledged===true) ? setmessage("User confirmed. Can login now") : setmessage(res.message);
        // console.log("message",message)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <div style={{textAlign:"center"}}>
      <div>
          <Button variant='contained' className='textbox'  style={{background:"lightslategray"}} 
            onClick={()=>{
              confirmemail(values);
            }}
            >
            Confirm Account
          </Button>
      </div>
      <br></br>
      <div className="color-white">
            {
              message
            }
      </div>
    </div>
  );
}
