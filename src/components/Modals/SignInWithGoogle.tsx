
import { auth } from "@/firebase/firebase";
import {signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';


const provider = new GoogleAuthProvider();

export const SignInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};