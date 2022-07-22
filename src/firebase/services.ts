import { db } from './config';
import { collection, getDocs, } from "firebase/firestore";

export const getProducts = async () => {
    try {
        const productRef = collection(db, "products");
        const snapshots = await getDocs(productRef);
        const products = snapshots.docs.map(item => ({
            ...item.data(),
            id: item.id
        }));

        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const countProduct = async () => {
    try {
        const productRef = collection(db, "products");
        const snapshots = await getDocs(productRef);

        return snapshots.docs.length;
    } catch (error) {
        console.log(error);
        return 0;
    }
}
