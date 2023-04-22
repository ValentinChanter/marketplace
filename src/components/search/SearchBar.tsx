import styles from "../navbar.module.css";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  createElement,
  FC,
} from "react";
import axios from "axios";
import Image from "next/image";

export const searchContext = createContext("");
/**
 * 
 * Componant qui met en valeur ta recherche actuel
 */
export const Highlight: FC<{ attribute: string; hit: any }> = ({
  attribute,
  hit,
}) => {
  const search = useContext(searchContext);
  const text = hit[attribute];
  // if no element in search bar return the hit attribute
  if (!search.trim()) {
    return <span>{text}</span>;
  }
  // IPhone
  //  Search > phone
  //  /(phone)/
  // ['i', 'phone', '20']
  // phone === phone alors je met en bold sinon osef
  // crée regex avec le contenue de la search
  const regex = new RegExp(`(${search})`, "ig");
  // filtre le text par la regex afin de pouvoir la mettre en bold/italic
  const parts = text.split(regex).filter((part: string) => !!part);
  // Example
  // text = "Iphone"
  // l'utilisateur écris "phone" dans la search bar
  // search = "phone"
  // La regex dans le code est donc
  // regex = /(phone)/
  // quand nous fessont notre split par la regex généré par le search.
  // parts = ['I', 'phone']
  // ensuite nous renvoyons les parts en testant si la part match avec la regex
  // si c'est le cas nous pouvons la renvoyé en bold/italic sinon elle ne match pas avec le search

  return parts.map((part: string, i: number) => {
    // Test avec la regex si elle corespond
    return regex.test(part) ? (
      <span key={i}>
        <b>{part}</b>
      </span>
    ) : (
      <span key={i}>{part}</span>
    );
  });
};
/**
 * les Hits est un composant servant de conteneur pour les "HitComponent"
 *
 * Le "HitComponent": c'est un composant qui sert de carte dynamique pour la réponse API
 *
 *
 */
export const Hits: FC<{
  items: Array<any>;
  HitComponent: FC<{ hit: any }>;
}> = ({ items, HitComponent }) => {
  return items.length ? (
    <div className="bg-red-500 w-52 absolute p-2 my-10 flex flex-col gap-2">
      {items.map((item, i) => {
        return <HitComponent key={i} hit={item} />;
      })}
    </div>
  ) : null;
};

// Hit component
const hit = ({ hit }) => {
  return (
    <div className="bg-teal-600">
      <span>
        Name: <Highlight attribute="name" hit={hit} />
      </span>
      {/* <span>desc: <Highlight attribute='desc' hit={hit}/></span> */}
    </div>
  );
};

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const CallSearch = async () => {
    console.log(search);
    // redirect on product page with products?query=Iphone
    // axios.get("/api/search", {data: "adqd", method})
  };

  const handleChange = async (e) => {
    // set the search text when we typing
    setSearch(e.target.value);
    console.log(e.target.value); 
    if (e.target.value) { // if have value 
      // do a get http request to get the search query
      // by passing the search value in query params 
      // /api/search?q=phone
      const { data } = await axios.get("/api/search", {
        params: {
          q: e.target.value,
        },
      });
      // set the items
      setItems(data);
    } else {
        // if search bar is blank, remove items to remove the container
        setItems([])
    }
  };

  return (
    <>
      <searchContext.Provider value={search}>
        <div  className={styles.searchForm}>
          <input
            type="search"
            placeholder="Rechercher un produit"
            className={styles.search}
            value={search}
            onChange={handleChange}
          />
          <button type="submit" className={styles.searchButton} onClick={CallSearch}>
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
