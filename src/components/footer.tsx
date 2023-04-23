import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
    return (
        <div>
            <div className={`${styles.container} bg-mkGreen z-10 relative`}>
                <div className={styles.verticalContainer}>
                    <p className={`${styles.footerText} text-mkDarkBlue`}>A propos</p>
                    <Link href="pages/who-are-we" className={`${styles.link} text-mkDarkBlue`}>Qui sommes-nous ?</Link>
                    <Link href="pages/cgu" className={`${styles.link} text-mkDarkBlue`}>Conditions générales d'utilisation</Link>
                    <Link href="pages/cgv" className={`${styles.link} text-mkDarkBlue`}>Conditions générales de vente</Link>
                    <Link href="pages/mentions-legales" className={`${styles.link} text-mkDarkBlue`}>Mentions légales</Link>
                </div>

                <div className={styles.verticalContainer}>
                    <p className={`${styles.footerText} text-mkDarkBlue`}>Besoin d'aide ?</p>
                    <Link href="/contact" className={`${styles.link} text-mkDarkBlue`}>Contactez-nous !</Link>
                </div>
            </div>
        </>
    )
}