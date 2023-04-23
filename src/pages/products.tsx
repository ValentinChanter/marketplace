import Layout from '../components/layout'
import axios from 'axios'
import useSWR from 'swr'
import { Sorter } from '../components/sort/Sorter'
import React, { useState, useEffect } from 'react';
import { useRouter} from 'next/router';
import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

const fetcher = (params) => axios.get('/api/search', {
     params,
  }).then(res => res.data);

  export default function Home({user}: {user:User}) {
    const router = useRouter()
    const { search, category } = router.query;
    // const {data, error, isLoading } = useSWR( {
    //     q: query,
    //     s:'entapouet',
    //     c: category
    // }, fetcher);

    // if (error) return <div>Failed to load data</div>;

    // console.log(data);

    return (
        <>
            <Layout pageName={"Produit"} user={user}>               
                <div>
                    <Sorter category={category} search={search} />
                </div>              
            </Layout>
        </>
    );
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
  
