import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FcNext } from "react-icons/fc";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import listeningImg from "../../../Assets/enabled-mic.gif";
import notListeningImg from "../../../Assets/mic-disabled.png";

export default function Level1Prompt({ setCreatePopup, setLevel }) {
	const [text, setText] = useState("");

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

	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center">
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
					{listening ? "Listening..." : "Click mic to speak"}
				</h1>
				{/* <div className="items-center h-full"> */}
				<img
					className="my-4"
					src={listening ? listeningImg : notListeningImg}
					height={200}
					width={listening ? 150 : 100}
					onClick={
						!listening
							? SpeechRecognition.startListening
							: SpeechRecognition.stopListening
					}
				/>
				<textarea
					className="bg-gray-200 rounded-lg p-2 mx-2"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Raw text"
				/>
				<button
					className="bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
					onClick={(_) => setLevel(2)}>
					<FcNext />
					Next
				</button>
				{/* </div> */}
			</div>
		</div>
	);
}
