import {
  IonButtons,
  IonHeader,
  IonMenuButton,
    IonPage, IonTitle, IonToolbar
  } from "@ionic/react";
  import React, {useState} from "react";
  import Ejemplo from 'components/Ejemplo';
import BarraMenu from "components/Menu";
  const Historico: React.FC = () => {
    
    return (
      <IonPage>
        <BarraMenu titulo="HISTORICO"/>
        <Ejemplo/>
      </IonPage>
    );
  };
  export default Historico;