import {
  IonContent,
  IonPage,
} from "@ionic/react";
import { ButtonPlus } from "components/ButtonPlus";
import ConsejoTag from "components/ConsejoTag";
import BarraMenu from "components/Menu";
import React, { useState } from "react";
const Consejo: React.FC = () => {
  const [progreso, setProgreso] = useState(0.1);
  const aumentarProgreso = () => {
    let aumento = progreso + 0.1;
    setProgreso(aumento);
  };
  return (
    <IonPage>
      <BarraMenu titulo="CONSEJO"/>
      <IonContent fullscreen={true} className="ion-align-items-center">
        <ConsejoTag fecha="22/04/2022" titulo="CONSEJO ARBITRARIO" imagen="/assets/img/consejo.jpg" descripcion="Esta es una descripción estática"/>
      </IonContent>
      <ButtonPlus />
    </IonPage>
  );
};
export default Consejo;
