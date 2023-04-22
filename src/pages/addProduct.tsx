import Head from "next/head";
import Layout from "../components/layout";
import axios from "axios";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Add.module.css";

const fetcher = async (url: string) => {
  const res = await axios.get(`${url}`);
  return res.data;
};

// function AddProduct() {
//   const { data: product, error } = useSWR(
//     `/api/addProductToDB/?productData=${productData}`,
//     fetcher
//   );
//   if (error) return <div>Failed to load data</div>;
export default function AddProduct() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      // image: event.target.image.value,
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
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ajout de produit</title>
      </Head>
      <main>
        <Layout pageName={"Ajouter produit"}>
          <form onSubmit={handleSubmit} className={styles.addForm}>
            <label htmlFor="name">Nom du Produit*</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              required
            />
            <br />
            <br />
            <label htmlFor="image">Photo du produit</label>
            <br />
            <input type="file" id="image" name="image" />
            <br />
            <br />
            <label htmlFor="desc">Description du produit*</label>
            <br />
            <input type="text" id="desc" name="desc" required />
            <br />
            <br />
            <label htmlFor="category">Categorie du produit*</label>
            <br />
            <input type="text" id="category" name="category" required />
            <br />
            <br />
            <label htmlFor="quantity">Quantité mise en vente*</label>
            <br />
            <input
              type="text"
              id="quantity"
              name="quantity"
              pattern="{1,1000000}"
              required
            />
            <br />
            <br />
            <label htmlFor="price">Prix unitaire*</label>
            <br />
            <input
              type="text"
              id="price"
              name="price"
              pattern="{1,1000000}"
              required
            />
            €
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
        </Layout>
      </main>
    </div>
  );
}
