import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./firebase-config";

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "complaints", `${Date.now()}`), data, {
    merge: true,
  });
};

export const getAllComplaints = async () => {
  const books = await getDocs(
    query(collection(firestore, "complaints"), orderBy("id", "desc"))
  );
  return books.docs.map((doc) => doc.data());
};

export const deleteComplaint = async (id) => {
  await deleteDoc(doc(firestore, "complaints", id));
};
