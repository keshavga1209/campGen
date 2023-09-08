import MainPanelLayout from "../../Components/Layout/MainPanelLayout";
import { IoAddCircleSharp } from "react-icons/io5";
import Table from "../../Components/Table";
import { DUMMY_TABLE_DATA } from "../../Components/Table/dummyData";
import { request } from "../../Utils/request";
import { useEffect, useState } from "react";

import { IconContext } from "react-icons";
import { FaRegEdit } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loader from "../../Components/Loader";
import ViewPopup from "./ViewPopup";

export default function CampaignHistory(props) {
	const [isLoading, setIsLoading] = useState(false);

	const [isViewing, setIsViewing] = useState(-1);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetchCampaign();
	}, []);

	const handleEditClick = (i) => {
		console.log("Edit button clicked", i);
	};

	const handleViewClick = (i) => {
		console.log("View button clicked", i);
		setIsViewing(i);
	};

	const handleDeleteClick = (i) => {
		console.log("Delete button clicked", i);
	};

	const fetchCampaign = async () => {
		const [err, res] = await request("get", "/search");

		console.log(err, res);

		if (err === "network_error") {
			window.alert("check your network and try again");
			return;
		}

		if (err !== null) {
			window.alert(
				JSON.stringify(err) + "\n Contact Us! give this error"
			);
			return;
		}

		setCampaigns(res);
		setIsLoading(false);
	};

	const generateData = () => {
		let data = {
			headings: [
				"Sr. No.",
				"Title",
				"Lauch Date",
				"Created Date",
				"Medium",
				"Actions",
			],
			rows: campaigns.map((c, i) => {
				return [
					<span className="text-gray-900 whitespace-no-wrap">
						{" "}
						{i + 1}{" "}
					</span>,
					<span className="text-gray-900 whitespace-no-wrap">
						{" "}
						{c.title}{" "}
					</span>,
					<span className="text-gray-900 whitespace-no-wrap">
						{" "}
						{c.schedule_date}{" "}
					</span>,
					<span className="text-gray-900 whitespace-no-wrap">
						{" "}
						{c.created_date}{" "}
					</span>,
					<span className="text-gray-900 whitespace-no-wrap">
						{" "}
						{c.medium}{" "}
					</span>,
					<span className="flex gap-4">
						<IconContext.Provider
							value={{ color: "blue", size: "20px" }}>
							{" "}
							<BsEyeFill
								onClick={() => handleViewClick(i)}
								className="hover:cursor-pointer"
							/>{" "}
						</IconContext.Provider>

						<IconContext.Provider
							value={{ color: "blue", size: "20px" }}>
							{" "}
							<FaRegEdit
								onClick={() => handleEditClick(i)}
								className="hover:cursor-pointer"
							/>{" "}
						</IconContext.Provider>

						<IconContext.Provider
							value={{ color: "red", size: "20px" }}>
							{" "}
							<RiDeleteBin5Line
								onClick={() => handleDeleteClick(i)}
								className="hover:cursor-pointer"
							/>{" "}
						</IconContext.Provider>
					</span>,
				];
			}),
		};

		// console.log(data);
		// console.log(DUMMY_TABLE_DATA);

		return data;
	};

	return (
		<MainPanelLayout title={"Campaign History"}>
			{isLoading && (
				<div className="absolute top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
					<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center justify-center">
						<Loader />
					</div>
				</div>
			)}

			{isViewing >= 0 && (
				<ViewPopup
					setIsViewing={setIsViewing}
					campaign={campaigns[isViewing]}
				/>
			)}

			<>
				{/* <Table data={DUMMY_TABLE_DATA} /> */}
				<Table data={generateData()} />
			</>
		</MainPanelLayout>
	);
}
