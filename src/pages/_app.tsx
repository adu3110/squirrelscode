import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps }: AppProps) {
  return (
	

    <RecoilRoot>
		<SessionProvider session={pageProps.session}>
    <Head>
				<title>SquirrelsCode</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.png' />
				<meta
					name='description'
					content='Web application that contains dsa problems and solutions'
				/>
			</Head>
			<ToastContainer/>
	
    <Component {...pageProps} />
	</SessionProvider>
    </RecoilRoot>
	
  )
}
