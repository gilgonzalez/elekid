import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
} from "@ionic/react";
import BarraMenu from "components/Menu";
import ModalConsulta from "components/PlantillaConsulta";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { getDatos } from "./consultaSlice";
const Consulta: React.FC = () => {
  const [consultaAbierta, setConsultaAbierta] = useState(false);
  const [estado, setEstado] = useState("llana");
  const [icono, setIcono] = useState("sad");
  const fechaActual = new Date()
  const hora = `${fechaActual.getHours()} : ${fechaActual.getMinutes()}` 

  const cerrarModal = () => {
    setConsultaAbierta(false);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDatos());
  }, [dispatch]);

  const datos = useAppSelector((state) => state.consulta.datos);
  const kWatios = useAppSelector((state) => state.consulta.result);
  const num = kWatios * 0.254
  const redondeado = Math.round(((num) + Number.EPSILON) * 100) / 100
  const costeActual = `${redondeado} €`
  console.log(datos)
  
  const consultaDate = useAppSelector((state) =>
    state.consulta.date ? new Date(state.consulta.date) : undefined
  );
  //SEGUIR POR AQUÍ, MANEJAR EL OBJETO JSON QUE RECIBO.

  return (
    <IonPage>
      <BarraMenu titulo="CONSULTA" />
      <IonContent>
        <IonTitle className="ion-padding" size="large">
          Listado de Consultas
        </IonTitle>
        <IonItem>
        <IonLabel>Gasto actual en Kwatios</IonLabel>
            <IonNote slot="end" className='bigger'><h4>{kWatios}</h4></IonNote>
        </IonItem>
        <IonItem>
        <IonLabel>Hora Actual</IonLabel>
            <IonNote slot="end" className='bigger'><h4>{fechaActual.getHours()} : {fechaActual.getMinutes()}</h4></IonNote>
        </IonItem>
        <IonButton
          className="ion-padding"
          onClick={() => setConsultaAbierta(true)}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR COSTE ACTUAL
        </IonButton>
        <IonButton
          className="ion-padding"
          onClick={() => setConsultaAbierta(true)}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR COSTE TODAS LAS HORAS
        </IonButton>
        <IonButton
          className="ion-padding"
          onClick={() => setConsultaAbierta(true)}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR HORAS MÁS BARATAS
        </IonButton>
        <IonButton
          className="ion-padding"
          onClick={() => setConsultaAbierta(true)}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR HORAS MÁS CARAS
        </IonButton>
        <IonButton
          className="ion-padding"
          onClick={() => setConsultaAbierta(true)}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR HORAS PRECIO MEDIO
        </IonButton>
        <ModalConsulta consultaAbierta={consultaAbierta} cerrarModal={cerrarModal} hora={hora} estado='valle' rutaImagen='assets/img/iconos/happy.png' costeActual={costeActual}/>
      </IonContent>
    </IonPage>
  );
};
export default Consulta;
