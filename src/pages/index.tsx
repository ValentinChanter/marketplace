import Layout from '../components/layout'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Category } from '../components/sort/Category';
import axios from 'axios';
import useSWR from 'swr';

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

const inter = Inter({ subsets: ['latin'] })

const fetcher = url => axios.get(url).then(res => res.data);

export default function Home({user}: {user:User}) {
  const { data, error } = useSWR('/api/data', fetcher);
  
  if (error) return <div>Failed to load data</div>;

  return (
    <>
      <Layout pageName={"Accueil"}user={user}>
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

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    return {
      props: {
        user: user || null,
      },
    };
  }, sessionOptions
);
