import { Link } from 'react-router-dom'
import {AiOutlineStock} from 'react-icons/ai'
import {FaEdit, FaHistory} from 'react-icons/fa'
import {ReactComponent as RakutenLogo} from '../../Assets/Rakuten-Logo.svg';
import { COLORS } from '../../Constants/colors';

export default function Sidebar(props){
  const Links = [
    {
      text: 'Reports',
      logo: AiOutlineStock,
      link: '/reports'
    },
    {
      text: 'Gen Tool',
      logo: FaEdit,
      link: '/gen-tool'
    },
    {
      text: 'History',
      logo: FaHistory,
      link: '/history'
    },
  ] 

  return (
    <div className="sidebar w-[15rem] flex flex-col justify-center items-center rounded-lg border border-black p-4">
      <Link to="/"> <RakutenLogo width={300} height={90}/> </Link>
      <div className="nav-options h-full p-4 flex flex-col gap-4 w-full">
        {Links.map((e, i)=>
          <Link to={e.link} key={i} className={`flex gap-2 bg-[#e8edec] hover:bg-gray-300 p-2 px-4 items-center rounded-lg`}> 
            <e.logo />
            <span> {e.text} </span>
          </Link>
        )}
      </div>
    </div>
  )
}
