import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import styles from '@/styles/Home.module.css'
import { User } from "@/pages/api/user"

export default function Layout({children, pageName, user}: {children: any, pageName: string, user:User}) {
    return (
        <>
            <Head>
                <title>{pageName}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar pageName={pageName} user={user}/>
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </>
    )
}