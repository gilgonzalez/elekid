import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Redirect, Route } from "react-router";
import Home from "./pages/Home/home";
import AddElemento from "./pages/AddElemento/addElemento";
import Comparativa from "./pages/Comparativa/comparativa";
import Consulta from "./pages/Consulta/consulta";
import About from "./pages/AboutUs/aboutUs";
import Historico from "./pages/Historico/historico";
import Consejo from "./pages/Tip/consejo";
import {
  addCircle,
  helpCircle,
  barChartOutline,
  statsChart,
  alertOutline,
  exitOutline,
  informationCircle,
} from "ionicons/icons";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonMenu side="start" contentId="menuApp">
        <IonHeader>
          <IonToolbar color="medium">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem routerLink="/consulta">
                <IonIcon color="medium" slot="start" icon={helpCircle} />
                <IonLabel> Consultar</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/addElemento">
                <IonIcon color="medium" slot="start" icon={addCircle} />
                <IonLabel> Añadir electrodomestico</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/comparativa">
                <IonIcon color="medium" slot="start" icon={barChartOutline} />
                <IonLabel> Comparativa precios</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/historico">
                <IonIcon color="medium" slot="start" icon={statsChart} />
                <IonLabel> Historico de precios</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/consejo">
                <IonIcon color="medium" slot="start" icon={alertOutline} />
                <IonLabel> Consejo del día</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/about-us">
                <IonIcon color="medium" slot="start" icon={informationCircle} />
                <IonLabel> About Us</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/home">
                <IonIcon color="medium" slot="start" icon={exitOutline} />
                <IonLabel> Salir</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="menuApp">
        <Route path="/home" component={Home} exact />
        <Route path="/addElemento" component={AddElemento} exact />
        <Route path="/comparativa" component={Comparativa} exact />
        <Route path="/consulta" component={Consulta} exact />
        <Route path="/about-us" component={About} exact />
        <Route path="/historico" component={Historico} exact />
        <Route path="/consejo" component={Consejo} exact />
        <Redirect to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
