import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import Loader from "../../Components/Loader";

export default function EditPopup({ setIsEditing, campaign, handleEdit }) {
	const [isLoading, setIsLoading] = useState(false);

	const [Campaign, setCampaign] = useState({
		title: campaign.title,
		medium: campaign.medium,
		scheduledDate: campaign.schedule_date,
	});

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
			<div className="relative bg-white rounded-lg h-[24rem] w-[28rem] shadow-lg flex flex-col items-center">
				<span
					className="cursor-pointer absolute top-2 right-2"
					onClick={(_) => setIsEditing(-1)}>
					{" "}
					<IoCloseCircle size={"25px"} />{" "}
				</span>

				<h1 className="p-2 text-lg text-gray-400 w-full text-center border-b border-gray-300">
					Edit Campaign
				</h1>

				<form
					className="mt-4 w-full px-8"
					onSubmit={() =>
						handleEdit({
							_id: campaign._id.$oid,
							title: Campaign["title"],
							raw_prompt: campaign.raw_prompt,
							engineered_prompt: campaign.engineered_prompt,
							generated_content: campaign.generated_content,
							created_date: campaign.created_date,
							schedule_date: Campaign["scheduledDate"],
							medium: Campaign["medium"],
						})
					}>
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
							className="appearance-none h-full rounded-lg bg-gray-300 block w-full border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
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
							className="appearance-none h-full rounded-lg bg-gray-300 block w-full border-gray-400 text-gray-700 py-2 px-2  leading-tight focus:outline-none focus:border-gray-500"
							onChange={handleChange}
							defaultValue={campaign.medium}>
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
							Launch Date-Time
						</label>
						<input
							required
							type="datetime-local"
							name="scheduledDate"
							value={Campaign.scheduledDate}
							className="appearance-none h-full rounded-lg bg-gray-300 block w-full border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
							onChange={handleChange}
						/>
					</div>

					<button
						type="submit"
						className="mt-6 w-full mx-auto  rounded-md bg-cyan-600 hover:bg-cyan-400 py-2 px-5 text-white">
						Edit
					</button>
				</form>
			</div>
		</div>
	);
}
