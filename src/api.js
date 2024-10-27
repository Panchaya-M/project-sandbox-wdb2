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

export async function getCollections() {
  const result = await axios.get(
    "https://api.storefront.wdb.skooldio.dev/collections"
  );

  if (
    Array.isArray(result.data) &&
    result.data.length > 0
  ) {
    return result.data
  }

  return [];
}


export async function getProductByCategory(
  collection = null,
  categories = [],
  fieldName = "name",
  sort = "asc"
) {
  const categoriesQuery = categories.join(",");

  const queries = [`&sort=${fieldName}:${sort}`]

  if (collection !== null) {
    queries.push(`collection=${collection}`)
  }

  if (categoriesQuery !== '') {
    queries.push(`categories=${categoriesQuery}`)
  }

  const result = await axios.get(
    `https://api.storefront.wdb.skooldio.dev/products?${queries.join('&')}`
  );

  if (
    result.data &&
    Array.isArray(result.data.data) &&
    result.data.data.length > 0
  ) {
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

export function addProductToExistingCart(cartId, body) {
  return axios.post(
    `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items`,
    body
  );
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
