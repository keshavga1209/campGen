import TitleBar from "../TitleBar";

export default function MainPanelLayout({children, title, button}){
  return (
    <div className='py-4 px-16 flex flex-col'>
      <TitleBar title={title} button={button}/>      
      {children}
    </div>
  )
}
