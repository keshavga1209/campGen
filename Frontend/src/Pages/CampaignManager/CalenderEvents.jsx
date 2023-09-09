// import imgSrc1 from '../../Assets/genpictures.png'
// import imgSrc2 from '../../Assets/genpictures (2).png'
// import imgSrc3 from '../../Assets/genpictures (3).png'
// import imgSrc4 from '../../Assets/genpictures (4).png'
// import imgSrc5 from '../../Assets/genpictures (5).png'
// import imgSrc6 from '../../Assets/genpictures (7).png'
import { useEffect, useState } from "react";
import { DUMMY_SUGGESTED_CONTENT } from "./DummySuggestedData";
import { request } from "../../Utils/request";
import SmallCard from "./SmallCard";

export default function CalenderEvents({
	setStartLevel,
	setCreatePopup,
	setIsLoading,
}) {
	const [events, setEvents] = useState(Array(0));

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
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
	};

	const SuggestedClickFlow = (data) => {
		// TODO get caption and imgbase64
		localStorage.setItem("img_base_64", data?.img);
		localStorage.setItem("caption", data?.content);
		setStartLevel(69);
		setCreatePopup(true);
	};

	return (
		<div className="w-full flex justify-center items-center mt-4">
			<div className="flex flex-wrap justify-center gap-y-4 gap-x-6 max-w-[1000px]">
				{events &&
					events.map((e, i) => (
						<SmallCard
							title={e.event}
							children={e.prompt}
							setIsLoading={setIsLoading}
							setStartLevel={setStartLevel}
							setCreatePopup={setCreatePopup}
						/>
					))}
			</div>
		</div>
	);
}
