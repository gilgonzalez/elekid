import {
  IonContent,
  IonPage,
} from "@ionic/react";
import Menu from "components/Menu";
import React, { useState } from "react";
const About: React.FC = () => {
  return (
    <IonPage>
     <Menu titulo="AGREGAR ELECTRODOMESTICO"/>
      <IonContent></IonContent>
    </IonPage>
  );
};
export default About;
