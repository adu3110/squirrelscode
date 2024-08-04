import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import index1 from "../index1";
import Footer from '@/components/Modals/Footer/Footer'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
	const authModal = useRecoilValue(authModalState);
	const [user, loading, error] = useAuthState(auth);
	const [pageLoading, setPageLoading] = useState(true);
	const router = useRouter();
	const theme = createTheme({
		typography: {
		  fontFamily: "pacifico",
		  fontSize: 17
	
		}
	  });

	useEffect(() => {
		if (user) router.push("/");
		if (!loading && !user) setPageLoading(false);
	}, [user, router, loading]);

	if (pageLoading) return null;

	return (
		<div className='bg-white h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
				<div className='flex items-center justify-center h-[calc(110vh-5rem)] pointer-events-none select-none'>
				{/* <ThemeProvider theme={theme}>
					<a color="inherit" sx={{ textTransform: 'capitalize', m: 1 }} >Hello Bright Mind, and welcome to the Squirrels Community!
						We are thrilled to have you join our vibrant and dynamic group. Whether you're a seasoned expert or just beginning your journey, there's a place for everyone in our community. 
						Welcome aboard!
						Login In to access our content</a>
					</ThemeProvider> */}
					<Image src='/SquirrelsMessage2.png' alt='SquirrelsMessage2' width={700} height={700} />
				</div>
				{authModal.isOpen && <AuthModal />}
			{/* <index1/> */}
			</div>
			<Footer/>
		</div>
	);
};
export default AuthPage;