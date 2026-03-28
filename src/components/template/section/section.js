const heightMap = {
  screen: "min-h-screen",
  full: "min-h-full",
  dvh: "min-h-[100dvh]",
};

export default function Section({
  children,
  className,
  id,
  height = "dvh",
}) {
  return (
    <section
      id={id}
      className={`${heightMap[height]} overflow-hidden relative ${className || ""}`}
    >
      {children}
    </section>
  );
}