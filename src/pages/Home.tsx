import PayslipListItem from '../components/PayslipListItem';
import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { Payslip } from '../types/Payslip';
import { mockPayslips } from '../data/mockPayslips';

export default function Home() {

  const [payslips, setPayslips] = useState<Payslip[]>(mockPayslips);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payslips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Payslips
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {payslips.map(m => <PayslipListItem key={m.id} payslip={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};