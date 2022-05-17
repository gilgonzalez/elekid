import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import BarraMenu from "components/Menu";
import Tarjeta from "components/Tarjeta";
import React from "react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <BarraMenu titulo="HOME" />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6" sizeMd="4" sizeXl="2">
              <Tarjeta
                titulo="CONSULTA"
                ruta="/consulta"
                imagen="/assets/img/iconos/consulta.png"
              />
            </IonCol>
            <IonCol size="6" sizeMd="4" sizeXl="2">
              <Tarjeta
                titulo="GESTIONA"
                ruta="/addElemento"
                imagen="/assets/img/iconos/icon_elect.png"
              />
            </IonCol>

            <IonCol size="6" sizeMd="4" sizeXl="2">
              <Tarjeta
                titulo="GRÁFICO POR HORAS"
                ruta="/comparativa"
                imagen="/assets/img/iconos/grafico.png"
              />
            </IonCol>
            <IonCol size="6" sizeMd="4" sizeXl="2">
              <Tarjeta
                titulo="GRÁFICO HISTÓRICO"
                ruta="/historico"
                imagen="/assets/img/iconos/graficoLinear.png"
              />
            </IonCol>

            <IonCol size="6" sizeMd="4" sizeXl="2">
              <Tarjeta
                titulo="CONSEJOS"
                ruta="/consejo"
                imagen="/assets/img/iconos/consejo.png"
              />
            </IonCol>
            <IonCol size="6" sizeMd="4" sizeXl="2">
              <Tarjeta
                titulo="MÁS INFO"
                ruta="/about-us"
                imagen="/assets/img/iconos/about.png"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
