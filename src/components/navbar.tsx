import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'
import { User } from '@/lib/session';
import fetchJson, { FetchError } from "@/lib/fetchJson";

export default function Navbar({pageName, user}: {pageName:string, user:User}) {
    console.log(user)
    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftLogosContainer}>
                    <div className={styles.menuLogo}>
                        <Image src="/menu.png" fill sizes='100vw' alt="Menu latéral" />
                    </div>

                    <div className={styles.logo}>
                        <Link href="/">
                            <Image src="/next.svg" fill sizes='100vw' alt="Logo" />
                        </Link>
                    </div>
                </div>

                <form action="#" className={styles.searchForm}>
                    <input type="search" placeholder="Rechercher un produit" className={styles.search}/>
                    <button type="submit" className={styles.searchButton}>
                        <div className={styles.searchButtonDiv}>
                            <Image src="/searchWhite.png" fill sizes='100vw' alt="Rechercher" />
                        </div>
                    </button>
                </form>

                <div className={styles.rightLogosContainer}>
                    {user !== null ? (
                        <div className='relative group'>
                            <div className={styles.userLogo}>
                                <Link href="/commandes">
                                    <Image src="/user.png" fill sizes='100vw' alt="Profil"/>
                                </Link>
                                <ul className="absolute z-10 hidden group-hover:block mt-1 py-2 w-48 bg-white rounded-b-md shadow-lg top-12 right-0">
                                    <li>
                                        <Link href="/commandes">
                                            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out">
                                                Mes commandes
                                            </p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/abonnement">
                                            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out">
                                                Abonnement
                                            </p>
                                        </Link>
                                    </li>
                                    <li>
                                        <p onClick={() => logout()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out cursor-pointer">
                                            Se déconnecter
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.squareLogo}>
                            <Link href="/login">
                                <Image src="/user.png" fill sizes='100vw' alt="Profil"/>
                            </Link>
                        </div>
                    )}
                    <div className={styles.squareLogo}>
                        <Image src="/cart.png" fill sizes='100vw' alt="Panier" />
                    </div>
                </div>
            </div>
        </>
    )
}

async function logout() {
    // TODO: Rediriger quand l'utilisateur est déconnecté
    try {
        await fetchJson("/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
}