
import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, type: "login" }));
	};
	const [inputs, setInputs] = useState({ email: "", Name: "", password: "" });
	const router = useRouter();
	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth); 
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password || !inputs.Name) return alert("Please fill all fields");
		try {
			toast.loading("Creating your account", {position: "top-center", toastId: "loadingToast", autoClose: 3000, theme: "light"});
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;
			const userData = {
				uid: newUser.user.uid,
				email: newUser.user.email,
				Name: inputs.Name,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solvedProblems: [],
				starredProblems: [],
			};
			await setDoc(doc(firestore, "users", newUser.user.uid), userData);
			router.push("/");
		} catch (error: any) {
			toast.error(error.message, { position: "top-center" });
		} finally {
			toast.dismiss("loadingToast");
		}
	};

	useEffect(() => {
		if (error) alert(error.message);
	}, [error]);

	return (
		<form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
			<h3 className='text-xl font-semibold text-black font-mono'>Register to SquirrelsCode</h3>
			<div>
				<label htmlFor='email' className='text-sl font-medium block mb-2 text-gray-500'>
					Email
				</label>
				<input
					onChange={handleChangeInput}
					type='email'
					name='email'
					id='email'
					className='
					w-full flex items-center font-semibold justify-left h-10 px-6 mt-4 text-xl  transition-colors duration-300 bg-gray-200 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"

    '
					placeholder='name@company.com'
				/>
			</div>
			<div>
				<label htmlFor='Name' className='text-sm font-medium block mb-2 text-gray-500'>
					Name
				</label>
				<input
					onChange={handleChangeInput}
					type='Name'
					name='Name'
					id='Name'
					className='
					w-full flex items-center font-semibold justify-left h-10 px-6 mt-4 text-xl  transition-colors duration-300 bg-gray-200 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"

    '
					placeholder='John Doe'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-500'>
					Password
				</label>
				<input
					onChange={handleChangeInput}
					type='password'
					name='password'
					id='password'
					className='
					w-full flex items-center font-semibold justify-left h-10 px-6 mt-4 text-xl  transition-colors duration-300 bg-gray-200 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"

    '
					placeholder='*******'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-500'>
					Confirm Password
				</label>
				<input
					onChange={handleChangeInput}
					type='password'
					name='password'
					id='password'
					className='
					w-full flex items-center font-semibold justify-left h-10 px-6 mt-4 text-xl  transition-colors duration-300 bg-gray-200 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"

    '
					placeholder='*******'
				/>
			</div>

			<button
				type='submit'
				className='w-full flex items-center justify-center font-semibold h-10 px-6 mt-4 text-sl  transition-colors duration-300 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
				bg-light-peach hover:bg-light-peach-s
        '
			>
				{loading ? "Registering..." : "Register"}
			</button>

			<div className='text-sm font-medium text-gray-300'>
				Already have an account?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
					Log In
				</a>
			</div>
		</form>
	);
};
export default Signup;
