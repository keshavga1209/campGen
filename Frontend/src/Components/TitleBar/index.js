export default function TitleBar({title, button}){
  return (
    <h1 className="w-full border-b border-black py-4 text-xl font-bold flex justify-between items-center"> {title} {button}</h1>
  )
}
