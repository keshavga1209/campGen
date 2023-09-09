import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FcNext, FcPrevious } from "react-icons/fc";
import { request } from "../../../Utils/request";
import endpoints from "../../../Utils/endpoints";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader";
export default function Level4Prompt({ setCreatePopup, setLevel }) {
	let date = new Date();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const [Campaign, setCampaign] = useState({
		title: "",
		medium: "",
		scheduledDate: date,
	});

	useEffect(() => {
		return () => {};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// console.log(JSON.stringify(Campaign, 4, 4));

		setIsLoading(true);
		const [err, res] = await request("POST", endpoints.ADD_CAMPAIGN, {
			title: Campaign["title"],
			raw_prompt: localStorage.getItem("prompt"),
			engineered_prompt: localStorage.getItem("optimized_prompt"),
			generated_content: localStorage.getItem("caption"),
			base64_img: localStorage.getItem("img_base_64"),
			created_date: new Date(),
			schedule_date: Campaign["scheduledDate"],
			medium: Campaign["medium"],
		});
		if (err === "network_error") {
			window.alert("check your network and try again");
			return;
		}
		if (err !== null) {
			window.alert(JSON.stringify(err));
			return;
		}
		setIsLoading(false);
		if (err === null) {
			alert("Campaign saved!");
			navigate(0);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setCampaign((prevCampaign) => ({
			...prevCampaign,
			[name]: value,
		}));
	};

	const mediumTypes = ["Email", "Poster", "Social Media", "Other"];

	if (isLoading)
		return (
			<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
				<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center justify-center">
					<Loader />
				</div>
			</div>
		);

	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[28rem] w-[32rem] shadow-lg flex flex-col items-center">
				<button
					className="cursor-pointer absolute top-2 h-7 left-2 bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3"
					onClick={(_) => setLevel(3)}>
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
					Save your campaign
				</h1>

				<form
					onSubmit={(e) => handleSubmit(e)}
					className="mt-8 w-full px-8">
					<div>
						<label
							className="block text-grey-darker text-sm font-bold mb-2 ml-4"
							htmlFor="username">
							Title
						</label>
						<input
							required
							type="text"
							name="title"
							className="appearance-none h-full rounded-lg bg-gray-300 block w-[25rem] mx-auto border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
							placeholder="Enter title..."
							value={Campaign.title}
							onChange={handleChange}
						/>
					</div>

					<div className="mt-4">
						<label
							className="block text-grey-darker text-sm font-bold mb-2 ml-4"
							htmlFor="username">
							Medium
						</label>
						<select
							required
							name="medium"
							className="appearance-none h-full rounded-lg bg-gray-300 block w-[25rem] mx-auto border-gray-400 text-gray-700 py-2 px-2  leading-tight focus:outline-none focus:border-gray-500"
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
							className="block text-grey-darker text-sm font-bold mb-2 ml-4"
							htmlFor="username">
							Launch Date-Time
						</label>
						<input
							required
							type="datetime-local"
							name="scheduledDate"
							className="appearance-none h-full rounded-lg bg-gray-300 block w-[25rem] mx-auto border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
							onChange={handleChange}
						/>
					</div>

					<div className="mt-8">
						<button className="w-[25rem] ml-6  rounded-md bg-green-600 hover:bg-green-400 py-2 px-5 text-white">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
