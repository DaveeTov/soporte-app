import { saveAs } from 'file-saver';
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import CalendarView from './CalendarView';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'tickets'), orderBy('fecha_creacion', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const ticketsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fecha: doc.data().fecha_creacion?.toDate() || new Date(),
      }));
      setTickets(ticketsData);
    });
    return () => unsubscribe();
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    await updateDoc(doc(db, 'tickets', id), { estado: nuevoEstado });
  };

  const exportarPDF = () => {
    const docPDF = new jsPDF();
    docPDF.text("Historial de Tickets", 10, 10);
    tickets.forEach((t, i) => {
      docPDF.text(`${i + 1}. ${t.usuario} - ${t.area} - ${t.estado}`, 10, 20 + i * 10);
    });
    docPDF.save("historial_tickets.pdf");
  };

  const exportarXML = () => {
    const xmlContent =
      `<tickets>\n` +
      tickets.map(t =>
        `  <ticket>\n` +
        `    <usuario>${t.usuario}</usuario>\n` +
        `    <area>${t.area}</area>\n` +
        `    <descripcion>${t.descripcion}</descripcion>\n` +
        `    <fecha>${t.fecha.toISOString()}</fecha>\n` +
        `    <estado>${t.estado}</estado>\n` +
        `  </ticket>`
      ).join("\n") + `\n</tickets>`;
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    saveAs(blob, 'historial_tickets.xml');
  };

  const eventos = tickets.map(t => ({
    title: `${t.estado}: ${t.area}`,
    start: t.fecha,
    end: new Date(t.fecha.getTime() + 60 * 60 * 1000),
    allDay: false
  }));

  return (
    <div className="admin-dashboard">
      <h2>Dashboard de Tickets</h2>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={exportarPDF}>📄 Exportar PDF</button>
        <button onClick={exportarXML} style={{ marginLeft: '10px' }}>📁 Exportar XML</button>
      </div>

      <CalendarView eventos={eventos} />

      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id} className="ticket-item">
            <strong>{ticket.usuario}</strong> - {ticket.area}<br />
            {ticket.descripcion}<br />
            <div className="ticket-meta">{ticket.fecha.toLocaleString()}</div>
            <select value={ticket.estado} onChange={(e) => actualizarEstado(ticket.id, e.target.value)}>
              <option>Pendiente</option>
              <option>En progreso</option>
              <option>Completado</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
