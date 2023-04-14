import Layout from '../components/layout'
import axios from 'axios'
import useSWR from 'swr'
import { Sorter } from '../components/Sorter'
import React, { useState, useEffect } from 'react';
// import { prisma } from '@/db'

const fetcher = url => axios.get(url).then(res => res.data);

//const fetcher = async (url:string) => axios.get(url).then(res => res.data)

function Home() {
    // const [products, setProducts] = useState([]);
  
    // useEffect(() => {
    //   axios.get('/api/data')
    //     .then(res => {
    //       setProducts(res.data);
    //     })
    //     .catch(err => console.log(err));
    // }, []);

    //const{data} = useSWR('/api/data', fetcher);
    const { data, error } = useSWR('/api/data', fetcher);
    if (error) return <div>Failed to load data</div>;

    console.log(data);

    return (
        <>
            <Layout pageName={"Produit"}>               
                <div>
                    {data ? <Sorter products={data} /> : null}
                </div>              
            </Layout>
        </>
    );
}

export default Home;