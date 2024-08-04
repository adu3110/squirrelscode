import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
// import CodeMirror from "@uiw/react-codemirror";
// import { vscodeDark, vscodeLight, vscodeLightInit, vscodeLightStyle } from "@uiw/codemirror-theme-vscode";
// // import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

import CodeEditorWindow from "./CodeEditorWindow";
import useKeyPress from "@/hooks/useKeyPress";
import LanguagesDropdown from "./LanguagesDropdown";
import  { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from "axios";
import { languageOptions } from "../constants/languageOptions";
import { statuses } from "../constants/statuses";




type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
	
}
interface Props {
	enterPress: boolean;
	ctrlPress: boolean;
  }

const javascriptDefault: string = `// some comment`;

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState(problem.starterCode);

	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

	const [settings, setSettings] = useState({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const [user] = useAuthState(auth);
	const {
		query: { pid },
	} = useRouter();

	const handleSubmit = async () => {
		if (!user) {
			toast.error("Please login to submit your code", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("Congrats! All tests passed!", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
				}
			}
		} catch (error: any) {
			console.log(error.message);
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("Oops! One or more test cases failed", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	};



	const [code, setCode] = useState(javascriptDefault);
	const [customInput, setCustomInput] = useState("");
	const [outputDetails, setOutputDetails] = useState();
	const [processing, setProcessing] = useState<boolean>(true);
	// const [theme, setTheme] = useState("cobalt");
	const [language, setLanguage] = useState(languageOptions[0]);
  
	const enterPress: boolean = useKeyPress("Enter");
	const ctrlPress: boolean = useKeyPress("Control");
  
	const onSelectChange = (sl: string): void => {
		console.log("selected Option...", sl);
		setLanguage(sl);
	};
  
	useEffect(() => {
	  if (enterPress && ctrlPress) {
		console.log("enterPress", enterPress);
		console.log("ctrlPress", ctrlPress);
		handleCompile();
	  }
	}, [ctrlPress, enterPress]);
  
	const onChange = (action: string, data: string) => {
	  switch (action) {
		case "code": {
		  setCode(data);
		  break;
		}
		default: {
		  console.warn("case not handled!", action, data);
		}
	  }
	};


	const handleCompile = () => {
		setProcessing(true);
		const formData = {
		  language_id: language.id,
		  // encode source code in base64
		  source_code: btoa(code),
		};
		const options = {
		  method: "POST",
		  url: process.env.NEXT_PUBLIC_RAPID_API_URL,
		  params: { base64_encoded: "true", fields: "*" },
		  headers: {
			"content-type": "application/json",
			"Content-Type": "application/json",
			"X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
			"X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
		  },
		  data: formData,
		};
	
		axios
		  .request(options)
		  .then(function (response) {
			console.log("res.data", response.data);
			const token = response.data.token;
			checkStatus(token);
		  })
		  .catch((err) => {
			let error = err.response ? err.response.data : err;
			// get error status
			let status = err.response.status;
			console.log("status", status);
			if (status === 429) {
			  console.log("too many requests", status);
	
			  showErrorToast(
				`Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
				10000
			  );
			}
			setProcessing(false);
			console.log("catch block...", error);
		  });
	  };
	

	  const checkStatus = async (token: string) => {
		const options = {
		  method: "GET",
		  url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
		  params: { base64_encoded: "true", fields: "*" },
		  headers: {
			"X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
			"X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
		  },
		};
		try {
		  let response = await axios.request(options);
		  let statusId = response.data.status?.id;
	
		  // Processed - we have a result
		  if (statusId === 1 || statusId === 2) {
			// still processing
			setTimeout(() => {
			  checkStatus(token);
			}, 2000);
			return;
		  } else {
			setProcessing(false);
			setOutputDetails(response.data);
			showSuccessToast(`Compiled Successfully!`);
			console.log("response.data", response.data);
			return;
		  }
		} catch (err) {
		  console.log("err", err);
		  setProcessing(false);
		  showErrorToast();
		}
	  };

const showSuccessToast = (msg: string): void => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
};

const showErrorToast = (msg: string, timer: number): void => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
};
	

	











	return (
		<div className='flex flex-col bg-sky-950 relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings} />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60} bg-sky-900>
		
				<div className='w-full overflow-auto bg-sky-950'>
				<CodeEditorWindow code = {code} onChange={onChange} language={language?.value}/>
				</div>
				<div className='w-full px-5 overflow-auto'>
					{/* testcase heading */}
					<div className='flex h-10 items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>

					<div className='flex'>
						{problem.examples.map((example, index) => (
							<div
								className='mr-2 items-start mt-2 '
								key={example.id}
								onClick={() => setActiveTestCaseId(index)}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
									>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='font-semibold my-4'>
						<p className='text-sm font-medium mt-4 text-white'>Input:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem.examples[activeTestCaseId].inputText}
						</div>
						<p className='text-sm font-medium mt-4 text-white'>Output:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem.examples[activeTestCaseId].outputText}
						</div>
					</div>
				</div>
			</Split>
			<EditorFooter handleSubmit={handleCompile} />
		</div>
	);
};
export default Playground;
