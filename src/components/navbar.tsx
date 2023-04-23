import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'
import { User } from "@/pages/api/user"
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import Router from "next/router";

export default function Navbar({pageName, user}: {pageName:string, user:User}) {
    const { mutateUser } = useUser({
        redirectTo: "/",
        redirectIfFound: false,
    });

    return (
        <>
            <div className={`${styles.container} bg-mkGreen`}>
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
                                <Link href="/orders">
                                    <Image src="/user.png" fill sizes='100vw' alt="Profil"/>
                                </Link>
                                <ul className="absolute z-10 hidden group-hover:block mt-1 py-2 w-48 bg-white rounded-b-md shadow-lg top-12 right-0">
                                    <li>
                                        <Link href="/orders">
                                            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out">
                                                Mes commandes
                                            </p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/subscription">
                                            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out">
                                                Abonnement
                                            </p>
                                        </Link>
                                    </li>
                                    <li>
                                        <p onClick={() => { logout(mutateUser); Router.push("/"); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out cursor-pointer">
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
                        <Link href="/cart">
                            <Image src="/cart.png" fill sizes='100vw' alt="Panier" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

async function logout(mutateUser:Function) {
    mutateUser(
        await fetchJson("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }),
        false,
    );
}