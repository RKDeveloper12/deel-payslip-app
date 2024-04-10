import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import './PayslipListItem.css';
import { Payslip } from '../types/Payslip';

interface PayslipListItemProps {
  payslip: Payslip;
}

const PayslipListItem: React.FC<PayslipListItemProps> = ({ payslip }) => {
  return (
    <IonItem routerLink={`/payslip/${payslip.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {payslip.id}
          <span className="date">
            <IonNote>{payslip.fromDate} - {payslip.toDate}</IonNote>
          </span>
        </h2>
        <h3>{payslip.file ? 'This payslip includes a file':''}</h3>
        <p>
          {payslip.file ? payslip.file :''}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default PayslipListItem;
