import imgSrc from '../../Assets/image 1.png'
export default function SuggestedContent(props) {
  return (
    <div className='w-full flex justify-center items-center mt-4'>
      <div className="flex flex-wrap justify-center gap-y-4 gap-x-6 max-w-[1000px]">
        <img src={imgSrc} width={300}/>
        <img src={imgSrc} width={300}/>
        <img src={imgSrc} width={300}/>
        <img src={imgSrc} width={300}/>
        <img src={imgSrc} width={300}/>
        <img src={imgSrc} width={300}/>
      </div>
    </div>
  )
}
