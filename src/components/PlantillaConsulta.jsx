import {
  IonCard,
  IonImg,
  IonModal,
  IonLabel,
  IonCardContent,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

const ModalConsulta = ({
  consultaAbierta,
  cerrarModal,
  hora,
  estado,
  rutaImagen,
  costeActual,
  texto,
  kWatioTotal,
  costeActualConSimbolo
}) => {
  const costeReducido = +costeActual * 0.2;
  const costeReducidoRedondeado = Math.round((costeReducido + Number.EPSILON) * 100) / 100;
  const costeReducidoConSimbolo = `${costeReducidoRedondeado} €`;
  return (
    <IonModal
      isOpen={consultaAbierta}
      onDidDismiss={cerrarModal}
      breakpoints={[0, 0.2, 0.75, 1]}
      initialBreakpoint={1}
      backdropBreakpoint={0.2}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{hora}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg src={rutaImagen}></IonImg>
        <IonCard className={estado}>
          <IonCardHeader>
            <IonCardSubtitle color="light">
              En estos momentos estás consumiendo un total de {kWatioTotal}{" "}
              kWatio
            </IonCardSubtitle>
            <IonCardTitle>
             Coste total : {costeActualConSimbolo}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className={estado}>
            <IonLabel color="light"> {texto}</IonLabel>
          </IonCardContent>
        </IonCard>
        <IonCard className="valle">
          <IonCardHeader>
            <IonCardTitle color="light">
              Helios Solar Fotovoltaica
            </IonCardTitle>
            <IonCardSubtitle color="light" className='ion-padding-top'>
              Instalación de Placas Solares
            </IonCardSubtitle>
            <IonCardTitle className='ion-margin'>
             Coste total : {costeReducidoConSimbolo}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent >
            
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default ModalConsulta;
