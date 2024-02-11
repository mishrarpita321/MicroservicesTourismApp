
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { FacebookAuthProvider } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyAetKjdJiAU830qxZU8JupJr3O9bQDNSm0",
  authDomain: "login-b8607.firebaseapp.com",
  projectId: "login-b8607",
  storageBucket: "login-b8607.appspot.com",
  messagingSenderId: "184046916247",
  appId: "1:184046916247:web:d87bd6505fd115c068cfd2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Removed export keyword from here
const provider = new FacebookAuthProvider();

export { auth, provider }; 

