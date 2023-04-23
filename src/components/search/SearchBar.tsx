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
import {useOuterClick} from '../../lib/hooks'
import { useRouter} from 'next/router';

export const searchContext = createContext<{search:string, select: number}>({search: "", select:-1});


/**
 * 
 * let key =  "name"
 * let sellerProduct =  {product: {name: ""}}
 *  
 * let value = sellerProduct[key] -> its undefined
 * can resolve:
 * let key = "product.name"
 * 
 * let value = pathObject(sellerProduct, key) // its workkk youhouuuuu
 */
const pathObject = (obj:any, path:string):any => {
  let parts = path.split(".")
  if(parts.length === 1){
    return obj[parts[0]]
  }
  return pathObject(obj[parts[0]], parts.slice(1).join("."))
}
/**
 *
 * Componant qui met en valeur ta recherche actuel
 */
export const Highlight: FC<{ attribute: string; hit: any }> = ({
  attribute,
  hit,
}) => {
  const {search} = useContext(searchContext);
  const text = pathObject(hit, attribute);
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
  const {select} = useContext(searchContext);

  return items.length ? (
    <div className="w-full absolute p-2 my-5 flex flex-col gap-2 bg-zinc-50 border-2 border-mkDarkGreen rounded-md">
      {items.map((item, i) => {
        return <HitComponent key={i} hit={item} selected={i === select} />;
      })}
      <div className="flex flex-row gap-2 text-xs pt-2 border-t text-gray-500 leading-4">
        {/* https://github.com/halfmage/majesticons */}
        Navigate
        <span className="p-1 bg-gray-200 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 5l6 6m-6-6l-6 6m6-6v14"></path></svg>       
        </span>
        <span className="p-1 bg-gray-200 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 19l6-6m-6 6l-6-6m6 6V5"></path></svg>
        </span>
        <div>
          |
        </div>
        Goto 
        <span className="p-1 bg-gray-200 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m4.641 12.5l2.873 2.704a.75.75 0 0 1-1.028 1.092l-4.25-4a.75.75 0 0 1 0-1.092l4.25-4a.75.75 0 1 1 1.028 1.092L4.641 11H14.75a1.75 1.75 0 0 0 1.75-1.75v-4.5a.75.75 0 0 1 1.5 0v4.5a3.25 3.25 0 0 1-3.25 3.25H4.641Z"></path></svg>        </span>
        </div>
    </div>
  ) : null;
};

// Hit component
const hit = ({ hit, selected }) => {
  return (
    <div className={`p-2 shadow rounded ${selected ? 'bg-mkDarkGreen': ''}`}>
      <span>
        <Highlight attribute="product.name" hit={hit} />
      </span>
      {/* <span>desc: <Highlight attribute='desc' hit={hit}/></span> */}
    </div>
  );
};

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [select, setSelect] = useState(-1)
  const [active, setActive] = useState(false)
  const router = useRouter()
  const ref = useOuterClick(ev => { // if click outside of component        
    setActive(false)
    setSelect(-1)
})
  const CallSearch = async () => {
    console.log(search);
    // redirect on product page with products?query=Iphone
    // axios.get("/api/search", {data: "adqd", method})
  };

  const handleChange = async (e) => {
    // set the search text when we typing
    setSearch(e.target.value);
    if (e.target.value) {
      // if have value
      // do a get http request to get the search query
      // by passing the search value in query params
      // /api/search?q=phone
      const { data } = await axios.get("/api/search", {
        params: {
          q: e.target.value,
          s: "enta"
        },
      });
      // remove all duplicate products
      const unique = data.filter((v,i,a)=>a.findIndex(v2=>(v2.product.id===v.product.id))===i)

      // set the items
      setItems(unique);
      setActive(true)
    } else {
      // if search bar is blank, remove items to remove the container
      setItems([]);
      setActive(false)

    }
  };
  useEffect(() => {
    console.log(select);
    
  }, [select])

  const handle = (e) => {    
    // console.log(e);
    
    if(e.key === "ArrowDown"){
      if(!(items.length - 1 === select)){
        setSelect(s => s += 1)
      }
    }

    if(e.key === "ArrowUp") {
      if((select >= 0)){
        setSelect(s => s -= 1)
      }
    }

    if(e.key === "Enter") {
      if(select !== -1){
        const item = items[select]
        if(item){
          console.log(item);
          router.push(`/product/${item.id}`)
        }
      } else {
        if(router.pathname === "/products"){ // when on products pages
          const query = router.query
          if(!search){ // when we want to remove the search by sent blank search
            if(query['search']){
              delete query['search']
            }
          }
          router.push({pathname: '/products', query: {
            ...router.query,
          }})
        }

        if(search){
          router.push(`/products/?search=${search}`)
        }
      }
    }
    
  }

  return (
    <>
      <searchContext.Provider value={{search:search, select:select}}>
        <div ref={ref} className="flex flex-col items-center relative justify-center relativ gap-2 w-2/5 ">
          <div className="flex flex-row items-center leading-7 relative focus:fill-mkOrange w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute h-5 w-5 left-4 fill-mkDarkOrange stroke-2"
              viewBox="0 0 20 20"
            >
              <path
                // fill="currentColor"
                // fillRule="evenodd"
                d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
                clipRule="evenodd"
              ></path>
            </svg>

            <input
              type="text"
              placeholder="Rechercher un produit"
              className="w-full h-10 py-4 pl-10 leading-7 border-2 border-transparent outline-none rounded-md transition duration-300 ease-in-out hover:outline-none hover:border-2 hover:shadow hover:border-mkDarkGreen focus:shadow focus:border-mkDarkGreen"
              value={search}
              onChange={handleChange}
              onKeyUp={handle}
            />
          </div>
          {items && active ? (
              <div className="w-full absolute">
                <Hits items={items} HitComponent={hit} />
              </div>
            ) : null}
        </div>
      </searchContext.Provider>
    </>
  );
};
