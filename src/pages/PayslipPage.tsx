import { useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
} from '@ionic/react';
import { documentText } from 'ionicons/icons';
import { useParams } from 'react-router';
import './PayslipPage.css';
import { Payslip } from '../types/Payslip';
import { getPayslip } from '../data/mockPayslips';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

export default function PayslipPage() {
  const [payslip, setPayslip] = useState<Payslip>();
  const params = useParams<{ id: string }>();
  const [present] = useIonAlert();

  useIonViewWillEnter(() => {
    const payslip = getPayslip(params.id)
    setPayslip(payslip);
  });

  const downloadFile = async () => {
    if (!payslip?.file) return;

    console.log("download")

    if (Capacitor.isNativePlatform()) {
      try {
        const response = await fetch(payslip.file);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result.toString();

          // Specify the directory path directly; adjust as needed for your app's requirements
          let path = `Download/${payslip.id}.pdf`;

          // Example for saving in a specific directory, adjust based on your needs
          // For Android, you might use 'files/' for private storage
          // For iOS, consider the app's Documents or Library for private storage

          await Filesystem.writeFile({
            path: path,
            data: base64data,
            directory: Directory.Documents, // This is now a string. Use 'DOCUMENTS' or another appropriate value based on your needs
          });

          present('File downloaded successfully.', [{ text: 'Ok' }]);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        present(`Error downloading file: ${error}`, [{ text: 'Ok' }]);
      }
    } else {
      // Web download logic here
      const a = document.createElement('a');
      a.href = payslip.file;
      a.download = payslip.id + '.pdf'; // Or the name you want
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Payslips" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {payslip ? (
          <>
            <IonItem>
              <IonIcon aria-hidden="true" icon={documentText} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {payslip.id}

                </h2>
                <h3>
                  <span className="date">
                    <IonNote>{payslip.fromDate} - {payslip.toDate}</IonNote>
                  </span>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{payslip.file ? 'This payslip includes a file' : ''}</h1>
              <p>
                {payslip.file ? 'The file can be downloaded at ' + payslip.file : ''}
              </p>
              <IonButton onClick={downloadFile}>Download</IonButton>
            </div>
          </>
        ) : (
          <div>Payslip not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}