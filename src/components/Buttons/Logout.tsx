'use client';

import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";
import { useSetRecoilState } from "recoil";


const Logout: React.FC = () => {
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	// const router = useRouteE();
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
	const [signOut, loading, error] = useSignOut(auth);

	const handleLogout = () => {
		signOut();
	};

	return (
	
	<Link
		href='/auth'
		onClick={() => setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }))}
	>

		<button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-white' onClick={handleLogout}>
			<FiLogOut />
		</button>
		</Link>
	);
};
export default Logout;
