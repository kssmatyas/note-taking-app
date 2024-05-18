import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, limit, query, setDoc, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from '../../enviroments/enviromnet';
import { User } from '../models/user.model';


@Injectable({
   providedIn: 'root'
})
export class FirebaseService {
  public firebaseApp = initializeApp(firebaseConfig);
  public auth = getAuth(this.firebaseApp);
  public db = getFirestore(this.firebaseApp);
  public storage = getStorage(this.firebaseApp);


  constructor (private router: Router) {}

    login(email: string, password: string) {
        signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          console.log('Sikeres login!');
          localStorage.setItem('email', JSON.stringify(email));
          const user = userCredential.user;
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.log('Sikertelen login!');

          const errorCode = error.code;
           const errorMessage = error.message;
        });
      }

    register(email: string, password: string) {
      createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Sikeres register!');
        this.saveUser(email);
        this.login(email, password);
      })
      .catch((error) => {
        console.log('Sikeretelen register!');

        const errorCode = error.code;
         const errorMessage = error.message;
      });
    }



    async getCurrentUser(): Promise<User> {
      const notes = collection(this.db, "users");
      const data = await getDocs(notes,);
  
      const email = JSON.parse(localStorage.getItem('email') as string);
      const q = query(collection(this.db, "users"), where("email", "==", email), limit(1));
  
     const querySnapshot = await getDocs(q);
  
     const result: User[] = [];
     querySnapshot.forEach((doc) => {
      result.push(doc.data() as User);
    });
  
      console.log(result);
    
      return result[0];
  

    }

    async saveUser(email: string) {

      const user: User = {
        email,
        registeredDate: new Date()
      };
  
      
      try {
        await setDoc(doc(this.db, "users", email), user);
        console.log('Sikeres user létrehozás');
      } catch (e) {
        console.log(e);
        throw e;
      }
  
   }

}