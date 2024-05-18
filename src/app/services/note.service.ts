import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Note } from '../models/note.model';
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private nextId = 1;

  constructor(private firebaseService: FirebaseService) {}

  async getAllNotes(): Promise<Note[]> {
    const notes = collection(this.firebaseService.db, "notes");
    const data = await getDocs(notes,);

    const email = JSON.parse(localStorage.getItem('email') as string);      
    const q = query(collection(this.firebaseService.db, "notes"), where("email", "==", email), orderBy("createdAt", "desc"));

   const querySnapshot = await getDocs(q);


   const result: Note[] = [];
   querySnapshot.forEach((doc) => {
    result.push(doc.data() as Note);
  });

  console.log(result);
  
    return result;
  }

  async getNoteById(id: string): Promise<Note> {
    const notes = collection(this.firebaseService.db, "notes");
    const data = await getDocs(notes,);

    const q = query(collection(this.firebaseService.db, "notes"), where("id", "==", id));

   const querySnapshot = await getDocs(q);

  
   const result: Note[] = [];
   querySnapshot.forEach((doc) => {
    result.push(doc.data() as Note);
  });

    console.log(result);
  
    return result[0];


  }

  async createNote(title: string, content: string): Promise<Note> {    
    const email = JSON.parse(localStorage.getItem('email') as string);

    const id = Date.now().toString();

    const newNote: Note = {
      id,
      title,
      content,
      createdAt: new Date(),
      email: email
    };

    
    try {
      await setDoc(doc(this.firebaseService.db, "notes", id), newNote);
      console.log('Sikeres létrehozás');
    } catch (e) {
      console.log(e);
      throw e;
    }


    return newNote;
  }

  async updateNote(id: string, title: string, content: string): Promise<void> {
    const notesRef = doc(this.firebaseService.db, "notes", id);
    await updateDoc(notesRef, { title, content });
  }

  async deleteNote(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(this.firebaseService.db, "notes", id));
      console.log('Sikeres törlés!');
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
