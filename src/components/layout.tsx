import Head from 'next/head'
import Navbar from './navbar'
import styles from '@/styles/Home.module.css'

export default function Layout({children, pageName}: {children: any, pageName: String}) {
    return (
        <>
            <Head>
                <title>{pageName}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar pageName={pageName}/>
            <main className={styles.main}>
                {children}
            </main>
            <footer />
        </>
    )
}