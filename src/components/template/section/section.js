export default function Section({children, className, id, height="screen"}) {
    return(
        <section  id={id}  className={`min-h-${height} relative ${className}`}>
            {children}
        </section>
    )
}