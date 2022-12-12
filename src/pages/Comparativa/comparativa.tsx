import { IonContent, IonPage } from "@ionic/react";

import React, { useEffect } from "react";
import BarraMenu from "components/Menu";
import { useAppDispatch } from "store/store";
import { getDatos } from "pages/Consulta/consultaSlice";
import GraficoPrecioPorHoras from "components/GraficoPrecioPorHoras";

const Comparativa: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDatos());
  }, [dispatch]);

  return (
    <IonPage>
      <BarraMenu titulo="COMPARATIVA" />
      <IonContent fullscreen={true}>
        <GraficoPrecioPorHoras />
      </IonContent>
    </IonPage>
  );
};
export default Comparativa;
