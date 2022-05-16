import { IonContent, IonPage } from "@ionic/react";

import React, { useEffect } from "react";
import ExampleGraphic from "components/GraficoEjemplo";
import BarraMenu from "components/Menu";
import { useAppDispatch } from "store/store";
import { getDatos } from "pages/Consulta/consultaSlice";

const Comparativa: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDatos());
    console.log("fetc");
  }, [dispatch]);

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
