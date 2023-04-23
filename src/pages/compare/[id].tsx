import Layout from "@/components/layout";
import { ProductComp } from "@/components/product/ProductComp";
import { Compare } from '@/components/sort/Compare'
import axios from 'axios'
import useSWR from 'swr'
import user from "../api/user";
import { User } from "@/pages/api/user"
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { sessionOptions } from '@/lib/session';

const fetcher = async (url: string) => {
    const res = await axios.get(`${url}`)
    return res.data
}

export default function ProductDetail({productId, user}) {
    const { data, error } = useSWR(`/api/datacomp?id=${productId}`, fetcher);
    if (error) return <div> Failed to load data</div>;
    if (!data) return <div>Loading...</div>;
    
    return(
        <Layout pageName="Comparaison" user={user}>
            <div className="m-16">
                {data ? <Compare products={data} /> : null}
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, params }) {
      const user = req.session.user;
  
      return {
        props: {
          user: user || null,
          productId: params.id
        },
      };
    }, sessionOptions
  );