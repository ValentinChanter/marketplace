import Layout from '../components/layout'
import axios from 'axios'
import useSWR from 'swr'
import { Sorter } from '../components/sort/Sorter'
import React, { useState, useEffect } from 'react';
import { useRouter} from 'next/router';
// import { prisma } from '@/db'

const fetcher = (params) => axios.get('/api/search', {
     params,
  }).then(res => res.data);

function Home() {
    const router = useRouter()
    const { query, category } = router.query;
    // const {data, error, isLoading } = useSWR( {
    //     q: query,
    //     s:'entapouet',
    //     c: category
    // }, fetcher);

    // if (error) return <div>Failed to load data</div>;

    // console.log(data);

    return (
        <>
            <Layout pageName={"Produit"}>               
                <div>
                    <Sorter  />
                </div>              
            </Layout>
        </>
    );
}

export default Home;