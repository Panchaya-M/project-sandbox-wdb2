import axios from "axios";
export async function getCollection() {
  const result = await axios.get(
    "https://api.storefront.wdb.skooldio.dev/collections"
  );

  if (
    Array.isArray(result.data) &&
    result.data.length > 0 &&
    result.data[0].items &&
    result.data[0].items.length > 0
  ) {
    return result.data[result.data.length - 1].items.reverse();
  }

  return [];
}

export async function getProductByCategory(
  categories = [],
  fieldName = "name",
  sort = "asc"
) {
  const categoriesQuery = categories.join(",");

  const result = await axios.get(
    `https://api.storefront.wdb.skooldio.dev/products?${ categoriesQuery === '' ? '' : `categories=${categoriesQuery}` }&sort=${fieldName}:${sort}`
  );

  if (result.data && Array.isArray(result.data.data) && result.data.data.length > 0) {
    return result.data.data;
  }

  return [];
}

/*
[]

id: string;
name: string;
permalink: string;
parentId: string | null;
*/
export async function getAllCategory() {
  const result = await axios.get(
    "https://api.storefront.wdb.skooldio.dev/categories"
  );

  if (Array.isArray(result.data) && result.data.length > 0) {
    return result.data;
  }

  return [];
}

/*
get product detail
*/
export async function getProductDetail(permalink) {
  const result = await axios.get("https://api.storefront.wdb.skooldio.dev/products/" + permalink) 

  return result.data;
}

export async function getAllProducts(
  params
) {

  const result = await axios.get(
    "https://api.storefront.wdb.skooldio.dev/products", {
      params: params
    }
  );

  if (result.data && Array.isArray(result.data.data) && result.data.data.length > 0) {
    return result.data.data;
  }

  return [];
}
