import {
  IonCard,
  IonImg,
  IonModal,
  IonLabel,
  IonCardContent,
  IonContent,
  IonHeader, IonToolbar,IonTitle, IonCardHeader, IonCardSubtitle,IonCardTitle
} from "@ionic/react";

const ModalConsulta = ({
  consultaAbierta,
  cerrarModal,
  hora,
  estado,
  rutaImagen,
  costeActual,
  texto,
  kWatioTotal
}) => {
  return (
    <IonModal
      isOpen={consultaAbierta}
      onDidDismiss={cerrarModal}
      breakpoints={[0, 0.2, 0.75, 1]}
      initialBreakpoint={0.75}
      backdropBreakpoint={0.2}
     
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{hora}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent  >
        <IonImg src={rutaImagen}></IonImg>
        <IonCard className={estado} >
          <IonCardHeader>
            <IonCardSubtitle color='light'>
              En estos momentos estás consumiendo un total de {kWatioTotal} kWatio
            </IonCardSubtitle>
            <IonCardTitle>Con un coste total de : {costeActual}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent className={estado} >
            <IonLabel color='light'> {texto}</IonLabel>   
        </IonCardContent>
        </IonCard>
      
      </IonContent>
    </IonModal>
  );
};

export default ModalConsulta;
