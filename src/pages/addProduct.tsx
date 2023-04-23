import { User } from "./api/user";
import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

import checkUserStatus from "@/lib/checkUserStatus";
import Layout from "../components/layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import uploadImageToImgur from "./api/uploadImageToImgur";
import { useRouter } from "next/router";

const fetcher = async (url: string) => {
  const res = await axios.get(`${url}`);
  return res.data;
};

export default function AddProduct({ user }: { user: User }) {
  if (checkUserStatus(user, "SELLER") || checkUserStatus(user, "MARKETPLACE")) {
    const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {
        userId: user.id,
        name: event.target.name.value,
        imgUrl: event.target.imgUrl.value,
        desc: event.target.desc.value,
        category: event.target.category.value,
        quantity: parseInt(event.target.quantity.value),
        price: parseFloat(event.target.price.value),
      };

      const JSONdata = JSON.stringify(data);

      const endpoint = "/api/addProductToDB";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);

      const result = await response.json();

      // const file = event.target.image.files[0];
      // const imgUrl = await uploadImageToImgur(file);

      // if (imgUrl) {
      //   console.log("Image uploaded successfully:", imgUrl);
      // } else {
      //   console.error("Failed to upload image");
      // }
    };
    return (
      <Layout pageName={"Ajouter produit"}>
        <div className="w-1/3 border-solid border-2 rounded p-5 my-0">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="font-semibold" htmlFor="name">
              Nom du Produit
            </label>
            <input
              type="text"
              name="name"
              minLength={4}
              className="p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700"
              required
            />
            <label className="font-semibold" htmlFor="image">
              Url de la photo du produit
            </label>
            <input
              type="URL"
              name="imgUrl"
              placeholder="https://exemple.com"
              pattern="https://.*"
              className="p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700"
              required
            />
            {/* <input
              type="file"
              accept="image/*"
              name="image"
              className="p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700"
            /> */}
            <label className="font-semibold" htmlFor="desc">
              Description du produit
            </label>
            <textarea
              name="desc"
              className="mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700"
              required
            />
            <label className="font-semibold" htmlFor="category">
              Categorie du produit
            </label>
            <div className="flex">
              <input
                type="radio"
                id="mode"
                name="category"
                value="Mode"
                required
              />
              <label htmlFor="mode">Mode</label>
            </div>
            <div className="flex">
              <input
                type="radio"
                id="high-tech"
                name="category"
                value="High-tech"
                required
              />
              <label htmlFor="high-tech">High-tech</label>
            </div>
            <div className="flex">
              <input
                type="radio"
                id="maison"
                name="category"
                value="Maison"
                required
              />
              <label htmlFor="maison">Maison</label>
            </div>
            <div className="flex flex-lin">
              <input
                type="radio"
                id="jeux&jouets"
                name="category"
                value="Jeux & Jouets"
                required
              />
              <label htmlFor="jeux&jouets">Jeux & Jouets</label>
            </div>
            <label className="font-semibold" htmlFor="quantity">
              Quantité mise en vente
            </label>
            <input
              type="text"
              name="quantity"
              pattern="{1,1000000}"
              className="p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700"
              required
            />
            <label className="font-semibold" htmlFor="price">
              Prix unitaire
            </label>
            <input
              type="text"
              name="price"
              pattern="{1,1000000}"
              className="p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700"
              placeholder="€"
              required
            />
            <br />
            <br />
            <button
              type="submit"
              className="text-mkDarkBlue w-full rounded-md bg-mkOrange p-2 text mr-5 hover:bg-[#e7a08c] shadow active:shadow-sm hover:shadow-md hover:-translate-y-1 active:-translate-y-0 active:bg-mkOrange transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </Layout>
    );
  } else {
    return (
      <>
        <Layout pageName={"Non autorisé"} user={user}></Layout>
      </>
    );
  }
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
