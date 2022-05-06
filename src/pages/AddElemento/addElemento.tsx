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
  const inputkWatios = useRef<HTMLIonInputElement>(null);
  const [listadoElectrodomesticos, setListadoElectrodomesticos] = useState([
    {
      id: 0,
      nombre: "lavadora",
      kWatios: 230,
      img: "/assets/img/lavadora.jpg",
      activado: false,
    },
    {
      id: 1,
      nombre: "secadora",
      kWatios: 150,
      img: "/assets/img/secadora.jpg",
      activado: true,
    },
    {
      id: 2,
      nombre: "televisor",
      kWatios: 50,
      img: "/assets/img/tv.png",
      activado: false,
    },
    {
      id: 3,
      nombre: "ordenador",
      kWatios: 15,
      img: "/assets/img/pc.jpg",
      activado: true,
    },
  ]);
  const [identificador, setIdentificador] = useState(listadoElectrodomesticos.length);
  const aceptarClick = () => {
    const nombreElectrodomestico = inputNombreElectrodomestico.current!
      .value as string;
    const nkWatios = +inputkWatios.current!.value!;
    if (nombreElectrodomestico !== undefined && nkWatios !== undefined) {
      const increment = () => setIdentificador(identificador + 1);
      increment();
      listadoElectrodomesticos.push({
        id: identificador,
        nombre: nombreElectrodomestico,
        kWatios: nkWatios,
        img: "./assets/img/iconos/icon_elect.png",
        activado: false,
      });
      setListadoElectrodomesticos(listadoElectrodomesticos);
      console.log(listadoElectrodomesticos);
    }
  };
  const calcularkWatios = () => {
    var eActivos = listadoElectrodomesticos.filter(electrodomestico => electrodomestico.activado === true)
    var total = 0;
    eActivos.map(item => total += item.kWatios)
    console.log(eActivos);
    console.log(total);
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

          <IonItemDivider color="secondary">Consumo en kWatios</IonItemDivider>
          <IonItem>
            <IonInput
              value=""
              placeholder="kWatios/hora"
              type="number"
              clearInput
              ref={inputkWatios}
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
                  onClick={calcularkWatios}
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
                    <p>{elemento.kWatios} kWatios/Hora</p>
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
