import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FcNext, FcPrevious } from "react-icons/fc";
import { TfiReload } from "react-icons/tfi";
import { FiRefreshCw } from "react-icons/fi";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import reloadImg from "../../../Assets/reload-img.png";

export default function Level4Prompt({ setCreatePopup, setLevel }) {
	let date = new Date();
	const [Campaign, setCampaign] = useState({
		title: "",
		medium: "",
		scheduledDate: new Date(
			date.getTime() - date.getTimezoneOffset() * 60000
		)
			.toISOString()
			.substring(0, 10),
	});

	useEffect(() => {
		return () => {};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(JSON.stringify(Campaign, 4, 4));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		console.log(name, value);

		setCampaign((prevCampaign) => ({
			...prevCampaign,
			[name]: value,
		}));
	};

	const mediumTypes = ["Email", "Poster", "Social Media", "Other"];

	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[24rem] w-[28rem] shadow-lg flex flex-col items-center">
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

				<h1 className="p-2 text-lg text-gray-400 w-full text-center border-b border-gray-300">
					More info about the Campaign
				</h1>

				<form onSubmit={(e) => handleSubmit(e)} className="mt-4">
					<div>
						<label
							className="block text-grey-darker text-sm font-bold mb-2"
							htmlFor="username">
							Title
						</label>
						<input
							required
							type="text"
							name="title"
							className="appearance-none h-full rounded-lg bg-gray-300 block w-[12rem] border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
							placeholder="Enter title..."
							value={Campaign.title}
							onChange={handleChange}
						/>
					</div>

					<div className="mt-4">
						<label
							className="block text-grey-darker text-sm font-bold mb-2"
							htmlFor="username">
							Medium
						</label>
						<select
							required
							name="medium"
							className="appearance-none h-full rounded-lg bg-gray-300 block w-[12rem] border-gray-400 text-gray-700 py-2 px-2  leading-tight focus:outline-none focus:border-gray-500"
							onChange={handleChange}>
							<option value="">Not selected</option>

							{mediumTypes.map((m, i) => (
								<option key={i} value={m}>
									{m}
								</option>
							))}
						</select>
					</div>

					<div className="mt-4">
						<label
							className="block text-grey-darker text-sm font-bold mb-2"
							htmlFor="username">
							Scheduled Date {"(Launch Date)"}
						</label>
						<input
							required
							type="date"
							name="scheduledDate"
							className="appearance-none h-full rounded-lg bg-gray-300 block w-[12rem] border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
						/>
					</div>

					<button className="mt-5 w-[12rem] rounded-md bg-green-600 hover:bg-green-400 py-2 px-5 text-white">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
