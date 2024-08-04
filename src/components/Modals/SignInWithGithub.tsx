import React from 'react';
import { auth } from "@/firebase/firebase";
import {signInWithPopup,GithubAuthProvider} from 'firebase/auth';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { error } from 'console';

const provider = new GithubAuthProvider();

export const SignInWithGithub = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

