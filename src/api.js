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
product detail
*/
export function getProductDetail(permalink) {
  return axios.get(
    "https://api.storefront.wdb.skooldio.dev/products/" + permalink
  );
}

export function getAllProducts(params) {
  return axios.get("https://api.storefront.wdb.skooldio.dev/products", {
    params: params,
  });
}

export function createNewCart(body) {
  return axios.post("https://api.storefront.wdb.skooldio.dev/carts", body);
}

export async function getCategoryDetail(id) {
  const categories = await getAllCategory();

  return categories.find((category) => category.id === id);
}

export async function getParentCategory() {
  const categories = await getAllCategory();

  return categories.filter((category) => category.parentId === null);
}

export async function getChildrenCategories(parentId) {
  const categories = await getAllCategory();

  if (!parentId) {
    return [];
  }

  return categories.filter((category) => category.parentId === parentId);
}