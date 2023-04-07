import Layout from '../components/layout'
import axios from 'axios'
import useSWR from 'swr'
import { Sorter } from '../components/Sorter'

const fetcher = async (...args: any) => {
    const res = await fetch(args);
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      // Attach extra info to the error object.
    //   error.info = await res.json();
    //   error.status = res.status;
      throw error;
    }
    return res.json();
  };

// const fetcher = async (...args: any) => {
//     const res = await axios.get(args).then(response => {
//         const product = res.data
//     })
    
//     // if (!res.ok){
//     //     const error = new Error("an error occured while getting data.");
//     //     throw error;
//     // }
//     return res;
// }

function Home() {

    const{data, error} = useSWR('/api/data', fetcher);

    return (
        <>
            <Layout pageName={"Produit"}>
                <main>
                    <div>
                        {data ? <Sorter products={data.products} /> : null}
                    </div>
                </main>
            </Layout>
        </>
    );
}

export default Home;