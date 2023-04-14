import Layout from "@/components/layout";
import { ProductItem } from '../../components/ProductItem'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from "next/router";

const fetcher = async (url: string) => {
    const res = await axios.get(`${url}`)
    return res.data
}

export default function productDetail({productId}) {
    const { data: product, error } = useSWR(`/api/dataprod/?id=${productId}`, fetcher);
    if (error) return <div>Failed to load data</div>;
    if (!product) return <div>Loading...</div>;
    
    return(
        <Layout pageName={ product.name}>
            <div>
                {product ? <ProductItem key={product.id} product={product} /> : null}
            </div>
        </Layout>
    //    <p>test</p>
    )
}

export async function getServerSideProps({ params }) {
    console.log(params.id);
    return { props: { productId: params.id } };
}
