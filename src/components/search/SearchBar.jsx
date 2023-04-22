import styles from "../navbar.module.css";
import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import Image from "next/image";

export const searchContext = createContext("");

export const Highlight = ({ attribute, hit }) => {
  const search = useContext(searchContext);
  const v = hit[attribute];

  // I search.length = 1
  // I - phone

  // /search/gi -> <em>$1</em>
  console.log();
  const hitt = v.replaceAll(new RegExp(`(${search})`, "ig"), "<em>$1</em>");
  const rest = v.slice(search.length);
  return <span></span>;
};

export const Hits = ({ items, HitComponent }) => {
  return (
    <div /*className='w-96 h-52 absolute bg-red-500 mt-14 ml-7 z-10'*/>
      {items.map((item, i) => {
        return <HitComponent key={i} hit={item} />;
      })}
    </div>
  );
};

const hit = ({ hit }) => {
  return (
    <div>
      <span>
        Name: <Highlight attribute="name" hit={hit} />
      </span>
    </div>
  );
};

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  // useEffect(async () => {

  //     return () => {}
  // }, [search])
  const CallSearch = async () => {
    console.log(search);

    // axios.get("/api/search", {data: "adqd", method})
  };

  const handleChange = async (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    if (e.target.value) {
      const { data } = await axios.get("/api/search", {
        params: {
          q: e.target.value,
        },
      });
      setItems(data);
    }
  };

  return (
    <>
      <searchContext.Provider value={search}>
        <div onClick={CallSearch} className={styles.searchForm}>
          <input
            type="search"
            placeholder="Rechercher un produit"
            className={styles.search}
            value={search}
            onChange={handleChange}
          />
          <button type="submit" className={styles.searchButton}>
            <div className={styles.searchButtonDiv}>
              <Image
                src="/searchWhite.png"
                fill
                sizes="100vw"
                alt="Rechercher"
              />
            </div>
          </button>
          {items ? <Hits items={items} HitComponent={hit} /> : null}
        </div>
      </searchContext.Provider>
    </>
  );
};
