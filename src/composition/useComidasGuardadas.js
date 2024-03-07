import { ref } from 'vue';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export function useComidasGuardadas() {
  const comidasGuardadas = ref([]);

  const auth = getAuth();
  const usuario = auth.currentUser;

  if (usuario) {
    const db = getFirestore();
    const docRef = doc(db, 'foodsave', usuario.uid);
  
    onSnapshot(docRef, (doc) => {
      console.log('Snapshot del documento:', doc.data());
      if (doc.exists()) {
        comidasGuardadas.value = doc.data().comidas || [];
        console.log('Comidas guardadas:', comidasGuardadas.value);
      }
    });
  }
  
  return { comidasGuardadas };
}