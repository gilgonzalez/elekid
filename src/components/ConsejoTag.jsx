import {
IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonCardContent,IonItem
  } from "@ionic/react";
  const ConsejoTAg = ({ fecha, titulo, imagen, descripcion }) => {
    return (
      <IonItem>
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
      </IonItem>
        
    );
  };
  
  export default ConsejoTAg;
  

