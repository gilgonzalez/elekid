import {
IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonCardContent
  } from "@ionic/react";
  const ConsejoTAg = ({ fecha, titulo, imagen, descripcion }) => {
    return (
        <IonCard className="ion-text-center">
        <IonCardHeader>
          <IonCardSubtitle>{fecha}</IonCardSubtitle>
          <IonCardTitle>{titulo}</IonCardTitle>
        </IonCardHeader>
        <IonImg src={imagen}/>

        <IonCardContent>
         {descripcion}
        </IonCardContent>
      </IonCard>
    );
  };
  
  export default ConsejoTAg;
  

