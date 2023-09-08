import { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { IoCloseCircle } from "react-icons/io5";
import Loader from "../../../Components/Loader";

export default function DefaultLevel({ setCreatePopup, setLevel, text }) {
	useEffect(() => {
		return () => {};
	}, []);

	// return (
	// 	<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
	// 		<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center justify-center">
	// 			<Loader />
	// 		</div>
	// 	</div>
	// );

	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center justify-center">
				<span
					className="cursor-pointer absolute top-2 right-2"
					onClick={(_) => setCreatePopup(false)}>
					{" "}
					<IoCloseCircle size={"25px"} />{" "}
				</span>
				{text}
				Into the default level
				<button
					className="bg-gray-200 hover:bg-gray-400 flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
					onClick={(_) => setLevel(4)}>
					<FcPrevious />
					Back
				</button>
			</div>
		</div>
	);
}
