import './btnSnake.css';

interface Props {
  text: string;
  className?: string;
}

export default function BtnSnake({ text, className }: Props) {
  return (
    <>
      <p className={`btn_snake uppercase  ${className}`}>
        <span className="hover-underline-animation after:bg-white">{text}</span>
      </p>
    </>
  )
}
