import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoAddCircleSharp } from "react-icons/io5";
import { FcNext } from "react-icons/fc";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import listeningImg from "../../../Assets/enabled-mic.gif";
import notListeningImg from "../../../Assets/mic-disabled.png";
import Level2Prompt from "./Level2Popup";
import Level1Prompt from "./Level1Popup";
import DefaultLevel from "./DefaultLevel";
import Loader from "../../../Components/Loader";
import Level3Prompt from "./Level4Popup";
import Level4Prompt from "./Level4Popup";

export default function CreatePopup({ setCreatePopup }) {
	const [level, setLevel] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const levelWiseComponents = () => {
		switch (level) {
			case 1:
				return (
					<Level1Prompt
						setCreatePopup={setCreatePopup}
						setLevel={setLevel}
					/>
				);

			case 2:
				return (
					<Level2Prompt
						setCreatePopup={setCreatePopup}
						setLevel={setLevel}
					/>
				);
			case 4:
				return (
					<Level4Prompt
						setCreatePopup={setCreatePopup}
						setLevel={setLevel}
						text={"Yoooo"}
					/>
				);
			default:
				return (
					<DefaultLevel
						setCreatePopup={setCreatePopup}
						setLevel={setLevel}
					/>
				);
		}
	};

	return (
		<>
			{isLoading ? (
				<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
					<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center justify-center">
						<Loader />
					</div>
				</div>
			) : (
				levelWiseComponents()
			)}
		</>
	);
}
