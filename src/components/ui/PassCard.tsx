import React from 'react';
import { Ticket, TicketProps } from './Ticket';
import { RegistrationRecord } from '../../types';

export interface PassCardProps {
  record: RegistrationRecord;
  onClose?: () => void;
  onRegisterAnother?: () => void;
}

export const PassCard: React.FC<PassCardProps> = (props) => {
  return <Ticket {...props} />;
};

export { Ticket };
export default PassCard;
