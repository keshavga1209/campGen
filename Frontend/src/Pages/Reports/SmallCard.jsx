export default function SmallCard({title, children}){
  return (
    <div className="flex flex-col gap-4 justify-center rounded-xl p-4 shadow-md bg-white hover:bg-gray-200 w-[12rem] cursor-pointer">
      <h1 className="w-full border-b border-gray-300 pb-2 font-bold text-gray-600"> {title} </h1>
      <div>
        {children}
      </div>
    </div>

  )
}
