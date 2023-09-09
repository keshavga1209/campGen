import endpoints from "../../Utils/endpoints";
import { request } from "../../Utils/request";

export default function SmallCard({
	title,
	children,
	setIsLoading,
	setStartLevel,
	setCreatePopup,
}) {
	const SuggestedClickFlow = async () => {
		setIsLoading(true);
		const [err, res] = await request("POST", endpoints.GENERATE_CAMPAIGN, {
			prompt: children,
		});

		if (err === "network_error") {
			window.alert("check your network and try again");
			return;
		}

		if (err !== null) {
			window.alert(JSON.stringify(err));
			return;
		}

		// setText(res?.["caption"] || "");
		// setGeneratedContent(res);
		// setIsLoading(false);

		// TODO get caption and imgbase64
		localStorage.setItem("img_base_64", res?.img_url);
		localStorage.setItem("caption", res?.caption);

		setStartLevel(69);
		setIsLoading(false);
		setCreatePopup(true);
	};

	return (
		<div
			className="flex flex-col gap-4 justify-center rounded-xl p-4 shadow-md bg-white hover:bg-gray-200 w-[20rem] cursor-pointer"
			onClick={SuggestedClickFlow}>
			<h1 className="w-full border-b border-gray-300 pb-2 font-bold text-gray-600">
				{" "}
				{title}{" "}
			</h1>
			<p>{children}</p>
		</div>
	);
}
