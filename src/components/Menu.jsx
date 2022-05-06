import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";
const BarraMenu = ({ titulo }) => {
  return (
    <IonHeader>
      <IonToolbar color="medium">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{titulo}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default BarraMenu;
