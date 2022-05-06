import React from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add} from 'ionicons/icons';

export const ButtonPlus =  () => {
  return (
      <IonContent>
       

        {/*-- fab placed to the bottom start --*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        
      </IonContent>
      
  );
};