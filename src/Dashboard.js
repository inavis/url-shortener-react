import { useState,useEffect } from 'react';
import Cookies from 'js-cookie'
import { Bar } from './Bar';

export function LoadData() {
    const [arr,setarr]=useState(null);

      //can get users information only if we have token in cookie
        const geturls =() => {
            const token=Cookies.get('login-token-node');
            fetch(`https://node-url-shortener-100.herokuapp.com/url`,{
            method:"GET",
            headers:{
                "x-auth-token":token
            }
            })
            .then((data)=>data.json())
            .then((res)=>{
                setarr(res)
            })
        }

        useEffect(geturls,[]);
        //console.log("arr",arr)

        return  (arr)?<Dashboard arr={arr}/>:""        
}


 function Dashboard({arr}) {
 
  // const arr2= arr.filter((ele)=>{
  //   console.log(ele.date)
  //   if(ele.date){
  //    var date1 = new Date(ele.date);

  //    const currentdate = new Date();
  //    var date2 = new Date(`${currentdate.getMonth()+1}/${currentdate.getDate()}/${currentdate.getFullYear()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`)
  
  //    var hh = Math.floor((date2.getTime() - date1.getTime()) / 1000 / 60 / 60);
  //    console.log("difference in hours",hh)

  //    if(hh<=24)return ele;
  //   }
  // })
  
  const count1 =  arr.reduce((accum,ele)=>{
    console.log(ele.date)
    if(ele.date){

      var date1 = new Date(ele.date)

      const currentdate = new Date(); 
      const datetime = ( (currentdate.getMonth()+1) + "/"
      +  currentdate.getDate()  + "/" 
      + currentdate.getFullYear()) 
      var date2 = new Date(datetime);

      var Difference_In_Days = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);

      // console.log(Difference_In_Days);

      if(Difference_In_Days<=1){
        // console.log("accum",accum)
        accum+=1
      }
    }
    return accum;
  },0)
  console.log(count1);

  const count2 =  arr.reduce((accum,ele)=>{
    console.log(ele.date)
    if(ele.date){

      var date1 = new Date(ele.date)

      const currentdate = new Date(); 
      const datetime = ( (currentdate.getMonth()+1) + "/"
      +  currentdate.getDate()  + "/" 
      + currentdate.getFullYear()) 
      var date2 = new Date(datetime);

      var Difference_In_Days = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);

      // console.log(Difference_In_Days);

      if(Difference_In_Days<=30){
        // console.log("accum",accum)
        accum+=1
      }
    }
    return accum;
  },0)
  console.log(count2)

  return (
    <div>
        <Bar/>
        <div className='box board color-white bg-gray'>
            <div><h1>{count1}</h1></div>
            <div><h3>Urls per day</h3></div>
        </div>
        <div className='box board color-white bg-gray'>
            <div><h1>{count2}</h1></div>
            <div><h3>Urls per month</h3></div>
        </div>
    </div>
  );
}
