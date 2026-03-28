export default function Paragraph({
  children,
  align,
  fontSize = "base",
  color = "#c9c9c9",
}) {
  return (
    <>
      <p
        className={`
        text-${fontSize} text-${align} text-[${color}]  leading-relaxed
        `}
      >
        {children}
      </p>
    </>
  );
}
