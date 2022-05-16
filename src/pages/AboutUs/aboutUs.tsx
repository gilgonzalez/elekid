import {
  IonContent,
  IonLabel,
  IonPage,
} from "@ionic/react";
import Menu from "components/Menu";
import React from "react";
const About: React.FC = () => {
  
  return (
    <IonPage>
     <Menu titulo="INFORMACIÓN ADICIONAL"/>
      <IonContent>
        <IonLabel >LUGAR DONDE IRÁ EL PDF CON EL MANUAL DE USUARIO</IonLabel>
      </IonContent>
    </IonPage>
  );
};
export default About;
