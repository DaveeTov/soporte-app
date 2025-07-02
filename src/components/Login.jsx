// src/components/Login.jsx
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../services/firebase';
import '../styles/login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const correosAdmin = [
    'davidtovarangel@gmail.com',
    'soportemacro2025@gmail.com'
  ];

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMsg('');
      const isAdmin = correosAdmin.includes(email);
      toast.success(`Bienvenido ${isAdmin ? 'Administrador' : 'Usuario'}`);
      onLogin(isAdmin); // ✅ se pasa el valor de admin
    } catch (error) {
      setErrorMsg('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-card">
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
