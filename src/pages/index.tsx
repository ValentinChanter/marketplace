import Layout from '../components/layout'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Category } from '../components/Category';
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
      <Layout pageName={"Accueil"} user={user}>
        {data && (
          <>
            <div className='mx-28 my-10'>
            <Category products={data} category="Garden" />
            <div className='w-full my-7 mt-10 border-t-2 border-t-mkDarkGreen'></div>
            <Category products={data} category="Games" />
            </div>
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
