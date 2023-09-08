import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FcPrevious } from "react-icons/fc";
import { FiRefreshCw } from "react-icons/fi";
import {FaRegCopy} from "react-icons/fa6";

import { BsCloudCheck, BsDownload } from "react-icons/bs";
import imgSrc3 from '../../../Assets/genpictures (3).png'
import Loader from "../../../Components/Loader";
import { request } from "../../../Utils/request";
import endpoints from "../../../Utils/endpoints";

export default function Level3Prompt({ setCreatePopup, setLevel }) {

	const [text, setText] = useState('')
	const [generatedContent, setGeneratedContent] = useState(null)
	const [isLoading, setIsLoading] = useState(false);

	async function copyTextToClipboard(text) {
	  if ('clipboard' in navigator) {
		return await navigator.clipboard.writeText(text);
	  } else {
		return document.execCommand('copy', true, text);
	  }
	}

	const generateCampaign = async () => {
		setIsLoading(true)
		const [err, res] = await request(
			'POST', 
			endpoints.GENERATE_CAMPAIGN, 
			{
				prompt: localStorage.getItem('optimized_prompt')
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
		setText(res?.['caption'] || '')
		setGeneratedContent(res)	
		setIsLoading(false)
	}

	useEffect(()=>{generateCampaign()}, [])


	if(isLoading) return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center justify-center">
				<Loader />
			</div>
		</div>
	);

	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[42rem] w-[30rem] shadow-lg flex flex-col items-center">
				<button
					className="cursor-pointer absolute top-2 h-7 left-2 bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3"
					onClick={(_) => setLevel(2)}>
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
					Generated Campaign
				</h1>

				<h2
					className={`pt-2 text-md w-full text-center`}>
					Generated Image <BsDownload className="ml-2 inline cursor-pointer" onClick={_=>console.log('download')}/>
				</h2>

				<img className="mt-1" src={generatedContent?.['img_url']} width={400}/>

				<h2
					className={`pt-2 text-md w-full text-center`}>
					Generated Content <FaRegCopy className="ml-2 inline cursor-pointer" onClick={_=>{copyTextToClipboard(text);alert('copied to clipboard')}}/>

				</h2>

				<textarea
					className="bg-gray-200 rounded-lg p-2 mt-1 grow-x"
					value={text}
					onChange={(e) => setText(e.target.value)}
					rows={3}
					cols={42}
					// placeholder=""
				/>

				<div className="flex gap-2">
					<button
						className="cursor-pointer  h-7 bg-red-500 hover:bg-red-400 text-white flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
						onClick={(_) => generateCampaign()}>
						{/* <FcPrevious /> */}
						<FiRefreshCw />
						Regenerate
					</button>

					<button
						className="cursor-pointer  h-7 bg-green-500 hover:bg-green-400 text-white flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
						onClick={(_) => {
							localStorage.setItem('img_base_64', generatedContent?.['img_url'])
							localStorage.setItem('caption', generatedContent?.['caption'])
							setLevel(4)
						}}>
						{/* <FcPrevious /> */}
						<BsCloudCheck size={20} />
						Save Campaign
					</button>
				</div>

				{/* </div> */}
			</div>
		</div>
	);
}
