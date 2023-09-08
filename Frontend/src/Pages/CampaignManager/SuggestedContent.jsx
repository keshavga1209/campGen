import imgSrc1 from '../../Assets/genpictures.png'
import imgSrc2 from '../../Assets/genpictures (2).png'
import imgSrc3 from '../../Assets/genpictures (3).png'
import imgSrc4 from '../../Assets/genpictures (4).png'
import imgSrc5 from '../../Assets/genpictures (5).png'
import imgSrc6 from '../../Assets/genpictures (7).png'

export default function SuggestedContent(props) {
  return (
    <div className='w-full flex justify-center items-center mt-4'>
      <div className="flex flex-wrap justify-center gap-y-4 gap-x-6 max-w-[1000px]">
        <img src={imgSrc1} width={300}/>
        <img src={imgSrc2} width={300}/>
        <img src={imgSrc3} width={300}/>
        <img src={imgSrc4} width={300}/>
        <img src={imgSrc5} width={300}/>
        <img src={imgSrc6} width={300}/>
      </div>
    </div>
  )
}
