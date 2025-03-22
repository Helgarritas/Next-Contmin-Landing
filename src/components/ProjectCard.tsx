import CustomImage from "@/hooks/CustomImage";

interface Props {
  item: {[key: string]: any}
}

export default function ProjectCard({ item }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="mx-6 h-[200px] relative rounded-[6px] overflow-hidden">
          <CustomImage
            width={400}
            height={400}
            src={item.image}
            alt={item.image}
          />
        </div>
        <div className="px-6">
          <h3 className="text-lg uppercase">{item.title}</h3>
          <div>
            <p className="text-secondary-foreground capitalize">{item.ubication}</p>
          </div>
        </div>
      </div>
    </>
  )
}
