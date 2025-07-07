import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../services/firebase';

const TicketForm = ({ usuario }) => {
  const [equipo, setEquipo] = useState('');
  const [marca, setMarca] = useState('');
  const [problema, setProblema] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [area, setArea] = useState('');

  const enviarTicket = async () => {
    if (equipo && marca && problema && descripcion && area) {
      try {
        await addDoc(collection(db, "tickets"), {
          equipo,
          marca,
          problema,
          descripcion,
          area,
          usuario: usuario.email,
          fecha_creacion: serverTimestamp(),
          estado: 'Pendiente'
        });
        toast.success('✅ Ticket enviado correctamente');
        setEquipo('');
        setMarca('');
        setProblema('');
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
    <div className="ticket-form" style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>🛠️ Levantar Ticket</h2>

      <select value={equipo} onChange={e => setEquipo(e.target.value)}>
        <option value="">Selecciona el tipo de equipo</option>
        <option value="Laptop">Laptop</option>
        <option value="Celular">Celular</option>
        <option value="Impresora">Impresora</option>
        <option value="Otro">Otro</option>
      </select><br /><br />

      {equipo && (
        <>
          <input
            placeholder={`Marca del ${equipo.toLowerCase()}`}
            value={marca}
            onChange={e => setMarca(e.target.value)}
          /><br /><br />

          <select value={problema} onChange={e => setProblema(e.target.value)}>
            <option value="">Selecciona el problema</option>
            {equipo === 'Laptop' && (
              <>
                <option value="No enciende">No enciende</option>
                <option value="Va muy lenta">Va muy lenta</option>
                <option value="Pantalla dañada">Pantalla dañada</option>
              </>
            )}
            {equipo === 'Celular' && (
              <>
                <option value="No carga">No carga</option>
                <option value="Pantalla rota">Pantalla rota</option>
                <option value="Problemas de señal">Problemas de señal</option>
              </>
            )}
            {equipo === 'Impresora' && (
              <>
                <option value="No imprime">No imprime</option>
                <option value="Atascos de papel">Atascos de papel</option>
                <option value="Sin conexión">Sin conexión</option>
              </>
            )}
            {equipo === 'Otro' && (
              <option value="Otro problema">Otro problema</option>
            )}
          </select><br /><br />
        </>
      )}

      <textarea
        placeholder="Describe con más detalle el problema"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        rows={4}
      /><br /><br />

      <input
        placeholder="Área, piso o planta"
        value={area}
        onChange={e => setArea(e.target.value)}
      /><br /><br />

      <button onClick={enviarTicket}>Enviar Ticket</button>
    </div>
  );
};

export default TicketForm;
