import React from 'react';
import TicketForm from './TicketForm';

const UserHome = ({ usuario }) => {
  return (
    <div className="user-home">
      <TicketForm usuario={usuario} />
    </div>
  );
};

export default UserHome;