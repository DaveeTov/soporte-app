import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import UserHome from './components/UserHome';
import { auth } from './services/firebase';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const correosAdmin = [
    'davidtovarangel@gmail.com',
    'soportemacro2025@gmail.com'
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setIsAdmin(correosAdmin.includes(user.email));
      } else {
        setUsuario(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.info('Sesión cerrada');
  };

  if (!usuario) return <Login onLogin={() => {}} />;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
        <button onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </div>
      {isAdmin ? <AdminDashboard usuario={usuario} /> : <UserHome usuario={usuario} />}
      <ToastContainer />
    </div>
  );
}

export default App;
