import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useState } from 'react'
import axios from 'axios'
import { SearchBar } from "./search/SearchBar";

export default function Navbar({pageName}: {pageName: String}) {
    return (
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

            <SearchBar />

            <div className={styles.rightLogosContainer}>
                <div className={styles.squareLogo}>
                    <Image src="/user.png" fill sizes='100vw' alt="Profil" />
                </div>
                <div className={styles.squareLogo}>
                    <Image src="/cart.png" fill sizes='100vw' alt="Panier" />
                </div>
            </div>
        </div>
    )
}