import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify'; // ✅ Importar toast
import { db } from '../services/firebase';

const TicketForm = ({ usuario }) => {
  const [descripcion, setDescripcion] = useState('');
  const [area, setArea] = useState('');

  const enviarTicket = async () => {
    if (descripcion && area) {
      try {
        await addDoc(collection(db, "tickets"), {
          descripcion,
          area,
          usuario: usuario.email,
          fecha_creacion: serverTimestamp(),
          estado: 'Pendiente'
        });
        toast.success('✅ Ticket enviado correctamente');
        setDescripcion('');
        setArea('');
      } catch (error) {
        toast.error('❌ Error al enviar el ticket');
      }
    } else {
      toast.warn('⚠️ Por favor, completa todos los campos');
    }
  };

  return (
    <div className="ticket-form">
      <h2>Levantar Ticket</h2>
      <input
        placeholder="Área, piso o planta"
        value={area}
        onChange={e => setArea(e.target.value)}
      /><br />
      <textarea
        placeholder="Describe tu problema"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      /><br />
      <button onClick={enviarTicket}>Enviar Ticket</button>
    </div>
  );
};

export default TicketForm;
