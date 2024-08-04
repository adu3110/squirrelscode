import { auth } from "@/firebase/firebase";
import Link from "next/link";

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { Button, Typography } from "@mui/material";
import '@fontsource/pacifico';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import RocketIcon from '@mui/icons-material/Rocket';

// import {Roadmap} from "../Roadmaps/Roadmap";
// import { Route, Routes, useNavigate } from 'react-router-dom';

import { usePathname } from 'next/navigation'


type TopbarProps = {
	problemPage?: boolean;
};
const theme = createTheme({
	typography: {
	  fontFamily: "pacifico",
	  fontSize: 17

	}
  });
const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
	const handleProblemChange = (isForward: boolean) => {
		const { order } = problems[router.query.pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);

		if (isForward && !nextProblemKey) {
			const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
			router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && !nextProblemKey) {
			const lastProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === Object.keys(problems).length
			);
			router.push(`/problems/${lastProblemKey}`);
		} else {
			router.push(`/problems/${nextProblemKey}`);
		}
	};


	
	// const navigate = useNavigate();
	// const RoadMapClick = () =>{
		
	// 	// event.preventDefault();
	// 	const path = "/Rodmap";
  	// 	navigate(path);
  	// };
	

	  const pathname = usePathname();


	return (
		<nav className='relative flex h-[60px] w-full shrink-0 items-center px-4 bg-dark-blue-n text-white'>
			<div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
				{/* <Link href='/' className='lex items-center justify-center h-20'>
					<Image src='/BlackWhite.png' alt='BlackWhite' height={150} width={150} />
				</Link> */}
				<Link href='/' className='flex items-center justify-center  h-10'>
					<Image src='/squirrels.png' alt='squirrels' height={50} width={50} />
				</Link>
				{problemPage && (
					<div className='flex items-center gap-4 flex-1 justify-center'>
						<div
							className='flex items-center justify-center rounded bg-light-peach hover:bg-light-peach h-8 w-8 cursor-pointer'
							onClick={() => handleProblemChange(false)}
						>
							<FaChevronLeft />
						</div>
						<Link
							href='/'
							className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-2 cursor-pointer'
						>
							<div>
								<BsList />
							</div>
							<p>Problem List</p>
						</Link>
						<div
							className='flex items-center justify-center rounded bg-light-peach hover:bg-light-peach h-8 w-8 cursor-pointer'
							onClick={() => handleProblemChange(true)}
						>
							<FaChevronRight />
						</div>
					</div>
				)}
				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<div>

						<Link
							className={`link ${pathname === '/Roadmap' ? 'active' : ''}`}
							href="/Roadmap"
							target="_blank">
							<Button color="inherit" variant="outlined" sx={{ textTransform: 'capitalize', m: 1 }} startIcon={<RocketIcon />}>RoadMap</Button>
							</Link>

					</div>
				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<div>
						
						<Link
							href='https://buymeacoffee.com/aduaditi17a' 
							target="_blank">
							<ThemeProvider theme={theme}>
							<Button color="inherit" variant="outlined" sx={{ textTransform: 'capitalize', m: 1 }} startIcon={<FreeBreakfastIcon />} onClick={handleClick}>Buy me Coffee</Button>
							</ThemeProvider>
							</Link>
							
					</div>
					{!user && (
						<Link
							href='/auth'
							onClick={() => setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }))}
						>
							<Button color="inherit" variant="outlined" onClick={handleClick}>Login</Button>
						</Link>
					)}
					{user && problemPage && <Timer />}
					{user && (
						<div className='cursor-pointer group relative'>
							<Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
							<div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-white text-white p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>
					)}
					{user && <Logout />}
				</div>
			</div>
			</div>
			
		</nav>
	);
};
export default Topbar;
