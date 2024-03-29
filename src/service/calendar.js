import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  orderBy,
  onSnapshot,
  setDoc,
  query,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { getAuth } from "firebase/auth"; // Importa la función getAuth desde tu módulo de autenticación

// Función para guardar un calendario para un usuario específico
export async function calendarSave(calendarData) {
  const auth = getAuth(); // Utiliza la función getAuth del módulo de autenticación
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const userId = user.uid;
  const userCalendarsRef = collection(db, `users/${userId}/calendars`);
  console.log('userCalendarsRef', userCalendarsRef); // Verifica la referencia a la base de datos
  return addDoc(userCalendarsRef, {
    ...calendarData,
    created_at: serverTimestamp(),
  });
}


// Función para suscribirse a cambios en los calendarios
export function calendarSubscribeToChanges(callback, user_id) {
  const auth = getAuth(); // Utiliza la función getAuth del módulo de autenticación
  const user = auth.currentUser;
  if (!user && !user_id) {
    throw new Error('User is not aaa');
  }

  let userId;
  
  if(user_id) userId = user_id;
  else userId = user.uid;

  const userCalendarsRef = collection(db, `users/${userId}/calendars`);
  const q = query(userCalendarsRef, orderBy('created_at'));
  onSnapshot(q, (snapshot) => {
    const calendars = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    callback(calendars);
  }, (error) => {
    console.error("Error fetching snapshot:", error);
  });
}


export async function calendarUpdate( calendarId, newData) {
  const auth = getAuth(); // Utiliza la función getAuth del módulo de autenticación
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }
  const userId = user.uid;

  console.log("Updating calendar with ID:", calendarId);
  const userCalendarsRef = collection(db, `users/${userId}/calendars`);
  const calendarDocRef = doc(userCalendarsRef, calendarId);

  try {
    await setDoc(calendarDocRef, newData, { merge: true });
    console.log(`Calendar with ID ${calendarId} successfully updated in the database.`);
  } catch (error) {
    console.error(`Error updating calendar with ID ${calendarId}:`, error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

export async function calendarDelete(calendarId) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const userId = user.uid;
  const userCalendarsRef = doc(db, `users/${userId}/calendars/${calendarId}`);

  try {
    await deleteDoc(userCalendarsRef);
    console.log(`Calendar with ID ${calendarId} successfully deleted from database.`);
  } catch (error) {
    console.error("Error deleting calendar:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}