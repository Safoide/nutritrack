import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  orderBy,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";

const refFood = collection(db, 'food');

export function foodSave(foodData) {
  return addDoc(refFood, {
    ...foodData,
    created_at: serverTimestamp(),
  });
}

export function foodSubscribeToChanges(callback) {
  const q = query(refFood, orderBy('created_at'));
  onSnapshot(q, (snapshot) => {
    const food = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    callback(food);
  });
}

export function foodDelete(foodId) {
  const foodDocRef = doc(refFood, foodId);

  deleteDoc(foodDocRef);
}
