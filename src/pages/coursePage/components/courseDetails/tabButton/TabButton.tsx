interface Props {
    text: string
    id: string
    className: string
    handleClick: (e: React.MouseEvent) => void
  }
  
  export const TabButton = ({ text, id, className, handleClick }: Props) => (
    <button id={id} className={className} onClick={handleClick}>
      {text}
    </button>
  )
  