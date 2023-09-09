import MainPanelLayout from "../../Components/Layout/MainPanelLayout";
import { IoAddCircleSharp } from "react-icons/io5";
import Table from "../../Components/Table";
import { DUMMY_TABLE_DATA } from "../../Components/Table/dummyData";
import SuggestedContent from "./SuggestedContent";
import { useEffect, useState } from "react";
import CreatePopup from "./Popup/CreatePopup";
import ViewPopup from "../CampaignHistory/ViewPopup";
import Loader from "../../Components/Loader";
import { request } from "../../Utils/request";
import { IconContext } from "react-icons";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";
import DeletePopup from "../CampaignHistory/DeletePopup";
import CalenderEvents from "./CalenderEvents";

export default function CampaignManager(props) {
	const [createPopup, setCreatePopup] = useState(false);
	const [startLevel, setStartLevel] = useState(1);

	const [isLoading, setIsLoading] = useState(false);

	const [isViewing, setIsViewing] = useState(-1);
	const [isEditing, setIsEditing] = useState(-1);
	const [isDeleting, setIsDeleting] = useState(-1);

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
		setIsDeleting(i);
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

	const handleDelete = async (id) => {
		setIsDeleting(-1);
		setIsLoading(true);

		const [err, res] = await request("delete", "/delete_campaign", {
			_id: id,
		});

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

		fetchCampaign();
	};

	const getString = (d) => {
		return d.toLocaleString();
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
						{getString(new Date(c.schedule_date))}
					</span>,
					<span className="text-gray-900 whitespace-no-wrap">
						{" "}
						{getString(new Date(c.created_date))}{" "}
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
		<>
			{createPopup && (
				<CreatePopup
					setCreatePopup={setCreatePopup}
					startLevel={startLevel}
				/>
			)}
			<MainPanelLayout
				title={"Campaign Manager"}
				button={
					<button
						className="bg-green-400 hover:bg-green-500 flex gap-2 items-center rounded-xl py-1 px-3"
						onClick={(_) => {
							setStartLevel(1);
							setCreatePopup(true);
						}}>
						<IoAddCircleSharp />
						Create
					</button>
				}>
				<h1 className="text-xl font-bold mt-6">
					Upcoming Calender Events{" "}
				</h1>

				<CalenderEvents
					setCreatePopup={setCreatePopup}
					setStartLevel={setStartLevel}
					setIsLoading={setIsLoading}
				/>

				<h1 className="text-xl font-bold mt-6"> Suggested Media </h1>
				<SuggestedContent
					setCreatePopup={setCreatePopup}
					setStartLevel={setStartLevel}
				/>

				<h1 className="text-xl font-bold mt-6">
					{" "}
					Scheduled Campaigns{" "}
				</h1>

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

				{isDeleting >= 0 && (
					<DeletePopup
						setIsDeleting={setIsDeleting}
						campaign={campaigns[isDeleting]}
						handleDelete={handleDelete}
					/>
				)}

				<>
					{/* <Table data={DUMMY_TABLE_DATA} /> */}
					<Table data={generateData()} />
				</>
			</MainPanelLayout>
		</>
	);
}
