import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.verticalContainer}>
                    <p className={styles.footerText}>A propos</p>
                    <Link href="pages/who-are-we" className={styles.link}>Qui sommes-nous ?</Link>
                    <Link href="pages/cgu" className={styles.link}>Conditions générales d'utilisation</Link>
                    <Link href="pages/cgv" className={styles.link}>Conditions générales de vente</Link>
                    <Link href="pages/mentions-legales" className={styles.link}>Mentions légales</Link>
                </div>

                <div className={styles.verticalContainer}>
                    <p className={styles.footerText}>Besoin d'aide ?</p>
                    <Link href="pages/contact" className={styles.link}>Contactez-nous !</Link>
                </div>
            </div>
        </>
    )
}