import * as React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";
import ListComponent from "../components/List";
import LateralMenu from "../components/LateralMenu";

import {useContext} from 'react';
import { StoreContext } from '../store/StoreProvider';
import { types } from '../store/StoreReducer';

import {Button} from '@material-ui/core';
import AddPatient from '../components/AddPatient';
import AddDoctor from '../components/AddDoctor';
import AddPersonal from '../components/AddPersonal';
import AddConsult from '../components/AddConsult';
import AddDepartment from '../components/AddDepartment';
import EditDoctor from '../components/EditDoctor';

 
function GestionCentro() {
    
  //Para obtener el user y el valor booleano de las listas(para saber cual pasar al componente ListComponent) y de las variables controlan que formulario para agregar y editar mostrar, todo esto lo obtengo del contexto
  const [store, dispatch] = useContext(StoreContext);
  const{user}=store;
  const{listapac}=store;
  const{listasan}=store;
  const{listaper}=store;
  const{listacon}=store;
  const{listadep}=store;
  const {addpac} = store;
  const {addsan} = store;
  const {addper} = store;
  const {addcon} = store;
  const {adddep} = store;
  const {editpac} = store;
  const {editsan} = store;
  const {editper} = store;
  const {editcon} = store;
  const {editdep} = store;
  //Para controlar los datos de la fila a mostrar en el formulario de edición
  const {row_edit_doctor} = store;

  
  //Para pasar las opciones del menú al header
  const options=[
     user.user
   
    ];      

  
  //Para mostrar y/o ocultar listados de pacientes, sanitarios... 
  const handleListItem=(text)=>{
      
    if(text=="PACIENTES")
    {
      //Actualizar (modificar) el estado global
      dispatch({
        //Defino el tipo de la acción
        type:types.changelistapac,
        //Valor a actualizar en el estado global(si tuviera api paso lo que me de la api), los datos a modificar los envío en payload
        payload:{listapac: true}
      });
    }
    if(text=="SANITARIOS")
    {  dispatch({type:types.changelistasan,  payload:{listasan: true}});}
    if(text=="PERSONAL")
    {  dispatch({type:types.changelistaper,  payload:{listaper: true}});}
    if(text=="CONSULTAS")
    {  dispatch({type:types.changelistacon,  payload:{listacon: true}});}
    if(text=="DEPARTAMENTOS")
    {  dispatch({type:types.changelistadep,  payload:{listadep: true}});}
  }
 
  //Para mostrar el formulario de agregar en dependencia del listado que este mostrando
  const handleClickNew=()=>{
      if(listapac.listapac==true){
        dispatch({type:types.changeaddpac,  payload:{addpac: true}});
      
     // navigate("/gestion-centro/nuevo-paciente");
    }
    else if(listasan.listasan==true){
      dispatch({type:types.changeaddsan,  payload:{addsan: true}});
    }
    else if(listaper.listaper==true){
      dispatch({type:types.changeaddper,  payload:{addper: true}});
      
    }
    else if(listacon.listacon==true){
      dispatch({type:types.changeaddcon,  payload:{addcon: true}});
    }
    else if(listadep.listadep==true){
      dispatch({type:types.changeadddep,  payload:{adddep: true}});
    }
  }
  
   
  //Para mostrar el formulario de editar en dependencia del listado que este mostrando para modificar un elemento de la lista, lo paso
  // a traves de los componentes listComponent a CustomizedTables para poder obtener los parametros
  //que necesito(la fila de la lista que quiero modificar y el nombre de la lista a la que pertence dicha fila)
  const handleModify=(row,list_name)=>{
    console.log("entre a handlemodify")
    console.log(row)
    console.log(row_edit_doctor)
    if(list_name=="sanitarios"&&listasan.listasan==true){
       console.log("entre al if del handlemodify")
        dispatch({type:types.changeeditsan,  payload:{editsan: true}});
        dispatch({type:types.change_row_edit_doctor,  payload:{row_edit_doctor: row}});
     }
  
  }
    return (
     
    <div className="App">
       <header>
          <Header options={options}/>        
       </header>
           
     
      {/**Renderizado del menú lateral, paso la funcion handleListItem para que este componente hijo LateralMenu modifique sus parametros de acuerdo al onclick*/}
        <LateralMenu handleListItem={handleListItem}/>
    
      
      <main className="main-container">
        <section>
        <article>
       {listapac|| listasan|| listaper|| listacon|| listadep?
        <div  className="button-new">
          <Button  onClick={handleClickNew} variant="contained" color="primary">Nuevo</Button>
         
        </div>
        :null
        }

        {listapac.listapac==true?<ListComponent listar="Pacientes" />:
        listasan.listasan==true?<ListComponent listar="Sanitarios" handleModify={handleModify}/>:
        listaper.listaper==true?<ListComponent listar="Personal" />:
        listacon.listacon==true?<ListComponent listar="Consultas"/>:
        listadep.listadep==true?<ListComponent listar="Departamentos"/>:
        <p> Seleccione una opción del menú </p>
        }
        </article>
        <article>
        {
          addpac.addpac==true?<AddPatient/>:
          addsan.addsan==true?<AddDoctor/>:
          addper.addper==true?<AddPersonal/>:
          addcon.addcon==true?<AddConsult/>:
          adddep.adddep==true?<AddDepartment/>:
          null
        }
        </article>
        <article>
        {
          editsan.editsan==true?<EditDoctor/>:         
          null
        }
        </article>
    
        </section>
      </main>
        
      <footer>
        <Footer/>
      </footer>
      </div>
      
    );
  }
  
  export default GestionCentro;
  