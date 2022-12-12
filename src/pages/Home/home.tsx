import { IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonToggle } from "@ionic/react";
import BarraMenu from "components/Menu";
import Tarjeta from "components/Tarjeta";
import { moon, sunny } from "ionicons/icons";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const cambiarModo = ()=>{
    setDarkMode(!darkMode);
    document.body.setAttribute('color-theme','light')
    console.log(darkMode);
  };
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
                titulo="GRÁFICO HORAS"
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
