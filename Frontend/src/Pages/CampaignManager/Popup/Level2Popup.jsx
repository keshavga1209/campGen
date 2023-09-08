import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FcNext, FcPrevious } from "react-icons/fc";
import { TfiReload } from "react-icons/tfi";
import { FiRefreshCw } from "react-icons/fi";
import {RiAiGenerate} from 'react-icons/ri'

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import reloadImg from "../../../Assets/reload-img.png";
import { request } from "../../../Utils/request";
import endpoints from "../../../Utils/endpoints";
import Loader from "../../../Components/Loader";

export default function Level2Prompt({ setCreatePopup, setLevel}) {
	const [text, setText] = useState("");

	const [currPrompt, setCurrPrompt] = useState(0);
	const [optimized_prompt_result, set_optimized_prompt_result] = useState(null)
	const [isLoading, setIsLoading] = useState(false);

	const getOptimizedPrompt = async () => {
		setIsLoading(true)
		const [err, res] = await request(
			'POST', 
			endpoints.OPTIMIZED_PROMPT, 
			{
				prompt: localStorage.getItem('prompt')
			}
		) 
		if (err==='network_error'){
			window.alert('check your network and try again')
			return
		}
		if (err!==null){
			window.alert(JSON.stringify(err))
			return
		}
		set_optimized_prompt_result(res)	
		setText(res?.['items']?.[currPrompt]?.['text'])
		// TODO : temporary bypass
		// set_optimized_prompt_result({
		//   "cost": 0.08,
		//   "items": [
		// 	{
		// 	  "text": localStorage.getItem('prompt')
		// 	},
		//   ],
		//   "missing_information": "nothing :)",
		//   "status": "success"
		// })	
		setIsLoading(false)
	}

	useEffect(()=>{getOptimizedPrompt()}, [])

	if(isLoading) return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center justify-center">
				<Loader />
			</div>
		</div>
	);

	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[22rem] w-[38rem] shadow-lg flex flex-col items-center">
				<button
					className="cursor-pointer absolute top-2 h-7 left-2 bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3"
					onClick={(_) => setLevel(1)}>
					<FcPrevious />
					Back
				</button>
				<span
					className="cursor-pointer absolute top-2 right-2"
					onClick={(_) => setCreatePopup(false)}>
					{" "}
					<IoCloseCircle size={"25px"} />{" "}
				</span>
				<h1
					className={`p-2 text-lg text-gray-400 w-full text-center border-b border-gray-300`}>
					{/* {listening ? "Listening..." : "Click mic to speak"} */}
					These are the prompts:
				</h1>
				<button
					className="bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
					onClick={(_) =>{
						const idx = (currPrompt + 1) % optimized_prompt_result['items'].length
						setCurrPrompt(idx)
						setText(optimized_prompt_result?.['items']?.[idx]?.['text'])
					}}>
					<TfiReload />
					Another prompt
				</button>
				<textarea
					className="bg-gray-200 rounded-lg p-2 mx-1 mt-4 grow-x"
					value={text}
					onChange={(e) => setText(e.target.value)}
					rows={3}
					cols={58}
					// placeholder=""
				/>

				<p className="bg-yellow-400/50 rounded-lg p-2 w-[33rem] mt-4 h-[5rem] overflow-y-auto">
					<b>Add-ons :</b> {optimized_prompt_result?.['missing_information']}
				</p>

				<div className="flex gap-2">
					<button
						className="cursor-pointer  h-7 bg-red-500 hover:bg-red-400 text-white flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
						onClick={(_) => setLevel(1)}>
						{/* <FcPrevious /> */}
						<FiRefreshCw />
						Rewrite Query
					</button>

					<button
						className="cursor-pointer  h-7 bg-green-500 hover:bg-green-400 text-white flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
						onClick={(_) => {
							localStorage.setItem('optimized_prompt', optimized_prompt_result?.['items']?.[currPrompt]?.['text'])
							setLevel(3)
						}}>
						{/* <FcPrevious /> */}
						<RiAiGenerate />
						Generate Campaign
					</button>
				</div>

				{/* </div> */}
			</div>
		</div>
	);
}
