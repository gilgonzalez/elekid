import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Menu from "components/Menu";
import React from "react";
import { logoFacebook, logoWhatsapp, logoLinkedin,logoGoogle, logoTwitter } from "ionicons/icons";
const About: React.FC = () => {
  return (
    <IonPage>
      <Menu titulo="INFORMACIÓN ADICIONAL" />
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Aplicación creada por Francisco Javier Gil González
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel className="ion-padding-start">Gil González</IonLabel>
            <IonIcon color="medium" slot="start" icon={logoFacebook}></IonIcon>
          </IonItem>
          <IonItem>
            <IonLabel className="ion-padding-start">690775279</IonLabel>
            <IonIcon color="medium" slot="start" icon={logoWhatsapp}></IonIcon>
          </IonItem>
          <IonItem>
            <IonLabel className="ion-padding-start">francisco javier gil gonzález</IonLabel>
            <IonIcon color="medium" slot="start" icon={logoLinkedin}></IonIcon>
          </IonItem>
          <IonItem>
            <IonLabel className="ion-padding-start">fragilgon@gmail.com</IonLabel>
            <IonIcon color="medium" slot="start" icon={logoGoogle}></IonIcon>
          </IonItem>
          <IonItem>
            <IonLabel className="ion-padding-start">@fragilgon</IonLabel>
            <IonIcon color="medium" slot="start" icon={logoTwitter}></IonIcon>
          </IonItem>
        </IonList>
        <IonItemDivider color="verde">Aplicación creada para PROYECTO INTEGRADO CFGS DAM</IonItemDivider>
        <IonImg src="/assets/img/ionic.png" className="ion-padding"></IonImg>
      </IonContent>
    </IonPage>
  );
};
export default About;
