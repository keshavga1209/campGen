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
	events,
}) {
	return (
		<div className="w-full flex justify-center items-center mt-4">
			<div className="flex flex-wrap justify-center gap-y-4 gap-x-6 max-w-[1000px]">
				{events &&
					events.map((e, i) => (
						<SmallCard
							key={i}
							title={e.event}
							children={e.prompt}
							setIsLoading={setIsLoading}
							setStartLevel={setStartLevel}
							setCreatePopup={setCreatePopup}
							events={events}
						/>
					))}
			</div>
		</div>
	);
}
