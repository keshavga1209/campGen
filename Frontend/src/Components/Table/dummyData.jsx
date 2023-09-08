import { IconContext } from "react-icons";
import {FaRegEdit} from 'react-icons/fa'
import {RiDeleteBin5Line} from 'react-icons/ri'

export const DUMMY_TABLE_DATA = {
  headings: ["ID", "Title", "Segment", "Date", "Time", "Medium", "Action"],
  rows: [
    [
      <span className="text-gray-900 whitespace-no-wrap"> #20462 </span>,
      <span className="text-gray-900 whitespace-no-wrap"> Weekend </span>,
      <span className="text-gray-900 whitespace-no-wrap"> 15 km </span>,
      <span className="text-gray-900 whitespace-no-wrap"> 13/05/2022 </span>,
      <span className="text-gray-900 whitespace-no-wrap"> 14:00 </span>,
      <span className="text-gray-900 whitespace-no-wrap"> Email </span>,
      <span className="flex gap-4">  
        <IconContext.Provider value={{color: 'blue', size: '20px'}}> <FaRegEdit className="hover:cursor-pointer"/> </IconContext.Provider>
        <IconContext.Provider value={{color: 'red', size: '20px'}}> <RiDeleteBin5Line className="hover:cursor-pointer"/> </IconContext.Provider>
      </span>,
    ],
    [
      <span className="text-gray-900 whitespace-no-wrap"> #20462 </span>,
      <span className="text-gray-900 whitespace-no-wrap"> Weekend </span>,
      <span className="text-gray-900 whitespace-no-wrap"> 15 km </span>,
      <span className="text-gray-900 whitespace-no-wrap"> 13/05/2022 </span>,
      <span className="text-gray-900 whitespace-no-wrap"> 14:00 </span>,
      <span className="text-gray-900 whitespace-no-wrap"> Email </span>,
      <span className="flex gap-4">  
        <IconContext.Provider value={{color: 'blue', size: '20px'}}> <FaRegEdit className="hover:cursor-pointer"/> </IconContext.Provider>
        <IconContext.Provider value={{color: 'red', size: '20px'}}> <RiDeleteBin5Line className="hover:cursor-pointer"/> </IconContext.Provider>
      </span>,
    ]
  ]
}
