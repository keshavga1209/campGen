import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FcPrevious } from "react-icons/fc";
import { FiEdit, FiRefreshCw } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa6";
import FilerobotImageEditor, {
	TABS,
	TOOLS,
} from "react-filerobot-image-editor";
import { BsCloudCheck, BsDownload } from "react-icons/bs";
import imgSrc3 from "../../Assets/genpictures (3).png";
import { request } from "../../Utils/request";

import Loader from "../../Components/Loader";
import ImageEditor from "../../Components/ImageEditor";

export default function ViewPopup({ setIsViewing, campaign }) {
	const [text, setText] = useState("");
	const [generatedContent, setGeneratedContent] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [editing, setEditing] = useState(false);

	useEffect(() => {
		fetchBaseUrl();
	}, []);

	const fetchBaseUrl = async () => {
		setIsLoading(true);
		const [err, res] = await request(
			"get",
			`/searchwithID?_id=${campaign._id.$oid}`
		);

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

		// TODO get caption and imgbase64
		localStorage.setItem("img_base_64", res?.base64_img);
		localStorage.setItem("caption", campaign.generated_content);
		generateCampaign();
	};

	const onImageSave = (img_obj, design_state) => {
		setGeneratedContent((gc) => ({ ...gc, img_url: img_obj.imageBase64 }));
		setEditing(false);
	};

	async function copyTextToClipboard(text) {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand("copy", true, text);
		}
	}

	const generateCampaign = () => {
		setText(localStorage.getItem("caption"));
		setGeneratedContent({
			caption: localStorage.getItem("caption"),
			img_url: localStorage.getItem("img_base_64"),
		});

		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	};

	useEffect(() => {
		generateCampaign();
	}, []);

	if (isLoading)
		return (
			<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
				<div className="relative bg-white rounded-lg h-[22rem] w-[24rem] shadow-lg flex flex-col items-center justify-center">
					<Loader />
				</div>
			</div>
		);

	return (
		<div className="fixed top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-sm z-10">
			<div className="relative bg-white rounded-lg h-[36rem] w-[60rem] shadow-lg flex flex-col items-center">
				<span
					className="cursor-pointer absolute top-2 right-2"
					onClick={(_) => setIsViewing(-1)}>
					{" "}
					<IoCloseCircle size={"25px"} />{" "}
				</span>

				<h1
					className={`p-2 text-lg text-gray-400 w-full text-center border-b border-gray-300`}>
					{/* {listening ? "Listening..." : "Click mic to speak"} */}
					Generated Campaign
				</h1>

				<div className="flex justify-center gap-8 mt-4">
					<div>
						<h2 className={`pt-2 text-md w-full text-center`}>
							Generated Image{" "}
							<BsDownload
								className="ml-2 inline cursor-pointer"
								onClick={(_) => console.log("download")}
							/>
						</h2>
						{editing ? (
							<div className="image-editor w-[400px]">
								{generatedContent?.["img_url"] && (
									<ImageEditor
										onSave={onImageSave}
										src={generatedContent?.["img_url"]}
									/>
								)}
							</div>
						) : (
							<img
								className="mt-1"
								src={generatedContent?.["img_url"]}
								width={400}
							/>
						)}
					</div>

					<div>
						<h2 className={`pt-2 text-md w-full text-center`}>
							Generated Content{" "}
							<FaRegCopy
								className="ml-2 inline cursor-pointer"
								onClick={(_) => {
									copyTextToClipboard(text);
									alert("copied to clipboard");
								}}
							/>
						</h2>
						<textarea
							className="bg-gray-200 rounded-lg p-2 mt-1 grow-x"
							value={text}
							onChange={(e) => setText(e.target.value)}
							rows={16}
							cols={42}
						/>
					</div>
				</div>

				{/* <div className="flex gap-2">
					{!editing && (
						<button
							className="cursor-pointer h-7 bg-blue-500 hover:bg-red-400 text-white flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
							onClick={(_) => setEditing(true)}>
							<FiEdit />
							Edit Image
						</button>
					)}
					<button
						className="cursor-pointer  h-7 bg-red-500 hover:bg-red-400 text-white flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
						onClick={(_) => generateCampaign()}>
						<FiRefreshCw />
						Regenerate
					</button>

					<button
						className="cursor-pointer  h-7 bg-green-500 hover:bg-green-400 text-white flex gap-2 items-center rounded-xl py-1 px-3 mt-4"
						onClick={(_) => {
							localStorage.setItem(
								"img_base_64",
								generatedContent?.["img_url"]
							);
							localStorage.setItem("caption", text);
							setLevel(4);
						}}>
						<BsCloudCheck size={20} />
						Save Campaign
					</button>
				</div> */}
			</div>
		</div>
	);
}
