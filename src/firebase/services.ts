import { db } from "./config";
import {
  collection,
  getDocs,
  orderBy,
  OrderByDirection,
  query,
  where,
} from "firebase/firestore";

export const getProducts = async () => {
  try {
    const productRef = collection(db, "products");
    const snapshots = await getDocs(productRef);
    const products = snapshots.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const countProduct = async () => {
  try {
    const productRef = collection(db, "products");
    const snapshots = await getDocs(productRef);

    return snapshots.docs.length;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const sortPrice = async (sort: OrderByDirection) => {
  try {
    const productRef = collection(db, "products");
    const q = query(productRef, orderBy("price", sort));
    const snapshots = await getDocs(q);
    const products = snapshots.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductStar = async (star: string) => {
  try {
    const starSplit = star.split("-");
    const productRef = collection(db, "products");
    const q = query(
      productRef,
      where("star", ">=", parseInt(starSplit[0])),
      where("star", "<=", parseInt(starSplit[1]))
    );
    const snapshots = await getDocs(q);
    const products = snapshots.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductCategory = async (category: string) => {
  try {
    const productRef = collection(db, "products");
    const q = query(
      productRef,
      where("evaluate", "==", category)
    );
    const snapshots = await getDocs(q);
    const products = snapshots.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}
