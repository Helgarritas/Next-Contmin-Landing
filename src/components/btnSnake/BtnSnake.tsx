import { HyperText } from '../magicui/hyper-text';

interface Props {
  text: string;
  className?: string;
}

export default function BtnSnake({ text, className }: Props) {
  return (
    <div className={`cursor-pointer uppercase text-sm text-white/60 hover:text-white transition-colors duration-300 ${className || ''}`}>
      <HyperText duration={600}>{text}</HyperText>
    </div>
  )
}
