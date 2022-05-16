import {
  IonContent,
  IonPage
} from "@ionic/react";

import React from "react";
import ExampleGraphic from "components/GraficoEjemplo";
import BarraMenu from "components/Menu";

const Comparativa: React.FC = () => {
  return (
    <IonPage>
      <BarraMenu titulo="COMPARATIVA" />
      <IonContent className="ion-padding">
        <ExampleGraphic />
      </IonContent>
    </IonPage>
  );
};
export default Comparativa;
