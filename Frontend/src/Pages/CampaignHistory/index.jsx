import MainPanelLayout from "../../Components/Layout/MainPanelLayout";
import {IoAddCircleSharp} from 'react-icons/io5'
import Table from "../../Components/Table";
import { DUMMY_TABLE_DATA } from "../../Components/Table/dummyData";


export default function CampaignHistory(props){
  return (
    <MainPanelLayout title={"Campaign History"}>
      <Table data={DUMMY_TABLE_DATA} />
    </MainPanelLayout>
  )
}
