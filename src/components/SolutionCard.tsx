import CustomImage from "@/hooks/CustomImage";

interface Card {
  title: string;
  text: string;
  image: string;
}

interface Props {
  card: Card;
}

export default function SolutionCard({ card }: Props) {
  return (
    <div className="mx-6 h-[370px] relative flex items-end rounded-[6px] overflow-hidden">
      <div className="px-5 py-4 space-y-0.5">
        <h3 className="text-lg uppercase">{card.title}</h3>
        <p className="text-base text-secondary-foreground">{card.text}</p>
      </div>
      <CustomImage
        width={400}
        height={400}
        src={card.image}
        alt={card.image}
        style={{ maskImage: "linear-gradient(to bottom, #060813 70%, transparent" }}
    />
    </div>
  )
}
