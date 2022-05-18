import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import ConsejoTag from "components/ConsejoTag";
import BarraMenu from "components/Menu";
import { db } from "../../firebaseConfig";
import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { cloudUploadOutline } from "ionicons/icons";
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const Consejo: React.FC = () => {
  const [titulo, setTitulo] = useState<String>();
  const [descripcion, setDescripcion] = useState<String>();
  const [fecha, setFecha] = useState<Date>();
  const consejoCollectionRef = collection(db, "consejo");
  const inputNuevoTitulo = useRef<HTMLIonInputElement>(null);
  const inputNuevaDescripcion = useRef<HTMLIonTextareaElement>(null);
  const fechaActual = new Date();
  const [present, dismiss] = useIonToast();

  const crearNuevoConsejo = async () => {
      await addDoc(consejoCollectionRef, {titulo:inputNuevoTitulo.current!.value, descripcion: inputNuevaDescripcion.current!.value, fecha:fechaActual})
  }

  const addNuevoConsejo = () => {
    console.log(inputNuevoTitulo.current!.value + ' '+ inputNuevaDescripcion.current!.value )
    if (inputNuevaDescripcion.current!.value==='' || inputNuevoTitulo.current!.value==='') {
      present({
        buttons: [{ text: "Ocultar", handler: () => dismiss() }],
        message: "RELLENE TODOS LOS CAMPOS",
        duration: 3000,
      })
    } else {
      crearNuevoConsejo()
      inputNuevoTitulo.current!.value = ''
      inputNuevaDescripcion.current!.value = ''
      present({
        buttons: [{ text: "Ocultar", handler: () => dismiss() }],
        message: "SUBIDO CON ÉXITO",
        duration: 3000,
      })
    }
  };

  useEffect(() => {
    const getConsejo = async () => {
      const data = await getDocs(consejoCollectionRef);
      const consulta = data.docs.map((doc) => ({ ...doc.data() }));
      const n = getRandomInt(0, consulta.length);
      setTitulo(consulta[n].titulo);
      setDescripcion(consulta[n].descripcion);
      setFecha(consulta[n].fecha.toDate().toDateString());
    };
    getConsejo();
  }, []);
  return (
    <IonPage>
        <BarraMenu titulo="CONSEJO" />
        <IonItem className="ion-align-items-center ion-margin" slot="fixed">
          <ConsejoTag
            fecha={fecha}
            titulo={titulo}
            imagen="/assets/img/default_image_consejo.jpg"
            descripcion={descripcion}
          />
        </IonItem>
        <IonItemDivider color="secondary" sticky={true} >
          CREA TU PROPIO CONSEJO
        </IonItemDivider>
        <IonItem>
          <IonLabel position="floating" color="medium">
            Título/Creador
          </IonLabel>
          <IonInput
            value=""
            placeholder="Introduzca un titulo o su nombre"
            clearInput
            ref={inputNuevoTitulo}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating" color="medium">
            Descripción
          </IonLabel>
          <IonTextarea
            placeholder="Breve descripcion del consejo"
            auto-grow={true}
            clearOnEdit={true}
            ref={inputNuevaDescripcion}
          />
        </IonItem>
        <div >
          <IonFab vertical="bottom" horizontal="end">
            <IonFabButton onClick={addNuevoConsejo}>
              <IonIcon icon={cloudUploadOutline} />
            </IonFabButton>
          </IonFab>
        </div> 
    </IonPage>
  );
};
export default Consejo;
