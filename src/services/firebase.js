import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_cjwVJdTbbnHZVT_5KrVUeHoBehVx2P0",
  authDomain: "soporte-macro.firebaseapp.com",
  projectId: "soporte-macro",
  storageBucket: "soporte-macro.appspot.com",
  messagingSenderId: "217807452212",
  appId: "1:217807452212:web:00cdbe929610197a4e7261",
  measurementId: "G-QTBW2KLKXZ"
};

// ✅ Solución: usar getApps() para evitar inicialización duplicada
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
