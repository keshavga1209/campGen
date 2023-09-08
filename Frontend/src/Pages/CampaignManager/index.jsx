import MainPanelLayout from "../../Components/Layout/MainPanelLayout";
import { IoAddCircleSharp } from "react-icons/io5";
import Table from "../../Components/Table";
import { DUMMY_TABLE_DATA } from "../../Components/Table/dummyData";
import SuggestedContent from "./SuggestedContent";
import { useState } from "react";
import CreatePopup from "./Popup/CreatePopup";

export default function CampaignManager(props) {
	const [createPopup, setCreatePopup] = useState(false);
	const [startLevel, setStartLevel] = useState(1);

	return (
		<>
			{createPopup && <CreatePopup setCreatePopup={setCreatePopup} startLevel={startLevel}/>}
			<MainPanelLayout
				title={"Campaign Manager"}
				button={
					<button
						className="bg-green-400 hover:bg-green-500 flex gap-2 items-center rounded-xl py-1 px-3"
						onClick={(_) => setCreatePopup(true)}>
						<IoAddCircleSharp />
						Create
					</button>
				}>
				<h1 className="text-xl font-bold mt-6"> Suggested Media </h1>
				<SuggestedContent setCreatePopup={setCreatePopup} setStartLevel={setStartLevel}/>

				<h1 className="text-xl font-bold mt-6">
					{" "}
					Scheduled Campaigns{" "}
				</h1>
				<Table data={DUMMY_TABLE_DATA} />
			</MainPanelLayout>
		</>
	);
}
