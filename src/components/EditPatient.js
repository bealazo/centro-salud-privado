import * as React from 'react';
import {Box} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import { Grid } from '@material-ui/core';

import {useContext} from 'react';
import { StoreContext } from '../store/StoreProvider';
import { types } from '../store/StoreReducer';


function EditPatient(){
   
   //Para obtener el estado global, en este caso la lista de pacientes actual
   const [store, dispatch] = useContext(StoreContext);
   const{pacientes}=store;
   const{editpac}=store;
   //Para obtener los datos de la fila a mostrar en el formulario de edición
   const {row_edit_pac} = store;
  
    //Guardo el dni inicial para hacer la búsqueda del elemento a modificar en la lista
     const dni_initial= row_edit_pac.dni;
   //Variables iniciales para guardar los valores de los inputs
   const [dni_value, setDniValue] = React.useState(row_edit_pac.dni);
   const [name_value, setNameValue] = React.useState(row_edit_pac.nombre);
   const [phone_value, setPhoneValue] = React.useState(row_edit_pac.telefono);
   const [lastname_value, setLastNameValue] = React.useState(row_edit_pac.apellidos);
   const [num_seg_soc, setNumSegSocValue] = React.useState(row_edit_pac.numero_seguridad_social);
   const [cod_hist_cli, setCodHistCliValue] = React.useState(row_edit_pac.codigo_historia_clinica);
 
   //Cambio el estado inicial del input correspondiente
   const handleChangeDni = (event) => {
     setDniValue(event.target.value);
   };
   const handleChangeName = (event) => {
       setNameValue(event.target.value)
    
   };
   const handleChangeLastname = (event) => {
   setLastNameValue(event.target.value);
   };
   const handleChangePhone = (event) => {
    setPhoneValue(event.target.value);
   };
   const handleChangeNumSeg = (event) => {
    setNumSegSocValue(event.target.value);
   };
   const handleChangeCodHist = (event) => {
    setCodHistCliValue(event.target.value);
   };
 

   //Editar el elemento de la lista de pacientes
   const handleClickSave=()=>{   
   pacientes.map(item=>
        {if(item.dni==dni_initial)
            {
                console.log(name_value)
              item.dni= dni_value;
              item.nombre= name_value;
              item.apellidos=lastname_value;
              item.telefono=phone_value;
              item.numero_seguridad_social=num_seg_soc;
              item.codigo_historia_clinica=cod_hist_cli;
             
            }         

        });
       
        //envio la accion en el payload al store reducer para modificar el estado global
        //OJO: ME SIRVE EL MISMO TIPO QUE PARA AÑADIR NUEVOS ITEMS A LA LISTA, PUESTO QUE LA ACCION PARA ESE TIPO ES MODIFICAR EL LISTADO EXISTENTE SUSTITUYENDOLO 
        //CON EL NUEVO LISTADO PASADO
        dispatch({type:types.addsanlistapac,  payload:{pacientes:pacientes}});

        //Oculto el formulario
        dispatch({type:types.changeeditpac,  payload:{editpac:false}});

 
 }
 const handleClickCancel=()=>{   

        //Oculto el formulario
        dispatch({type:types.changeeditpac,  payload:{editpac:false}});

 }
 
 

   return(

     <div className="container-table">
         <Typography variant="h6">
         Editar paciente seleccionado
       </Typography>
       <Box
         component="form"
        
       >    <Grid className="containter-form-addpatient-inputs-pc" item xs={12}>

            <Grid item xs={2}>
            <TextField value={dni_value} onChange={handleChangeDni} required id="outlined-basic" label="Dni" variant="outlined" />
            </Grid>
            <Grid item xs={2}>
            <TextField  value={name_value} onChange={handleChangeName} required id="outlined-basic" variant="outlined" />
            </Grid>
            <Grid item xs={2}>
            <TextField  value={lastname_value} onChange={handleChangeLastname} required id="outlined-basic" label="Apellidos" variant="outlined" />
            </Grid>
            
            </Grid>
           
            <Grid className="containter-form-addpatient-inputs-pc" item xs={12}>

             <Grid item xs={2}>
             <TextField  value={phone_value} onChange={handleChangePhone} id="outlined-basic" label="Teléfono" variant="outlined" />
             </Grid>
             <Grid item xs={2}>
             <TextField   value={num_seg_soc} onChange={handleChangeNumSeg} required id="outlined-basic" label="Número seguridad social" variant="outlined" />
             </Grid>
             <Grid item xs={2}>
             <TextField  value={cod_hist_cli} onChange={handleChangeCodHist} required id="outlined-basic" label="Código historia clínica" variant="outlined" />
             </Grid>

             </Grid>

          
             <Grid className="containter-form-addpatient-inputs-movil" item xs={12}>

             <Grid className="containter-form-addpatient-inputs-item-movil" item xs={12}>
             <TextField  value={dni_value} onChange={handleChangeDni} required id="outlined-basic" label="Dni" variant="outlined" />
             </Grid>
             <Grid className="containter-form-addpatient-inputs-item-movil" item xs={12}>
             <TextField  value={name_value} onChange={handleChangeName} required id="outlined-basic" label="Nombre" variant="outlined" />
             </Grid>
             <Grid className="containter-form-addpatient-inputs-item-movil" item xs={12}>
             <TextField   value={lastname_value} onChange={handleChangeLastname} required id="outlined-basic" label="Apellidos" variant="outlined" />
             </Grid>

             <Grid className="containter-form-addpatient-inputs-item-movil" item xs={12}>
             <TextField  value={phone_value} onChange={handleChangePhone}  id="outlined-basic" label="Teléfono" variant="outlined" />
             </Grid>
             <Grid className="containter-form-addpatient-inputs-item-movil" item xs={12}>
             <TextField   value={num_seg_soc} onChange={handleChangeNumSeg} required id="outlined-basic" label="Número seguridad social" variant="outlined" />
             </Grid>
             <Grid className="containter-form-addpatient-inputs-item-movil" item xs={12}>
             <TextField   value={cod_hist_cli} onChange={handleChangeCodHist} required id="outlined-basic" label="Código historia clínica" variant="outlined" />
             </Grid>
           
             </Grid>
             <Grid className="group-button-form" item xs={12}>

              <Grid item xs={5}>
              <div className="button-form">              
              <Button  onClick={handleClickCancel} variant="contained" color="info">Cancelar</Button>
              </div>
              </Grid>
              <Grid item xs={5}>
              <div  className="button-form">    
              <Button  onClick={handleClickSave} variant="contained" color="primary">Guardar</Button>    
          
              </div>
              </Grid>
             
              </Grid>

           
     </Box>
    </div>
   );
}
export default EditPatient;