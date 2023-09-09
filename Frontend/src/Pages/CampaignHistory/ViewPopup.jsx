import { IoCloseCircle } from "react-icons/io5";
import { FcPrevious } from "react-icons/fc";
import { useEffect } from "react";

export default function ViewPopup({ setIsViewing, campaign }) {
	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[24rem] w-[28rem] shadow-lg flex flex-col items-center">
				{/* <button
					className="cursor-pointer absolute top-2 h-7 left-2 bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3"
					onClick={(_) => setIsViewing(-1)}>
					<FcPrevious />
					Back
				</button> */}

				<span
					className="cursor-pointer absolute top-2 right-2"
					onClick={(_) => setIsViewing(-1)}>
					{" "}
					<IoCloseCircle size={"25px"} />{" "}
				</span>

				<h1 className="p-2 text-lg text-gray-400 w-full text-center border-b border-gray-300">
					View Campaign
				</h1>

				<form className="mt-4 w-full px-8">
					<div>
						<label
							className="block text-grey-darker text-sm font-bold mb-2"
							htmlFor="username">
							Title
						</label>
						<input
							disabled
							required
							type="text"
							name="title"
							className="appearance-none h-full rounded-lg bg-gray-300 block w-full border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
							placeholder="Enter title..."
							value={campaign.title}
						/>
					</div>

					<div className="mt-4">
						<label
							className="block text-grey-darker text-sm font-bold mb-2"
							htmlFor="username">
							Medium
						</label>
						<input
							disabled
							required
							name="medium"
							className="appearance-none h-full rounded-lg bg-gray-300 block w-full border-gray-400 text-gray-700 py-2 px-2  leading-tight focus:outline-none focus:border-gray-500"
							value={campaign.medium}
						/>
					</div>

					<div className="mt-4">
						<label
							className="block text-grey-darker text-sm font-bold mb-2"
							htmlFor="username">
							Created Date-Time
						</label>
						<input
							disabled
							required
							type="datetime-local"
							name="scheduledDate"
							value={campaign.created_date.substring(
								0,
								campaign.schedule_date.length
							)}
							className="appearance-none h-full rounded-lg bg-gray-300 block w-full border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
						/>
					</div>

					<div className="mt-4">
						<label
							className="block text-grey-darker text-sm font-bold mb-2"
							htmlFor="username">
							Launch Date-Time
						</label>
						<input
							disabled
							required
							type="datetime-local"
							name="scheduledDate"
							value={campaign.schedule_date}
							className="appearance-none h-full rounded-lg bg-gray-300 block w-full border-gray-400 text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-gray-500"
						/>
					</div>

					{/* <button className="mt-6 w-full mx-auto  rounded-md bg-green-600 hover:bg-green-400 py-2 px-5 text-white">
						Submit
					</button> */}
				</form>
			</div>
		</div>
	);
}
