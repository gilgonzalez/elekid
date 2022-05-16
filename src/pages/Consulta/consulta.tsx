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
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { getDatos } from "./consultaSlice";
const Consulta: React.FC = () => {
  const [consultaAbierta, setConsultaAbierta] = useState(false);
  const [estado, setEstado] = useState("");
  const [icono, setIcono] = useState("");
  const fechaActual = new Date();
  const hora = fechaActual.getHours();
  const horaYminuto = `${fechaActual.getHours()} : ${fechaActual.getMinutes()}`;
  const [texto, setTexto] = useState('');

  const hoyData = require("../../json/precio_hoy.json");
  /*for(const elemento of hoyData){
    console.log(hoyData)
  }*/
  const tramo = hoyData.filter(
    (tramo: { hour: number }) => tramo.hour === hora
  );
  const cerrarModal = () => {
    setConsultaAbierta(false);
  };
  const asignarIcono = () => {
    console.log(tramo[0].zone)
    switch (tramo[0].zone) {
      case "punta":
        return "../assets/img/iconos/sad.png";
      case "valle":
        return "../assets/img/iconos/happy.png";
      case "llano":
        return "../assets/img/iconos/normal.png";
      default:
        return "../assets/img/iconos/normal.png";
    }
  };
  const asignarTexto = () => {
    console.log(tramo[0].zone)
    switch (tramo[0].zone) {
      case "punta":
        return "QUIZÀS DEBERÍAS PLANTEARTE APAGAR TODOS LOS ELECTRODOMESTICOS E IRTE A POR ESPÁRRAGOS";
      case "llano":
        return "NO ES UNA HORA MALA PARA JUGAR A LA PLAY, PERO NO TE FLIPES";
      case "valle":
        return "INVITA A TUS COLEGAS A CASA Y PON A TOPE EL AIRE ACONDICIONADO";
      default:
        return "NO TENGO NI IDEA DE QUÉ ESTÁ PASANDO";
    }
  };
  const asignarEstado = tramo[0].zone === undefined ? 'llano' : tramo[0].zone;
  
  const cambiarIconoEstado = useCallback(() => {
    setIcono(asignarIcono);
    setEstado(asignarEstado);
    setTexto(asignarTexto);
  }, [tramo]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDatos());
  }, [dispatch]);

  const datos = useAppSelector((state) => state.consulta.datos);
  const kWatios = useAppSelector((state) => state.consulta.result);
  const num = kWatios * 0.254;
  const redondeado = Math.round((num + Number.EPSILON) * 100) / 100;
  const costeActual = `${redondeado} €`;

  const consultaDate = useAppSelector((state) =>
    state.consulta.date ? new Date(state.consulta.date) : undefined
  );
  //SEGUIR POR AQUÍ, MANEJAR EL OBJETO JSON QUE RECIBO.

  return (
    <IonPage>
      <BarraMenu titulo="CONSULTA" />
      <IonContent >
        <IonTitle className="ion-padding" size="large">
          Listado de Consultas
        </IonTitle>
        <IonItem>
          <IonLabel>Gasto actual en Kwatios</IonLabel>
          <IonNote slot="end" className="bigger">
            <h4>{kWatios}</h4>
          </IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>Hora Actual</IonLabel>
          <IonNote slot="end" className="bigger">
            <h4>
              {fechaActual.getHours()} : {fechaActual.getMinutes()}
            </h4>
          </IonNote>
        </IonItem>
        <IonButton
          className="ion-padding"
          onClick={() => {
            setConsultaAbierta(true);
            cambiarIconoEstado();
          }}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR COSTE ACTUAL
        </IonButton>
        <IonButton
          className="ion-padding"
          onClick={() => {
            setConsultaAbierta(true);
            cambiarIconoEstado();
          }}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR COSTE TODAS LAS HORAS
        </IonButton>
        <IonButton
          className="ion-padding"
          onClick={() => {
            setConsultaAbierta(true);
            cambiarIconoEstado();
          }}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR HORAS MÁS BARATAS
        </IonButton>
        <IonButton
          className="ion-padding"
          onClick={() => {
            setConsultaAbierta(true);
            cambiarIconoEstado();
          }}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR HORAS MÁS CARAS
        </IonButton>
        <IonButton
          className="ion-padding"
          onClick={() => {
            setConsultaAbierta(true);
            cambiarIconoEstado();
          }}
          color="favorite"
          expand="full"
          shape="round"
        >
          CONSULTAR HORAS PRECIO MEDIO
        </IonButton>
        <ModalConsulta
          consultaAbierta={consultaAbierta}
          cerrarModal={cerrarModal}
          hora={horaYminuto}
          estado={estado}
          rutaImagen={icono}
          costeActual={costeActual}
          texto= {texto}
          kWatioTotal ={kWatios}
        />
      </IonContent>
    </IonPage>
  );
};
export default Consulta;
