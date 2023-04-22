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
                <div className="flex flex-row mx-auto ml-[24px]">
                    <div className="my-auto mr-[24px]">
                        <Image src="/menu.png" width={40} height={40} alt="Menu latéral" />
                    </div>

                    <div className="my-auto mr-[24px]">
                        <Link href="/">
                            <Image src="/next.svg" width={200} height={50} alt="Logo" />
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

                <div className="flex flex-row mr-[24px]">
                    {user && user !== null ? (
                        <div className='relative group'>
                            <div>
                                <Link href={redirect.path}>
                                    <Image src="/user.png" width={40} height={40} alt="Profil" className='mt-[12px] mr-[24px]'/>
                                </Link>
                                <ul className="absolute z-10 hidden group-hover:block mt-1 py-2 w-48 bg-mkGreen rounded-b-md shadow-lg top-15 right-0">
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
                        <div>
                            <Link href="/login">
                                <Image src="/user.png" width={40} height={40} alt="Profil" className='mt-[12px] mr-[24px]' />
                            </Link>
                        </div>
                    )}
                    <div>
                        <Image src="/cart.png" width={40} height={40} alt="Panier" className='mt-[12px] mr-[24px]' />
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