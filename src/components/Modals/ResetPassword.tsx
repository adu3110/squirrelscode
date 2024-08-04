import { auth } from "@/firebase/firebase";
import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		if (success) {
			toast.success("Password reset email sent", { position: "top-center", autoClose: 3000, theme: "light" });
		}
	};

	useEffect(() => {
		if (error) {
			alert(error.message);
		}
	}, [error]);
	return (
		<form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8' onSubmit={handleReset}>
			<h3 className='text-xl font-semibold font-mono text-black'>Reset Password</h3>
			<p className='text-sm text-black '>
				Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
				to reset it.
			</p>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-500'>
					Your email
				</label>
				<input
					type='email'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
					id='email'
					className='w-full flex items-center font-semibold justify-left h-10 px-6 mt-4 text-xl  transition-colors duration-300 bg-gray-200 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"

    '
					placeholder='name@company.com'
				/>
			</div>

			<button
				type='submit'
				className={`w-full flex items-center justify-center font-semibold h-10 px-6 mt-4 text-sl  transition-colors duration-300 border-2 border-dark-gray-7 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
				bg-light-peach hover:bg-light-peach-s `}
			>
				Reset Password
			</button>
		</form>
	);
};
export default ResetPassword;
