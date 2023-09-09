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
import EditPopup from "../CampaignHistory/EditPopup";

export default function CampaignManager(props) {
	const [createPopup, setCreatePopup] = useState(false);
	const [startLevel, setStartLevel] = useState(1);

	const [isLoading, setIsLoading] = useState(false);

	const [isViewing, setIsViewing] = useState(-1);
	const [isEditing, setIsEditing] = useState(-1);
	const [isDeleting, setIsDeleting] = useState(-1);

	const [campaigns, setCampaigns] = useState([]);
	const [events, setEvents] = useState(Array(0));

	useEffect(() => {
		setIsLoading(true);
		fetchCampaign();
	}, []);

	const handleEditClick = (i) => {
		setIsEditing(i);
	};

	const handleViewClick = (i) => {
		setIsViewing(i);
	};

	const handleDeleteClick = (i) => {
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

		setCampaigns(
			res.filter((r) => {
				let date1 = new Date().getTime();
				let date2 = new Date(r.schedule_date).getTime();

				if (date1 < date2) return true;

				return false;
			})
		);

		fetchEvents();
	};

	const fetchEvents = async () => {
		setIsLoading(true);
		const [err, res] = await request("post", "/upcoming-events", {
			"business-name": "Alabasta Bakery",
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

		setEvents(res.upcomingEvents);

		setIsLoading(false);
	};

	const handleEdit = async (obj) => {
		setIsEditing(-1);
		setIsLoading(true);

		const [err, res] = await request("POST", "/update_campaign", {
			_id: obj._id,
			title: obj.title,
			raw_prompt: obj.raw_prompt,
			engineered_prompt: obj.engineered_prompt,
			generated_content: obj.generated_content,
			created_date: obj.created_date,
			schedule_date: obj.schedule_date,
			medium: obj.medium,
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

	const handleDelete = async (id) => {
		setIsDeleting(-1);
		setIsLoading(true);
		window.scrollTo(0, 0);

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
					events={events}
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

				{isEditing >= 0 && (
					<EditPopup
						setIsEditing={setIsEditing}
						campaign={campaigns[isEditing]}
						handleEdit={handleEdit}
					/>
				)}

				{isDeleting >= 0 && (
					<DeletePopup
						setIsDeleting={setIsDeleting}
						campaign={campaigns[isDeleting]}
						handleDelete={handleDelete}
					/>
				)}

				<Table data={generateData()} />
			</MainPanelLayout>
		</>
	);
}
