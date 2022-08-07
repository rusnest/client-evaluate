import axios from "axios";

export async function evaluateProduct(link: string, shop: string) {
  try {
    const product = await axios({
      method: "POST",
      url: "http://localhost:4000/evaluate",
      data: {
        link,
        shop,
      },
    });

    if (product.data.status === 200) {
      return product.data.product;
    }

    return null;
  } catch (error) {
    console.log(error);
    return [];
  }
}
