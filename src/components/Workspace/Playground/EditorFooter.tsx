import React from "react";
import { BsChevronUp } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import { languageOptions } from "../constants/languageOptions";
import { useState, useEffect } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import useKeyPress from "@/hooks/useKeyPress";
import { statuses } from "../constants/statuses";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";





type EditorFooterProps = {
	handleSubmit: () => void;
	handleCompile: () => void;
};


const EditorFooter: React.FC<EditorFooterProps> = () => {

const javascriptDefault: string = `// some comment`;
const [code, setCode] = useState<string>(javascriptDefault);
  const [customInput, setCustomInput] = useState<string>("");
  const [outputDetails, setOutputDetails] = useState<any>(null);
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<string>("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress: boolean = useKeyPress("Enter");
  const ctrlPress: boolean = useKeyPress("Control");

  const onSelectChange = (sl: typeof languageOptions) => {
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
		<div className='flex bg-sky-950 absolute bottom-0 z-10 w-full'>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				<div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
					<button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>
						Console
						<div className='ml-1 transform transition flex items-center'>
							<BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
						</div>
					</button>
				</div>
				<div className='ml-auto flex items-center space-x-4'>
					<button
						className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg'
						onClick={handleCompile}
					>
						Run
					</button>
					<button
						className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg'
						onClick={handleCompile}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;
