import Image from 'next/image'
import styles from './navbar.module.css'

export default function Navbar({pageName}: {pageName: String}) {
    return (
        <div className={styles.container}>
            <div>
                
            </div>
            <div className={styles.logo}>
                <Image src="/next.svg" fill sizes='100vw' alt="Logo" />
            </div>
            <form className={styles.searchForm}>
                <input type="search" placeholder="Rechercher un produit" className={styles.search}/>
                <button type="submit" style={{ margin: 'auto', marginLeft: "0", height: '70%' }}>
                    <div className={styles.searchButton}>
                        <Image src="/search.png" fill sizes='100vw' alt="Rechercher" />
                    </div>
                </button>
            </form>
        </div>
    )
}