import Layout from '../components/layout'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Category } from '../components/sort/Category';
import axios from 'axios';
import useSWR from 'swr';

const inter = Inter({ subsets: ['latin'] })

const fetcher = url => axios.get(url).then(res => res.data);

export default function Home() {
  const { data, error } = useSWR('/api/data', fetcher);
  
  if (error) return <div>Failed to load data</div>;

  return (
    <>
      <Layout pageName={"Accueil"}>
        {data && (
          <>
            <Category products={data} category="High-tech" />
            <Category products={data} category="Jeux" />
          </>
        )}
      </Layout>
    </>
  )
}

