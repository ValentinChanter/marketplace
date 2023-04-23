import Layout from "../components/layout";
import { Inter } from "next/font/google";
import { Category } from "../components/Category";
import axios from "axios";
import useSWR from "swr";

import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { User } from "@/pages/api/user";

const inter = Inter({ subsets: ["latin"] });

const fetcher = (url :string) => axios.get(url).then((res) => res.data);

export default function Home({ user }: { user: User }) {
  // const { data, error } = useSWR('/api/data', fetcher);
  const { data, error, isLoading } = useSWR("/api/category", fetcher);

  if (error) return <div>Failed to load data</div>;

  return (
    <>
      <Layout pageName={"Accueil"} user={user}>
        <div className="flex flex-col relative">
          <img
            src="/crying.svg"
            alt="cryinnnng"
            className="absolute -z-20 object-fill w-full h-screen overflow-hidden"
          />
          {data ? (
            data
              .map((obj) => obj.category)
              .sort(() => Math.random() - 0.5)
              .slice(0, 4)
              .map((category, index, arr) => {
                return (
                  <div key={index} className="relative">
                    <div className="mx-28 backdrop-blur-sm bg-white/30 p-4 rounded">
                      <Category category={category} />
                    </div>
                  </div>
                );
                // <div className='w-full my-7 mt-10 border-t-2 border-t-mkDarkGreen'></div>
                // <Category products={data} category="Games" />
              })
          ) : (
            <>
              <div className="relative">
                <div className="mx-28 backdrop-blur-sm bg-white/30 p-4 rounded">
                  <Category loading={true} />
                  <Category loading={true} />
                  <Category loading={true} />
                  <Category loading={true} />
                </div>
              </div>
            </>
          )}
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
  },
  sessionOptions
);