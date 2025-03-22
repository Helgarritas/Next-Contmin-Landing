export default function BgGrid() {
  return (
    <>
      <div className="w-full h-full px-[70px] absolute left-0 top-0 -z-10">
        <div className="w-full h-full flex justify-between">
          {["", "", "", "", ""].map((item, i) => (
            <div 
              key={i}
              className="w-[.6px] h-full bg-white/9"
            > 
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
