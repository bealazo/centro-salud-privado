import * as React from 'react';
import '../App.css';
import { useState } from 'react';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';


function Header(){

     //Opciones del Menú
     const options = [
        "Quiénes Somos",
        "Contacto",
        "Login"
     ];

     //Despliegue menú en movil
        const [anchorEl, setAnchorEl] = useState(null);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

 

    return(

      <div className="App-header">
      <Grid item xs={2}>
      <Icon fontSize="large">medical_information</Icon>
      </Grid>

        <Grid className="menu-container" item xs={10}>

        {options.map((option,index) =>        
        <Grid key={index} item xs={2}>
        <Link href="#" color="inherit"> {option} </Link>
        </Grid>)}     
            
        </Grid>
      

    <Grid className="menu-movil-container" item xs={10}>
      <Button
        aria-haspopup="true"
        aria-controls="simple-menu"       
        color="inherit"
        onClick={handleClick}

      >
        <Icon>list</Icon>
      </Button>
      <Menu
         id="simple-menu"
         anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}       
      >
          {options.map((option,index) =>   
          <MenuItem key={index}>{option}</MenuItem>        
          )} 
      </Menu>
    
    </Grid>
    </div>
    );

}

export default Header;