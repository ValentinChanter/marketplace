import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'
import { User } from "@/pages/api/user"
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import Router from "next/router";
import redirection from '@/lib/redirection';

export default function Navbar({pageName, user}: {pageName:string, user:User}) {
    const { mutateUser } = useUser({
        redirectIfFound: false,
    });
    const redirect = redirection(user);


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
                    {user && user !== null ? (
                        <div className='relative group'>
                            <div className={styles.userLogo}>
                                <Link href={redirect.path}>
                                    <Image src="/user.png" fill sizes='100vw' alt="Profil"/>
                                </Link>
                                <ul className="absolute z-10 hidden group-hover:block mt-1 py-2 w-48 bg-mkGreen rounded-b-md shadow-lg top-12 right-0">
                                    <li>
                                        <Link href={redirect.path}>
                                            <p className="block px-4 py-2 text-sm text-mkDarkBlue hover:bg-[#96c9b9] hover:text-gray-900 duration-150">
                                                {redirect.desc}
                                            </p>
                                        </Link>
                                    </li>
                                    {user.status === "CLIENT" ? (
                                        <li>
                                            <Link href="/subscription">
                                                <p className="block px-4 py-2 text-sm text-mkDarkBlue hover:bg-[#96c9b9] hover:text-gray-900 duration-150">
                                                    {user.isSubscribed ? "Mon abonnement" : "S'abonner"}
                                                </p>
                                            </Link>
                                        </li>
                                    ) : (<></>)}
                                    <li>
                                        <p onClick={() => {
                                            logout(mutateUser); // On déconnecte l'utilisateur et on supprime les informations de la session
                                            Router.replace("/").then(() => Router.reload()); // On fait un full reload pour éviter que le dropdown s'affiche alors qu'il ne devrait pas
                                        }} className="block px-4 py-2 text-sm text-mkDarkBlue hover:bg-[#96c9b9] hover:text-gray-900 duration-150 cursor-pointer">
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

async function logout(mutateUser:Function) {
    mutateUser(
        await fetchJson("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }),
        false,
    );
}