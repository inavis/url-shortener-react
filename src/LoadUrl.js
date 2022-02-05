import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { useState,useEffect } from 'react';
import Cookies from 'js-cookie'
import { Bar } from './Bar';


//Getting the url data
export function LoadUrl() {
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

        return  (arr)?<TableDisplay arr={arr}/>:""        
}

//Once url data is loaded we display the table
function TableDisplay({arr}){


    console.log("arr",arr)
    return (
        <div>
            <Bar/>
        
            <div className='table'>
        
            {/* <Button variant="contained" style={{width:"100%",textAlign:"center"}}
            onClick={()=>history.goBack()}>Go Back</Button>
                <br></br> */}
        
                    <Paper >
                        <TableContainer style={{ background: "darkgreen",border:"7px solid white" }} >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Date</TableCell>
                                <TableCell >Long Url</TableCell>
                                <TableCell>Short Url</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {
                                    arr.map(({date,longurl,shorturl})=>{
                                        // console.log(longurl,shorturl)
                                    return <TableContent key={shorturl}  longurl={longurl} shorturl={shorturl} date={date}/>
                                    })
                                }
                        </TableBody>
                        </Table>
                        </TableContainer>
                    </Paper>
            </div>
        </div>
    )

}

//To display rows of table
function TableContent({longurl,shorturl,date}){
    // console.log("table-content",longurl,shorturl)

    //for previous data date not available so adding NA for that
    date = (date)?date:"NA"

    return(
        <TableRow  > 
              <TableCell  align="left" style={{wordBreak:"break-all"}}>{date}</TableCell>
              <TableCell align="left" style={{wordBreak:"break-all"}}>{longurl}</TableCell>
              <TableCell align="left" style={{wordBreak:"break-all"}}>{shorturl}</TableCell>
        </TableRow>
    )
  }
