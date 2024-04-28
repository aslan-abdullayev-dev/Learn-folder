import styles from "./styles.module.css"

// * this layout applied only to the routes inside "app/about" directory

export default function AboutLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <>
            <nav>About Navbar</nav>
            <main className={styles.main}>{children}</main>
        </>
    )
}
