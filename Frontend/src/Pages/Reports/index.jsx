import MainPanelLayout from "../../Components/Layout/MainPanelLayout";
import {ReactComponent as GraphSvg} from '../../Assets/Graph.svg';
import SmallCard from "./SmallCard";
import MyChart from "../../Components/Chart";
import { useState } from "react";

const customersTargeted = Array.from({length: 12}, () => 5000 + Math.floor(Math.random() * 3000));
const totalCustomersTargeted = customersTargeted.reduce((acc, e)=>acc+e, 0)
const customersClicked = Array.from({length: 12}, () => 500 + Math.floor(Math.random() * 300));
const totalCustomersClicked = customersClicked.reduce((acc, e)=>acc+e, 0)
const customersPurchased = Array.from({length: 12}, () => 50 + Math.floor(Math.random() * 30));
const totalCustomersPurchased = customersPurchased.reduce((acc, e)=>acc+e, 0)

export default function Reports(props){

  const [currentMetric, setCurrentMetric] = useState('Customers Targeted')
  const graphSelector = () => {
    if (currentMetric==='Customers Clicked')  return customersClicked
    if (currentMetric==='Customers Purchased')  return customersPurchased
    return customersTargeted
  }

  return (
    <MainPanelLayout title={"Reports"}>
      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-col gap-4 items-center justify-center rounded-lg px-16 py-8 mx-16 my-4 shadow-md bg-white w-[700px]">
          <h1 className="w-full border-b border-gray-300 py-2 font-bold"> {currentMetric} </h1>
          <MyChart title={currentMetric} label="customers" data={graphSelector()} />
        </div>
        <div className="flex flex-wrap gap-4 mt-8 max-w-[40rem] justify-center">
          <SmallCard title="Customers Targeted" onClick={_=>setCurrentMetric('Customers Targeted')}>
            <span className="text-2xl font-bold">{totalCustomersTargeted}</span>
          </SmallCard>
          <SmallCard title="Customers Clicked" onClick={_=>setCurrentMetric('Customers Clicked')}>
            <>
              <span className="text-2xl font-bold"> {totalCustomersClicked}</span>
              <span className="text-gray-500">/{totalCustomersTargeted}</span>
            </>
          </SmallCard>
          <SmallCard title="Customers Purchased" onClick={_=>setCurrentMetric('Customers Purchased')}>
            <>
              <span className="text-2xl font-bold"> {totalCustomersPurchased}</span>
              <span className="text-gray-500">/{totalCustomersClicked}</span>
            </>
          </SmallCard>
        </div>
      </div>
    </MainPanelLayout>
  )
}
