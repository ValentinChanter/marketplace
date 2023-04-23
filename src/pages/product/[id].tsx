import Layout from "@/components/layout";
import { ProductItem } from '../../components/product/ProductItem'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { sessionOptions } from '@/lib/session';
import user from "../api/user";
import { User } from "@/pages/api/user"


const fetcher = async (url: string) => {
    const res = await axios.get(`${url}`)
    return res.data
}

type PageProps = {
    productBySellerId: string,
    user: User
}

export default function ProductDetail({productBySellerId, user}: PageProps) {
    const { data: product, error } = useSWR(`/api/dataprod/?id=${productBySellerId}`, fetcher);
    if (error) return <div>Failed to load data</div>;
    if (!product) return <div>Loading...</div>;
    
    return(
        <Layout pageName={ product.name} user={user}>
            <div >
                {product ? <ProductItem key={product.id} product={product} /> : null}
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
          productBySellerId: params.id
        },
      };
    }, sessionOptions
  );

// export async function getServerSideProps({ req,params }:any) {
//     const user = req.session.user;
//     console.log(params.id);
//     return { props: { productBySellerId: params.id,  user: user || null } };
// }
