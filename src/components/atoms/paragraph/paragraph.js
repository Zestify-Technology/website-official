export default function Paragraph({ children, align, fontSize = "base", color='#9e9e9e' }) {
  return (
    <>
      <p
        className={`
        text-${fontSize} text-${align} text-[${color}] clas
        `}
      >
        {children}
      </p>
    </>
  );
}
