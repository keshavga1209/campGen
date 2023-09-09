import { IoCloseCircle } from "react-icons/io5";
import { FcPrevious } from "react-icons/fc";

export default function DeletePopup({ setIsDeleting, campaign, handleDelete }) {
	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[15rem] w-[28rem] shadow-lg flex flex-col items-center">
				{/* <button
					className="cursor-pointer absolute top-2 h-7 left-2 bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3"
					onClick={(_) => setIsDeleting(-1)}>
					<FcPrevious />
					Back
				</button> */}

				<span
					className="cursor-pointer absolute top-2 right-2"
					onClick={(_) => setIsDeleting(-1)}>
					{" "}
					<IoCloseCircle size={"25px"} />{" "}
				</span>

				<h1 className="p-2 text-lg text-gray-400 w-full text-center border-b border-gray-300">
					Delete Campaign
				</h1>

				<div className="mt-4 w-full px-8">
					<h2 className="text-center font-bold">
						Are you sure you want to delete "{campaign.title}"
						Campaign?
					</h2>
					<div className="flex gap-2 mt-10">
						<button
							onClick={(_) => setIsDeleting(-1)}
							className="mt-6 w-full mx-auto  rounded-md bg-gray-600 hover:bg-gray-400 py-2 px-5 text-white">
							Back
						</button>
						<button
							onClick={() => handleDelete(campaign._id.$oid)}
							className="mt-6 w-full mx-auto  rounded-md bg-red-600 hover:bg-red-400 py-2 px-5 text-white">
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
