import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonModal,
  IonPage, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import GraficoConsultasRealizadas from "components/GraficoConsultasRealizadas";
import BarraMenu from "components/Menu";
import React, { useState } from "react";
import { useLocalStorage } from "store/useLocalStorage";
const Historico: React.FC = () => {
  const defaultListadoConsultas = require("../../json/mockListadoConsultas.json");
  const [listadoConsultas, setListadoConsultas] = useLocalStorage(
    "consulta",
    defaultListadoConsultas
  );
  const [consultaAbierta, setConsultaAbierta] = useState(false);
  const refrescar = () => {
    window.location.href = window.location.href;
  };
  const cerrarModal = () => {
    setConsultaAbierta(false);
  };
  let totalReal = 0;
  let totalPlacas = 0;

  const calcularTotalReal = () => {
    for (const e of listadoConsultas) {
      totalReal += e.precioReal;
    }
    totalReal = Math.round((totalReal + Number.EPSILON) * 100) / 100;
    return totalReal;
  };
  const calcularTotalPlacas = () => {
    for (const e of listadoConsultas) {
      totalPlacas += e.precioConPlacas;
    }
    totalPlacas = Math.round((totalPlacas + Number.EPSILON) * 100) / 100;
    return totalPlacas;
  };
  let ahorro = calcularTotalReal() - calcularTotalPlacas();
  ahorro = Math.round((ahorro + Number.EPSILON) * 100) / 100;

  return (
    <IonPage>
      <BarraMenu titulo="HISTORICO" />
      <IonContent>
      <IonButton
        onClick={() => {
          setConsultaAbierta(true);
        }}
        expand="full"
      >
        RESUMEN
      </IonButton>
      <IonButton
        onClick={refrescar}
        expand="full"
      >
        ACTUALIZAR DATOS
      </IonButton>
      <IonModal
        isOpen={consultaAbierta}
        onDidDismiss={cerrarModal}
        breakpoints={[0, 0.2, 0.75, 1]}
        initialBreakpoint={0.75}
        backdropBreakpoint={0.2}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">DESGLOSE</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard color="verde">
            <IonCardHeader>
              <IonCardSubtitle color="dark">
                A continuación, se muestran los totales
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardTitle color="light" className="ion-margin">
              <IonGrid fixed={true}>
                <IonRow className="ion-text-center ion-padding">
                  <IonCol>COSTE ACUMULADO SIN PLACAS</IonCol>
                  <IonCol>COSTE ACUMULADO CON PLACAS</IonCol>
                </IonRow>
                <IonRow className="ion-text-center ion-padding">
                  <IonCol>{totalReal} €</IonCol>
                  <IonCol>{totalPlacas} €</IonCol>
                </IonRow>
              </IonGrid>
            </IonCardTitle>
            <IonCardSubtitle
              color="light"
              className="ion-margin ion-text-center"
            >
              HELIOS SOLAR FOTOVOLTAICA PUEDE AHORRARTE HASTA
              <IonCardTitle className="ion-text-center ion-padding">
                {ahorro}€
              </IonCardTitle>
            </IonCardSubtitle>
          </IonCard>
        </IonContent>
      </IonModal>

      <GraficoConsultasRealizadas  />
      </IonContent>
     
    </IonPage>
  );
};
export default Historico;
