import { IonContent, IonPage } from "@ionic/react";
import BarraMenu from "components/Menu";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { getDatos } from "./consultaSlice";
const Consulta: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDatos());
  }, [dispatch]);

  const datos = useAppSelector((state) => state.consulta.datos);

  const kWatios = useAppSelector((state) => state.consulta.result);
  const consultaDate = useAppSelector((state) =>
    state.consulta.date ? new Date(state.consulta.date) : undefined
  );

  return (
    <IonPage>
      <BarraMenu titulo="CONSULTA" />
      <IonContent>
        <p>DISTINTOS TIPOS DE CONSULTAS SE PODRÁN HACER ES APARTADO</p>
        <div>KWatios: {kWatios}</div>
        <div>Date: {consultaDate?.toLocaleString()}</div>
        <div>{JSON.stringify(datos)}</div>
        <ul>
          <li>
            Todos los precios de la zona
            https://api.preciodelaluz.org/v1/prices/all?zone=PCB{" "}
          </li>
          <li>
            Precio promedio de la zona
            https://api.preciodelaluz.org/v1/prices/avg?zone=PCB{" "}
          </li>
          <li>
            Precio más alto https://api.preciodelaluz.org/v1/prices/max?zone=PCB
          </li>
          <li>
            Precio más bajo y hora
            https://api.preciodelaluz.org/v1/prices/min?zone=PCB
          </li>
          <li>
            Precio en el momento actual
            https://api.preciodelaluz.org/v1/prices/now?zone=PCB
          </li>
          <li>
            Horas más económicas
            https://api.preciodelaluz.org/v1/prices/cheapests?zone=PCB&n=2
          </li>
        </ul>
      </IonContent>
    </IonPage>
  );
};
export default Consulta;
