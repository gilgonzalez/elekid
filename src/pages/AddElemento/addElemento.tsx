import {
  IonPage,
  IonItem,
  IonInput,
  IonContent,
  IonItemDivider,
  IonList,
  IonButton,
  IonToast,
  IonLabel,
  IonImg,
  IonThumbnail,
  IonCheckbox,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
} from "@ionic/react";
import Menu from "components/Menu";
import React, { useState, useRef } from "react";
import { trash } from "ionicons/icons";
const AddElemento: React.FC = () => {
  const inputNombreElectrodomestico = useRef<HTMLIonInputElement>(null);
  const inputKwatios = useRef<HTMLIonInputElement>(null);
  
  const [listadoElectrodomesticos, setListadoElectrodomesticos] = useState([
    {
      id: 0,
      nombre: "lavadora",
      Kwatios: 230,
      img: "/assets/img/lavadora.jpg",
      activado: false,
    },
    {
      id: 1,
      nombre: "secadora",
      Kwatios: 150,
      img: "/assets/img/secadora.jpg",
      activado: false,
    },
    {
      id: 2,
      nombre: "televisor",
      Kwatios: 50,
      img: "/assets/img/tv.png",
      activado: false,
    },
    {
      id: 3,
      nombre: "ordenador",
      Kwatios: 15,
      img: "/assets/img/pc.jpg",
      activado: true,
    },
  ]);
  const [identificador, setIdentificador] = useState(listadoElectrodomesticos.length);
  const aceptarClick = () => {
    const nombreElectrodomestico = inputNombreElectrodomestico.current!
      .value as string;
    const nKwatios = +inputKwatios.current!.value!;
    if (nombreElectrodomestico !== undefined && nKwatios !== undefined) {
      const increment = () => setIdentificador(identificador + 1);
      increment();
      listadoElectrodomesticos.push({
        id: identificador,
        nombre: nombreElectrodomestico,
        Kwatios: nKwatios,
        img: "./assets/img/iconos/icon_elect.png",
        activado: false,
      });
      setListadoElectrodomesticos(listadoElectrodomesticos);
      console.log(listadoElectrodomesticos);
    }
  };
  const calcularKwatios = () => {
    console.log(listadoElectrodomesticos);
  };
  function borrarElemento(id:number){ 
      setListadoElectrodomesticos(listadoElectrodomesticos.filter(electrodomestico => electrodomestico.id !== id));
      console.log(listadoElectrodomesticos);
  }
 
  return (
    <IonPage>
      <Menu titulo="AGREGAR ELECTRODOMESTICO" />
      <IonContent>
        <IonList>
          <IonItemDivider color="secondary">
            Nombre electrodoméstico
          </IonItemDivider>
          <IonItem>
            <IonInput
              value=""
              placeholder="Introducir nombre"
              clearInput
              ref={inputNombreElectrodomestico}
            ></IonInput>
          </IonItem>

          <IonItemDivider color="secondary">Consumo en Kwatios</IonItemDivider>
          <IonItem>
            <IonInput
              value=""
              placeholder="Kwatios/hora"
              type="number"
              clearInput
              ref={inputKwatios}
            ></IonInput>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  color="medium"
                  onClick={aceptarClick}
                  size="large"
                  className="ion-margin"
                >
                  AGREGAR NUEVO ELEMENTO
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  color="danger"
                  onClick={calcularKwatios}
                  size="large"
                  className="ion-margin"
                >
                  CALCULAR KWATIOS TOTALES
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItemDivider color="medium">Listado de elementos</IonItemDivider>
          <IonList className="ion-padding">
            {listadoElectrodomesticos.map((elemento) => (
              <IonItemSliding key={elemento.id}>
                <IonItem>
                  <IonLabel className="ion-margin">
                    <h2>{elemento.nombre}</h2>
                    <p>{elemento.Kwatios} Kwatios/Hora</p>
                  </IonLabel>
                  <IonThumbnail slot="start">
                    <IonImg src={elemento.img} />
                  </IonThumbnail>
                  <IonCheckbox
                    className="checkbox-circle"
                    slot="end"
                    color="primary"
                    mode="md"
                    checked={elemento.activado}
                  />
                </IonItem>
                <IonItemOptions side="start">
                  <IonItemOption
                    color="danger"
                    slot="icon-only"
                    onClick={()=>borrarElemento(elemento.id)} 
                  >
                    <IonIcon icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default AddElemento;
