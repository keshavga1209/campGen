import MainPanelLayout from "../../Components/Layout/MainPanelLayout";
import {ReactComponent as GraphSvg} from '../../Assets/Graph.svg';
import SmallCard from "./SmallCard";

export default function Reports(props){
  return (
    <MainPanelLayout title={"Reports"}>
      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-col gap-4 items-center justify-center rounded-lg px-16 py-8 mx-16 my-4 shadow-md bg-white">
          <h1 className="w-full border-b border-gray-300 py-2 font-bold"> Active Users </h1>
          <GraphSvg height={300} width={500}/> 
        </div>
        <div className="flex flex-wrap gap-4 mt-8 max-w-[40rem] justify-center">
          <SmallCard title="Active Users">
            <>
              <span className="text-2xl font-bold"> 27</span>
              <span className="text-gray-500">/80</span>
            </>
          </SmallCard>
          <SmallCard title="Questions Answred">
            <span className="text-2xl font-bold">3,298</span>
          </SmallCard>
          <SmallCard title="Avg. Session Length">
            <span className="text-2xl font-bold">2m 34s</span>
          </SmallCard>
          <SmallCard title="Starting Knowledge">
            <span className="text-2xl font-bold">64%</span>
          </SmallCard>
          <SmallCard title="Current Knowledge">
            <span className="text-2xl font-bold">86%</span>
          </SmallCard>
          <SmallCard title="Knowledge Gain">
            <span className="text-2xl font-bold">+34%</span>
          </SmallCard>
        </div>
      </div>
    </MainPanelLayout>
  )
}
