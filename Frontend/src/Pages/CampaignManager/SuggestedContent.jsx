// import imgSrc1 from '../../Assets/genpictures.png'
// import imgSrc2 from '../../Assets/genpictures (2).png'
// import imgSrc3 from '../../Assets/genpictures (3).png'
// import imgSrc4 from '../../Assets/genpictures (4).png'
// import imgSrc5 from '../../Assets/genpictures (5).png'
// import imgSrc6 from '../../Assets/genpictures (7).png'
import { DUMMY_SUGGESTED_CONTENT } from "./DummySuggestedData"

export default function SuggestedContent({setStartLevel, setCreatePopup}) {

  const SuggestedClickFlow = (data) => {
    // TODO get caption and imgbase64
    localStorage.setItem('img_base_64', data?.img)
    localStorage.setItem('caption', data?.content)
    setStartLevel(69)
    setCreatePopup(true)
  }

  return (
    <div className='w-full flex justify-center items-center mt-4'>
      <div className="flex flex-wrap justify-center gap-y-4 gap-x-6 max-w-[1000px]">
        {DUMMY_SUGGESTED_CONTENT.map((e, i)=>
          <img src={e.img} width={300} key={i} onClick={_=>SuggestedClickFlow(e)}/>
        )}
      </div>
    </div>
  )
}
