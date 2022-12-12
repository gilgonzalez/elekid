import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  useIonToast,
} from "@ionic/react";
import BarraMenu from "components/Menu";
import ModalConsultaListado from "components/ModalConsultaListado";
import ModalConsulta from "components/PlantillaConsulta";
import { useCallback,  useState } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { useLocalStorage } from "store/useLocalStorage";
import { getDatos } from "./consultaSlice";

const Consulta: React.FC = () => {
  const [consultaAbierta, setConsultaAbierta] = useState(false);
  const [consultaAbiertaTodas, setConsultaAbiertaTodas] = useState(false);
  const [consultaAbiertaBarata, setConsultaAbiertaBarata] = useState(false);
  const [consultaAbiertaCara, setConsultaAbiertaCara] = useState(false);
  const [consultaAbiertaPromedio, setConsultaAbiertaPromedio] = useState(false);
  const defaultListadoConsultas = require("../../json/mockListadoConsultas.json");

  const [estado, setEstado] = useState("");
  const [icono, setIcono] = useState("");
  const fechaActual = new Date();
  const hora = fechaActual.getHours();
  const horaYminuto = `${fechaActual.getHours()} : ${fechaActual.getMinutes()}`;
  const [texto, setTexto] = useState("");
  const [toast, setToast] = useIonToast();

  const [listadoConsulta, setListadoConsulta] = useLocalStorage(
    "consulta",
    defaultListadoConsultas
  );
  console.log(listadoConsulta);

  const addConsulta = () => {
    const costeReducido = +costeActual * 0.2;
    const costeReducidoRedondeado =
      Math.round((costeReducido + Number.EPSILON) * 100) / 100;
    const consulta = {
      precioReal: costeActual,
      precioConPlacas: costeReducidoRedondeado,
      hora: hora,
    };
    const ultimoElemento = listadoConsulta.length - 1;
    const validacionConsulta =
      listadoConsulta[ultimoElemento].precioReal === consulta.precioReal &&
      listadoConsulta[ultimoElemento].precioConPlacas === consulta.precioConPlacas &&  
      listadoConsulta[ultimoElemento].hora === consulta.hora;
    if (!validacionConsulta) {
      listadoConsulta.push(consulta);
      setListadoConsulta(listadoConsulta);
    } else {
      console.log("es la misma consulta");
    }
    if (listadoConsulta.length > 24) {
      listadoConsulta.shift();
      setListadoConsulta(listadoConsulta);
    }
  };

  //const hoyData = require("../../json/precio_hoy.json");
  let hoyData = useAppSelector((state) => state.consulta.datos);
  if (hoyData === undefined) {
    hoyData = require("../../json/precio_hoy.json");
  }
  /*for(const elemento of hoyData){
    console.log(hoyData)
  }*/
  const listadoTodasHoras = hoyData?.map((item: any) => item);
  const listadoHorasPromedio = hoyData?.filter(
    (item: { zone: string }) => item.zone === "llano"
  );
  const listadoHorasCara = hoyData?.filter(
    (item: { zone: string }) => item.zone === "punta"
  );
  const listadoHorasBarata = hoyData?.filter(
    (item: { zone: string }) => item.zone === "valle"
  );
  console.log(listadoHorasPromedio);
  const tramo = hoyData?.find((tramo: { hour: number }) => tramo.hour === hora);

  const cerrarModalConsulta = () => {
    setConsultaAbierta(false);
  };
  const cerrarModalConsultaTodas = () => {
    setConsultaAbiertaTodas(false);
  };
  const cerrarModalConsultaBarata = () => {
    setConsultaAbiertaBarata(false);
  };
  const cerrarModalConsultaPromedio = () => {
    setConsultaAbiertaPromedio(false);
  };
  const cerrarModalConsultaCara = () => {
    setConsultaAbiertaCara(false);
  };
  const asignarIcono = useCallback(() => {
    console.log(tramo?.zone);
    switch (tramo?.zone) {
      case "punta":
        return "../assets/img/iconos/sad.png";
      case "valle":
        return "../assets/img/iconos/happy.png";
      case "llano":
        return "../assets/img/iconos/normal.png";
      default:
        return "../assets/img/iconos/normal.png";
    }
  }, [tramo]);

  const asignarTexto = useCallback(() => {
    console.log(tramo?.zone);
    switch (tramo?.zone) {
      case "punta":
        return "QUIZÁS DEBERÍAS PLANTEARTE APAGAR TODOS LOS ELECTRODOMESTICOS E IRTE A POR ESPÁRRAGOS";
      case "llano":
        return "NO ES UNA HORA MALA PARA JUGAR A LA PLAY, PERO NO TE FLIPES";
      case "valle":
        return "INVITA A TUS COLEGAS A CASA Y PON A TOPE EL AIRE ACONDICIONADO";
      default:
        return "NO TENGO NI IDEA DE QUÉ ESTÁ PASANDO";
    }
  }, [tramo]);

  const asignarEstado = tramo?.zone || "llano";

  const cambiarIconoEstado = useCallback(() => {
    setIcono(asignarIcono);
    setEstado(asignarEstado);
    setTexto(asignarTexto);
  }, [asignarEstado, asignarIcono, asignarTexto]);
  const dispatch = useAppDispatch();

  const kWatios = useAppSelector((state) => state.consulta.result);
  console.log(kWatios);
  const num = kWatios * tramo?.price;
  const redondeado = Math.round((num + Number.EPSILON) * 100) / 100;
  const costeActual = redondeado;
  const costeActualConSimbolo = `${redondeado} €`;

  useCallback(() => {
    dispatch(getDatos());
  }, [dispatch]);

  /*   useEffect(() => {
    const [kwInicial, setKwInicial] = useLocalStorage("kwInicial", 0);
    dispatch(setKWatios(kwInicial));
  }, [dispatch, kwInicial]); */

  const consultaDate = useAppSelector((state) =>
    state.consulta.date ? new Date(state.consulta.date) : undefined
  );

  return (
    <IonPage>
      <BarraMenu titulo="CONSULTA" />
      <IonContent>
        <IonTitle className="ion-padding" size="large">
          Listado de Consultas
        </IonTitle>
        <IonItem>
          <IonLabel color="primary">Gasto actual en Kwatios</IonLabel>
          <IonNote slot="end" className="bigger">
            <h4>{kWatios}</h4>
          </IonNote>
        </IonItem>
        <IonItem>
          <IonLabel color="primary">Hora Actual</IonLabel>
          <IonNote slot="end" className="bigger">
            <h4>
              {fechaActual.getHours()} : {fechaActual.getMinutes()}
            </h4>
          </IonNote>
        </IonItem>
        <IonButton
          className="ion-padding"
          onClick={() => {
            if (kWatios === 0 || kWatios === undefined) {
              toast({
                buttons: [{ text: "OCULTAR", handler: () => setToast() }],
                message: "ASEGÚRESE QUE HA CALCULADO LOS KWATIOS",
                duration: 3000,
              });
            } else {
              setConsultaAbierta(true);
              addConsulta();
              cambiarIconoEstado();
            }
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
            setConsultaAbiertaTodas(true);
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
            setConsultaAbiertaBarata(true);
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
            setConsultaAbiertaCara(true);
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
            setConsultaAbiertaPromedio(true);
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
          cerrarModal={cerrarModalConsulta}
          hora={horaYminuto}
          estado={estado}
          rutaImagen={icono}
          costeActualConSimbolo={costeActualConSimbolo}
          costeActual={costeActual}
          texto={texto}
          kWatioTotal={kWatios}
        />
        <ModalConsultaListado
          consultaAbierta={consultaAbiertaTodas}
          cerrarModal={cerrarModalConsultaTodas}
          hora={horaYminuto}
          listadoHoras={listadoTodasHoras}
          texto="todas las franjas horarias"
        />
        <ModalConsultaListado
          consultaAbierta={consultaAbiertaPromedio}
          cerrarModal={cerrarModalConsultaPromedio}
          hora={horaYminuto}
          listadoHoras={listadoHorasPromedio}
          texto="las franjas horarias con precio promedio"
        />
        <ModalConsultaListado
          consultaAbierta={consultaAbiertaBarata}
          cerrarModal={cerrarModalConsultaBarata}
          hora={horaYminuto}
          listadoHoras={listadoHorasBarata}
          texto="las franjas horarias con precio más bajo"
        />
        <ModalConsultaListado
          consultaAbierta={consultaAbiertaCara}
          cerrarModal={cerrarModalConsultaCara}
          hora={horaYminuto}
          listadoHoras={listadoHorasCara}
          texto="las franjas horarias con precio más caro"
        />
      </IonContent>
    </IonPage>
  );
};
export default Consulta;
