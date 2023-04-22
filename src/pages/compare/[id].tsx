import Layout from "@/components/layout";
import { ProductComp } from "@/components/product/ProductComp";
import { Compare } from '@/components/sort/Compare'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = async (url: string) => {
    const res = await axios.get(`${url}`)
    return res.data
}

export default function productDetail({productId}) {
    const { data, error } = useSWR(`/api/datacomp/?id=${productId}`, fetcher);
    if (error) return <div> Failed to load data</div>;
    if (!data) return <div>Loading...</div>;
    
    return(
        <Layout pageName= "Comparaison">
            <div>
                {data ? <Compare products={data} /> : null}
                {/* {product ? <ProductComp key={product.id} product={product} /> : null} */}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    console.log(params.id);
    return { props: { productId: params.id } };
}