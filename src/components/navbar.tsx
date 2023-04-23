import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { User } from "@/pages/api/user";
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import Router from "next/router";
import redirection from "@/lib/redirection";
import { SearchBar } from "./search/SearchBar";

export default function Navbar({
  pageName,
  user,
}: {
  pageName: string;
  user: User;
}) {
  const { mutateUser } = useUser({
    redirectIfFound: false,
  });
  const redirect = redirection(user);

  return (
    <>
      <div className={`${styles.container} bg-mkGreen`}>
        <div className="flex flex-row mx-auto ml-[24px]">
          {/* <div className="my-auto mr-[24px]">
                        <Image src="/menu.png" width={40} height={40} alt="Menu latéral" />
                    </div> */}

          <div className="my-auto mr-[24px]">
            <Link href="/">
              <Image src="/logo.png" width={200} height={50} alt="Logo" />
            </Link>
          </div>
        </div>

        <SearchBar />

        <div className="flex flex-row mr-[24px]">
          {user && user !== null ? (
            <div className="relative group">
              <div>
                <Link href={redirect.path}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-mkDarkBlue"
                    width="2em"
                    height="2em"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09c.016.016.032.016.032.032c.144.112.288.224.448.336c.08.048.144.111.224.175A7.98 7.98 0 0 0 8.016 16a7.98 7.98 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16c.144-.111.304-.223.448-.335c.016-.016.032-.016.032-.032c1.696-1.487 2.8-3.676 2.8-6.106zm-8 7.001c-1.504 0-2.88-.48-4.016-1.279c.016-.128.048-.255.08-.383a4.17 4.17 0 0 1 .416-.991c.176-.304.384-.576.64-.816c.24-.24.528-.463.816-.639c.304-.176.624-.304.976-.4A4.15 4.15 0 0 1 8 10.342a4.185 4.185 0 0 1 2.928 1.166c.368.368.656.8.864 1.295c.112.288.192.592.24.911A7.03 7.03 0 0 1 8 14.993zm-2.448-7.4a2.49 2.49 0 0 1-.208-1.024c0-.351.064-.703.208-1.023c.144-.32.336-.607.576-.847c.24-.24.528-.431.848-.575c.32-.144.672-.208 1.024-.208c.368 0 .704.064 1.024.208c.32.144.608.336.848.575c.24.24.432.528.576.847c.144.32.208.672.208 1.023c0 .368-.064.704-.208 1.023a2.84 2.84 0 0 1-.576.848a2.84 2.84 0 0 1-.848.575a2.715 2.715 0 0 1-2.064 0a2.84 2.84 0 0 1-.848-.575a2.526 2.526 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.22 5.22 0 0 0-.688-1.406a4.883 4.883 0 0 0-1.088-1.135a5.207 5.207 0 0 0-1.04-.608a2.82 2.82 0 0 0 .464-.383a4.2 4.2 0 0 0 .624-.784a3.624 3.624 0 0 0 .528-1.934a3.71 3.71 0 0 0-.288-1.47a3.799 3.799 0 0 0-.816-1.199a3.845 3.845 0 0 0-1.2-.8a3.72 3.72 0 0 0-1.472-.287a3.72 3.72 0 0 0-1.472.288a3.631 3.631 0 0 0-1.2.815a3.84 3.84 0 0 0-.8 1.199a3.71 3.71 0 0 0-.288 1.47c0 .352.048.688.144 1.007c.096.336.224.64.4.927c.16.288.384.544.624.784c.144.144.304.271.48.383a5.12 5.12 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a4.999 4.999 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992C.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907z"></path>
                  </svg>{" "}
                </Link>
                <ul className="absolute z-10 hidden group-hover:block mt-1 py-2 w-48 bg-mkGreen rounded-b-md shadow-lg top-15 right-0">
                  <li>
                    <Link href={redirect.path}>
                      <p className="block px-4 py-2 text-sm text-mkDarkBlue hover:bg-[#96c9b9] hover:text-gray-900 duration-150">
                        {redirect.desc}
                      </p>
                    </Link>
                  </li>
                  {user.status === "CLIENT" ? (
                    <li>
                      <Link href="/subscription">
                        <p className="block px-4 py-2 text-sm text-mkDarkBlue hover:bg-[#96c9b9] hover:text-gray-900 duration-150">
                          {user.isSubscribed ? "Mon abonnement" : "S'abonner"}
                        </p>
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li>
                    <p
                      onClick={() => {
                        logout(mutateUser); // On déconnecte l'utilisateur et on supprime les informations de la session
                        Router.replace("/").then(() => Router.reload()); // On fait un full reload pour éviter que le dropdown s'affiche alors qu'il ne devrait pas
                      }}
                      className="block px-4 py-2 text-sm text-mkDarkBlue hover:bg-[#96c9b9] hover:text-gray-900 duration-150 cursor-pointer"
                    >
                      Se déconnecter
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link href="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-mkDarkBlue pb-1"
                  width="2.2em"
                  height="2.2em"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.76 0C15.417 0 20 4.477 20 10S15.416 20 9.76 20c-3.191 0-6.142-1.437-8.07-3.846a.644.644 0 0 1 .115-.918a.68.68 0 0 1 .94.113a8.96 8.96 0 0 0 7.016 3.343c4.915 0 8.9-3.892 8.9-8.692c0-4.8-3.985-8.692-8.9-8.692a8.961 8.961 0 0 0-6.944 3.255a.68.68 0 0 1-.942.101a.644.644 0 0 1-.103-.92C3.703 1.394 6.615 0 9.761 0Zm.545 6.862l2.707 2.707c.262.262.267.68.011.936L10.38 13.15a.662.662 0 0 1-.937-.011a.662.662 0 0 1-.01-.937l1.547-1.548l-10.31.001A.662.662 0 0 1 0 10c0-.361.3-.654.67-.654h10.268L9.38 7.787a.662.662 0 0 1-.01-.937a.662.662 0 0 1 .935.011Z"></path>
                </svg>
              </Link>
            </div>
          )}
          <div>
            <Link href="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-mkDarkBlue pb-1"
                width="2.5em"
                height="2.5em"
                viewBox="0 0 256 256"
              >
                <path d="M136 120v56a8 8 0 0 1-16 0v-56a8 8 0 0 1 16 0Zm103.86-21.89L226 202.12A16 16 0 0 1 210.13 216H45.87A16 16 0 0 1 30 202.12l-13.87-104A16 16 0 0 1 32 80h36.37L122 18.73a8 8 0 0 1 12 0L187.63 80H224a16 16 0 0 1 15.85 18.11ZM89.63 80h76.74L128 36.15ZM224 96H32l13.87 104h164.26Zm-51.16 23.2l-5.6 56a8 8 0 0 0 7.16 8.8a7.44 7.44 0 0 0 .81 0a8 8 0 0 0 7.95-7.2l5.6-56a8 8 0 0 0-15.92-1.6Zm-89.68 0a8 8 0 0 0-15.92 1.6l5.6 56a8 8 0 0 0 8 7.2a7.44 7.44 0 0 0 .81 0a8 8 0 0 0 7.16-8.76Z"></path>
              </svg>
            </Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

async function logout(mutateUser: Function) {
  mutateUser(
    await fetchJson("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
    false
  );
}
