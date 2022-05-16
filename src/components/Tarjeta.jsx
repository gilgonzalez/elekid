import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from "@ionic/react";

const Tarjeta = ({ ruta, imagen, titulo }) => {
  return (
    <IonCard routerLink={ruta} routerDirection="root" color="success">
      <IonCardHeader>
        <IonImg src={imagen}></IonImg>
        <IonCardTitle className="ion-text-center">{titulo}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default Tarjeta;
