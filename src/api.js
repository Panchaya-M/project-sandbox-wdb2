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

export async function getProductByCatrgory(
  categories = [],
  fieldName = "name",
  sort = "asc"
) {
  const categoriesQuery = categories.join(",");

  const result = await axios.get(
    `https://api.storefront.wdb.skooldio.dev/products?categories=${categoriesQuery}&sort=${fieldName}:${sort}`
  );

  if (Array.isArray(result.data) && result.data.length > 0) {
    return result.data;
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
