import {
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonThumbnail,
} from "@ionic/react";
import Menu from "components/Menu";
import React from "react";
const About: React.FC = () => {
  const data = require('../../json/abril_precio.json')
  console.log(data) 
  return (
    <IonPage>
     <Menu titulo="INFORMACIÓN ADICIONAL"/>
      <IonContent>
        {data.map((elemento: { dia: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; hora: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; img: any; })=>
          <IonItem>
                  <IonLabel className="ion-margin">
                    <h2>{elemento.dia}</h2>
                    <p>{elemento.hora} kWatios/Hora</p>
                  </IonLabel>
                  <IonThumbnail slot="start">
                    <IonImg src={elemento.img} />
                  </IonThumbnail>
                  </IonItem>)}
      </IonContent>
    </IonPage>
  );
};
export default About;
