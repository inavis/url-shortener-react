import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export function Bar() {
    const history= useHistory()
  return (
    <AppBar position="static" style={{ background: "darkgreen" }}>
      {/* When signout the cookie is removed */}
      <Toolbar>

      <Button color="inherit" style={{ marginRight: "auto" }} onClick={() => history.push("/dashboard")}>
          Dashboard
        </Button>

        {/* If cookie is there with that one can get all users list */}
        <Button color="inherit" style={{ marginRight: "auto" }} onClick={() => history.push("/geturl")}>
          GET URLs
        </Button>

        <Button color="inherit" style={{ marginRight: "auto" }} onClick={() => history.push("/generateurl")}>
          Generate URL
        </Button>

        <Button color="inherit" onClick={() => {
          Cookies.remove('login-token-node');
          history.push("/Login");
        }}
        >Sign out</Button>

      </Toolbar>
    </AppBar>
  );
}
