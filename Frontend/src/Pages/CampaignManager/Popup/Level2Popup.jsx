import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FcNext, FcPrevious } from "react-icons/fc";
import { TfiReload } from "react-icons/tfi";
import { FiRefreshCw } from "react-icons/fi";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import reloadImg from "../../../Assets/reload-img.png";

export default function Level2Prompt({ setCreatePopup, setLevel }) {
	const [text, setText] = useState("");

	const [currPrompt, setCurrPrompt] = useState(0);

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		setText("your browser doesn't support speech recognition");
	}

	useEffect(
		(_) => {
			if (transcript) setText(text + transcript);
		},
		[transcript]
	);

	useEffect(() => {
		return () => {};
	}, []);

	const dummyData = [
		"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime illum iste distinctio molestias, fugiat, laborum soluta numquam exercitationem possimus saepe labore. Quam, doloremque? Ut quos tempora incidunt nesciunt voluptates dolores.",
		"2Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime illum iste distinctio molestias, fugiat, laborum soluta numquam exercitationem possimus saepe labore. Quam, doloremque? Ut quos tempora incidunt nesciunt voluptates dolores.",
		"3Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime illum iste distinctio molestias, fugiat, laborum soluta numquam exercitationem possimus saepe labore. Quam, doloremque? Ut quos tempora incidunt nesciunt voluptates dolores.",
		"4Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime illum iste distinctio molestias, fugiat, laborum soluta numquam exercitationem possimus saepe labore. Quam, doloremque? Ut quos tempora incidunt nesciunt voluptates dolores.",
	];

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
					className={`p-2 text-lg ${
						listening ? "" : "text-gray-400"
					} w-full text-center border-b border-gray-300`}>
					{/* {listening ? "Listening..." : "Click mic to speak"} */}
					These are the prompts:
				</h1>
				<button
					className="bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
					onClick={(_) =>
						setCurrPrompt((currPrompt + 1) % dummyData.length)
					}>
					<TfiReload />
					Another prompt
				</button>
				<textarea
					className="bg-gray-200 rounded-lg p-2 mx-1 mt-4 grow-x"
					value={dummyData[currPrompt]}
					onChange={(e) => setText(e.target.value)}
					rows={3}
					cols={58}
					// placeholder=""
				/>

				<p className="bg-yellow-400/50 rounded-lg p-2 w-[33rem] mt-4 h-[5rem] overflow-y-auto">
					<b>Add-ons:</b> Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Ratione quibusdam magnam, repellat
					reprehenderit sapiente, temporibus explicabo veniam pariatur
					dolore expedita repudiandae, eius possimus sequi beatae quam
					ipsum iusto perspiciatis? Atque.
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
						onClick={(_) => setLevel(4)}>
						{/* <FcPrevious /> */}
						<FiRefreshCw />
						Generate Campaign
					</button>
				</div>

				{/* </div> */}
			</div>
		</div>
	);
}
