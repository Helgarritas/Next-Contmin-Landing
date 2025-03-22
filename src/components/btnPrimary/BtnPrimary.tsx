// Components
import { HyperText } from "../magicui/hyper-text";
// Icons
import { ChevronRight } from "lucide-react";

interface Props {
  text: string;
  className?: string;
}

export default function BtnPrimary({ text = "contactar", className }: Props) {
  return (
    <>
      <div className={`${className} h-[52px] flex cursor-pointer duration-200 ease transition-colors border-muted hover:bg-muted hover:border-y-[.5px]`}>
        <p className="h-full w-[1.5px] bg-primary"></p>
        <div className="w-full flex items-center justify-between">
          <HyperText 
            className="w-full pl-4 text-base font-medium uppercase"
          >
            {text}
          </HyperText>
          <ChevronRight className="w-5.5 h-5.5"/>
        </div>
      </div>
    </>
  )
}
