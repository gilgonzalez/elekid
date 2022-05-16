import {
    IonCard,
    IonModal,
    IonCardContent,
    IonContent,
    IonHeader, IonToolbar,IonTitle, IonCardHeader, IonCardSubtitle,IonList, IonItem, IonLabel
  } from "@ionic/react";
  
  const ModalConsultaListado = ({
    consultaAbierta,
    cerrarModal,
    hora,
    listadoHoras, 
    texto
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
          <IonCard >
            <IonCardHeader>
              <IonCardSubtitle color='dark'>
                A continuación se muestran {texto}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent >
                <IonList>
                {listadoHoras.map((item)=>
                <IonItem className={item.zone} key={item.hour}>
                    <IonLabel>A las {item.hour} </IonLabel>
                    <IonLabel>{item.price} € kWatio/h</IonLabel>
                </IonItem>)}         
                </IonList>
             
          </IonCardContent>
          </IonCard>
        
        </IonContent>
      </IonModal>
    );
  };
  
  export default ModalConsultaListado;