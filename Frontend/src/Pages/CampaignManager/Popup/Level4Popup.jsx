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

	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[44rem] w-[38rem] shadow-lg flex flex-col items-center">
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
					Info about the Campaign
				</h1>

				<form action="">
					<div class="mb-4">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="name">
							Title
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="Text input"
							value={"abc"}
						/>
					</div>
					<div class="mb-4">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-state">
							Subject
						</label>
						<div class="relative">
							<select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
								<option>Select dropdown</option>
								<option>With options</option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg
									class="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20">
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</div>
					<div class="mb-4">
						<label class="block">
							<input class="mr-2 leading-tight" type="checkbox" />
							<span class="text-sm">I agree this</span>
						</label>
					</div>
					<div class="mb-4">
						<label class="inline-flex items-center">
							<input
								type="radio"
								class="form-radio"
								name="accountType"
								value="1"
							/>
							<span class="ml-2">Yes</span>
						</label>
						<label class="inline-flex items-center ml-6">
							<input
								type="radio"
								class="form-radio"
								name="accountType"
								value="2"
							/>
							<span class="ml-2">No</span>
						</label>
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 text-sm font-bold mb-2">
							Message
							<textarea
								class="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								rows="5"
								placeholder="Textarea"></textarea>
						</label>
					</div>
					<div class="flex items-center justify-between">
						<button
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
