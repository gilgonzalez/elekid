import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonThumbnail,
  useIonToast,
} from "@ionic/react";
import Menu from "components/Menu";
import { trash } from "ionicons/icons";
import { setKWatios } from "pages/Consulta/consultaSlice";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "store/store";
import { useLocalStorage } from "store/useLocalStorage";

/*CREA LA PAGINA PARA GESTIONAR LOS ELECTRODOMESTICOS DE LOS QUE DISPONE EL USUARIO*/
const AddElemento: React.FC = () => {
  //UseDispatch es una funcionalidad de reducer para gestionar los estados a través de toda la aplicación
  const dispatch = useAppDispatch();
  //UseState para configurar el funcionamiento de un toast
  const [present, dismiss] = useIonToast();
  //UseRef para recoger los datos de diferentes inputs, en este caso nombre y kwatios del electrodomestico
  const inputNombreElectrodomestico = useRef<HTMLIonInputElement>(null);
  const inputkWatios = useRef<HTMLIonInputElement>(null);
  //Rescato de un JSON un listado de electrodomesticos por default
  const electrodomesticosDefault = require("../../json/electrodomesticos.json");
  console.log(electrodomesticosDefault.length);
  //UseState para manejar el listado de electrodomesticos, tanto para añadir como para eliminar
  const [listadoElectrodomesticos, setListadoElectrodomesticos] =
    //UseLocalStorage está pensado para que persista la información en local
    useLocalStorage("listado", electrodomesticosDefault);
  //UseState para actualizar y saber en todo momento el tamaño del listado de electrodomesticos
  const [identificador, setIdentificador] = useState(
    listadoElectrodomesticos.length
  );
  //Función que se encarga de aumentar la cantidad en 1 del elemento de la lista en que se clicke
  const aumentarCantidad = (id: number) => {
    const nuevoListado = listadoElectrodomesticos.map(
      (elemento: { id: number; cantidad: number }) => {
        if (elemento.id === id) {
          return {
            ...elemento,
            cantidad: elemento.cantidad + 1,
          };
        }
        return elemento;
      }
    );
    setListadoElectrodomesticos(nuevoListado);
  };
  //Funcion que se encarga de disminuir la cantidad en 1 del elemento de la lista en que se clicke (no funciona cuando la cantidad es 1)
  const disminuirCantidad = (id: number) => {
    const nuevoListado = listadoElectrodomesticos.map(
      (elemento: { id: number; cantidad: number }) => {
        if (elemento.id === id && elemento.cantidad > 1) {
          return {
            ...elemento,
            cantidad: elemento.cantidad - 1,
          };
        }
        return elemento;
      }
    );
    setListadoElectrodomesticos(nuevoListado);
  };

  //Recoge los datos que haya en los inputs y los utiliza para crear un nuevo objeto que se añade al listado de electrodomesticos
  const addElectrodomestico = useCallback(() => {
    //Con esta sintaxis nos aseguramos que el valor no sea undefined ni null
    const nombreElectrodomestico = inputNombreElectrodomestico.current!
      .value as string;
    const nkWatios = +inputkWatios.current!.value!;
    //Comprobación de campos
    if (
      nombreElectrodomestico !== undefined &&
      nkWatios !== undefined &&
      nombreElectrodomestico !== "" &&
      nkWatios !== 0
    ) {
      const increment = () => setIdentificador(identificador + 1);
      increment();
      listadoElectrodomesticos.push({
        id: identificador,
        nombre: nombreElectrodomestico,
        kWatios: nkWatios,
        img: "./assets/img/iconos/icon_elect.png",
        cantidad: 1,
        activado: false,
      });
      setListadoElectrodomesticos(listadoElectrodomesticos);
    } else {
      //Muestra el toast
      present({
        buttons: [{ text: "OCULTAR", handler: () => dismiss() }],
        message: "RELLENE TODOS LOS CAMPOS",
        duration: 3000,
      });
    }
  }, [
    dismiss,
    identificador,
    listadoElectrodomesticos,
    present,
    setListadoElectrodomesticos,
  ]);

  const [kwInicial, setKwInicial] = useLocalStorage("kwInicial", 0);

  /*   useEffect(() => {
    dispatch(setKWatios(kwInicial));
  }, [dispatch, kwInicial]); */

  //Funcion que se utiliza para saber la cantidad de kWatios que se está utilizando, teniendo en cuenta la cantidad y los electrodomesticos con check activo
  const calcularkWatios = useCallback(() => {
    //Filtro solo los electrodomesticos activos
    var eActivos = listadoElectrodomesticos.filter(
      (electrodomestico: { activado: boolean }) =>
        electrodomestico.activado === true
    );

    //Recorro cada uno de los items de la lista y los acumulo en el total
    const total = eActivos.reduce(
      (prev: any, item: any) => prev + item.kWatios * item.cantidad,
      0
    );

    console.log(total);
    const totalReducido = Math.round((total + Number.EPSILON) * 100) / 100;

    present({
      buttons: [{ text: "ocultar", handler: () => dismiss() }],
      message: "El total de kWatios es " + totalReducido,
      duration: 5000,
    });

    setKwInicial(totalReducido);

    //Utilizo el dispatcher para tener disponible esta información en toda la aplicación
    dispatch(setKWatios(totalReducido));
  }, [dismiss, dispatch, listadoElectrodomesticos, present, setKwInicial]);
  //Utilizando el useState, cambio el listado por uno filtrado, quitando el elemento que tiene el mismo id
  function borrarElemento(id: number) {
    console.log(id);
    console.log(electrodomesticosDefault.length);
    if(id > electrodomesticosDefault.length-1) {
      setListadoElectrodomesticos(
        listadoElectrodomesticos.filter(
          (electrodomestico: { id: number }) => electrodomestico.id !== id
        )
      );
    }else {
      present({
        buttons: [{ text: "ocultar", handler: () => dismiss() }],
        message: "El electrodoméstico seleccionado es permanente",
        duration: 2000,
      });
    }
    
  }

  return (
    <IonPage color='green'>
      <Menu titulo="AGREGAR" />
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
                  expand ='block'
                  
                  color="success"
                  onClick={addElectrodomestico}
                  size="large"
                  className="ion-margin"
                >
                  AÑADIR NUEVO APARATO
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  expand ='block'
                  color="danger"
                  onClick={calcularkWatios}
                  size="large"
                  className="ion-margin"
                >
                  CALCULAR KW TOTALES
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItemDivider color="verde">Listado de elementos</IonItemDivider>
          <IonList className="ion-padding">
            {listadoElectrodomesticos.map(
              (elemento: {
                id: number;
                nombre: string;
                kWatios: number;
                cantidad: number;
                img: string;
                activado: boolean;
              }) => (
                <IonItemSliding key={elemento.id}>
                  <IonItem>
                    <IonLabel className="ion-margin" color="tertiary">
                      <h2>{elemento.nombre}</h2>
                      <p>{elemento.kWatios * elemento.cantidad} kW/H</p>
                    </IonLabel>
                    <IonThumbnail slot="start">
                      <IonImg src={elemento.img} />
                    </IonThumbnail>
                    <IonLabel>Cantidad: {elemento.cantidad}</IonLabel>
                    <IonButton onClick={() => aumentarCantidad(elemento.id)}>
                      +
                    </IonButton>
                    <IonButton onClick={() => disminuirCantidad(elemento.id)}>
                      -
                    </IonButton>
                  </IonItem>
                  <IonCheckbox
                    className="checkbox-circle"
                    slot="end"
                    color="primary"
                    checked={elemento.activado}
                    onIonChange={(e) => {
                      elemento.activado = !elemento.activado;
                    }}
                  />
                  <IonItemOptions side="start">
                    <IonItemOption
                      color="danger"
                      slot="icon-only"
                      onClick={() => borrarElemento(elemento.id)}
                    >
                      <IonIcon icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              )
            )}
          </IonList>
        </IonList>
      </IonContent>
    </IonPage>
  );
};;
export default AddElemento;
