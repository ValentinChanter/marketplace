import Layout from "@/components/layout";
import { ProductItem } from '../../components/product/ProductItem'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from "next/router";

const fetcher = async (url: string) => {
    const res = await axios.get(`${url}`)
    return res.data
}

type PageProps = {
    productBySellerId: string
}

export default function productDetail({productBySellerId}: PageProps) {
    const { data: product, error } = useSWR(`/api/dataprod/?id=${productBySellerId}`, fetcher);
    if (error) return <div>Failed to load data</div>;
    if (!product) return <div>Loading...</div>;
    
    return(
        <Layout pageName={ product.name}>
            <div>
                {product ? <ProductItem key={product.id} product={product} /> : null}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params }:any) {
    console.log(params.id);
    return { props: { productBySellerId: params.id } };
}
