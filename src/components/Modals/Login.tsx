'use client';

import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { PointerEventHandler, ReactEventHandler, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import Image from "next/image";


import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
// import { useSession, signIn} from "next-auth/react"
import {signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import {SignInWithGoogle}  from "./SignInWithGoogle";

import {SignInWithGithub}  from "./SignInWithGithub";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = (type: "login" | "register" | "forgotPassword") => {
		setAuthModalState((prev) => ({ ...prev, type }));
	};
	const [inputs, setInputs] = useState({ email: "", password: "" });
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
	const router = useRouter();
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password) return alert("Please fill all fields");
		try {
			const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);

			if (!newUser) return;
			router.push("/");
		} catch (error: any) {
			toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "light" });
		}
	};
	useEffect(() => {
		if (error) toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "light" });
	}, [error]);

	// const[show, setShow] = useState(false);

	
	
	
		
	
	

	






		

	return (
		<form className='space-y-6 px-6 pb-4' onSubmit={handleLogin}>
			<h3 className='text-xl font-semibold text-black font-mono'>Sign in to SquirrelsCode</h3>
			<div>
				<label htmlFor='email' className='text-sl font-medium block mb-2 text-gray-500'>
					Your Email
				</label>
				
				<input
					onChange={handleInputChange}
					type='email'
					name='email'
					id='email'
					className='
					w-full flex items-center font-semibold justify-center h-10 px-6 mt-4 text-xl  transition-colors duration-300 bg-gray-200 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    
        '	
					placeholder='email'
				/>
				{/* <span className="pointer-events-none w-8 h-8 absolute top-40 transform -translate-y-3 right-6 text-gray-500 focus:#2563eb">
					<HiAtSymbol size={20}/>
				</span> */}
			</div>
			<div>
				<label htmlFor='password' className='text-sl font-medium block mb-2 text-gray-500'>
					Your Password
				</label>
				<input
					onChange={handleInputChange}
					type='password'
					name='password'
					id='password'
					className='
					w-full flex items-center font-semibold justify-left h-10 px-6 mt-4 text-xl  transition-colors duration-300 bg-gray-200 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    
        '
					placeholder="password"
				/>
				{/* <span className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-10 right-6 text-gray-500 focus-within:text-dark-peach" onClick={()=>setShow(!show)}>
					<HiFingerPrint size={20}/>
				</span> */}
			</div>

			<button
				type='submit'
				className='w-full flex items-center justify-center font-semibold h-10 px-6 mt-4 text-sl  transition-colors duration-300 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
				bg-light-peach hover:bg-light-peach-s
            '
			>
				{loading ? "Loading..." : "Log In"}
			</button>


			<button onClick={SignInWithGoogle}
				type='button'
				className='w-full flex items-center justify-center font-semibold h-10 px-6 mt-4 text-sl transition-colors duration-300 bg-white border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200
    '
			>
				Sign in with Google <img src={"/google.svg"} width={20} height={20}/>
			</button>

			<button onClick={SignInWithGithub}
				type='button'
				className= 'w-full flex items-center justify-center font-semibold h-10 px-6 mt-4 text-sl transition-colors duration-300 bg-white border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200'
				>
				Sign In with Github <img src={"/github.svg"} width={20} height={20}/>
			</button> 

			
			<button className='flex w-full justify-end' onClick={() => handleClick("forgotPassword")}>
				<a href='#' className='text-sm block text-light-peach hover:underline w-full text-right'>
					Forgot Password?
				</a>
			</button>
			<div className='text-sm font-medium text-gray-300'>
				Not Registered?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={() => handleClick("register")}>
					Create account
				</a>
			</div>
		</form>
	);
};
export default Login;
