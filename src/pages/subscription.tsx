import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function Subscription() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Abonnement</title>
            </Head>
            
            <main>
                <h1 className={styles.title}>Next.js Prime</h1>

                <p className={styles.description}>
                    Découvrez tout ce que l'abonnement Next.js Prime vous réserve !
                </p>

                <div className={styles.card}>
                    <h3>
                        Réductions exclusives
                        <Image src='/../public/reduc.png' alt='vroom' width='100' height='40'></Image>
                    </h3>
                    <p>Bénéfissiez de réductions réservées aux membres prime sur vos articles préférés.</p>
                </div>
                <div className={styles.card}>
                    <h3>
                        Livraison gratuite 
                        <Image src='/../public/vroom.png' alt='vroom' width='50' height='50'></Image>
                    </h3>
                    <p>Profitez d'une livraison gratuite dans toute la France, sans minimum d'achat.</p>
                </div>
                <div className={styles.card}>
                    <h3>J'en sais rien lol</h3>
                    <p>Avantages random lets fucking goooo</p>
                </div>

                <Link href='/'>Payer lol haha mdr aled svp</Link>
                
            </main>             
        </div>
    )
}