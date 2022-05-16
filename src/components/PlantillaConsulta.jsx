import {
    IonCard,
    IonImg,
    IonModal, 
    IonItem,
    IonLabel,
    IonContent,
    IonText
  } from "@ionic/react";
  
  const ModalConsulta = ({ consultaAbierta,cerrarModal, hora, estado, rutaImagen, costeActual }) => {
    return (
        <IonModal
        isOpen={consultaAbierta}
        onDidDismiss={cerrarModal}
        breakpoints={[0, 0.2, 0.75, 1]}
        initialBreakpoint={0.75}
        backdropBreakpoint={0.2}
      >
        <IonCard className="ion-text-center">
          <IonItem href="#" className="ion-activated">
            <IonImg className="ion-padding" src={rutaImagen} slot="start"/>
            <IonLabel><h1>{hora}</h1></IonLabel>
          </IonItem>
        </IonCard>
        <IonContent className={estado}>
            <IonText>Esta es una hora genial para consumir electricidad</IonText>
            <br></br>
            <IonText>El precio actual del kwatio/hora es : 0.254</IonText>
            <br/>
            <IonText>Según los electrodomesticos especificados estás gastando: {costeActual}  </IonText>
        </IonContent>
      </IonModal>
    );
  };
  
  export default ModalConsulta;

