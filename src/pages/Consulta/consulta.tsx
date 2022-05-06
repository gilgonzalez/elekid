import {

    IonPage
  } from "@ionic/react";
import BarraMenu from "components/Menu";
  import React, {useEffect, useState} from "react";
  const Consulta: React.FC = () => {
    const [data, setData] = useState([]);
    useEffect(() =>{
      const getUsers = async () =>{
        const response = await fetch("https://api.preciodelaluz.org/v1/prices/cheapests?zone=PCB&n=2",  { mode: 'no-cors'})
        const data = await response.json();
          setData(data)
      };
      getUsers().catch(null);
    },[])
    
    return (
      <IonPage>
        <BarraMenu titulo="CONSULTA"/>
     
        <p>DISTINTOS TIPOS DE CONSULTAS SE PODRÁN HACER ES APARTADO</p>
        <div>
          
        </div>
        <ul>
            <li>Todos los precios de la zona https://api.preciodelaluz.org/v1/prices/all?zone=PCB </li>
            <li>Precio promedio de la zona https://api.preciodelaluz.org/v1/prices/avg?zone=PCB </li>
            <li>Precio más alto https://api.preciodelaluz.org/v1/prices/max?zone=PCB</li>
            <li>Precio más bajo y hora https://api.preciodelaluz.org/v1/prices/min?zone=PCB</li>
            <li>Precio en el momento actual https://api.preciodelaluz.org/v1/prices/now?zone=PCB</li>
            <li>Horas más económicas https://api.preciodelaluz.org/v1/prices/cheapests?zone=PCB&n=2</li>
        </ul>
      </IonPage>
    );
  };
  export default Consulta;