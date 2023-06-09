import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { User } from "@/pages/api/user"

export default function Layout({children, pageName, user}: {children: any, pageName: string, user:User}) {
    return (
        <>
            <Head>
                <title>{pageName}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='min-h-screen flex flex-col'>
                <Navbar pageName={pageName} user={user}/>
                <main className='mb-auto h-full'>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}