import CustomImage from "@/hooks/CustomImage";

const items = [
  {
    image: "/image/brands/1.svg"
  },
  {
    image: "/image/brands/7.svg"
  },
  {
    image: "/image/brands/2.svg"
  },
  {
    image: "/image/brands/8.svg"
  },
]

export default function CollaborationPage() {
  return (
    <>
      <section className="mt-[80px] px-[70px]
        max-sm:px-[32px]
      ">
        <div className="grid grid-cols-4 relative place-items-center 
          max-sm:grid-cols-1 max-sm:gap-2
        "> 
          {items.map((item, i) => (
            <div key={i} className="h-[125px] aspect-[3/2] relative max-sm:h-[150px]">
              <CustomImage
                src={item.image}
                alt={item.image}
                className="filter invert opacity-75"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
