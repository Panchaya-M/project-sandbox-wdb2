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

  if (Array.isArray(result.data) && result.data.length > 0) {
    return result.data;
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

  const queries = [`&sort=${fieldName}:${sort}`];

  if (collection !== null) {
    queries.push(`collection=${collection}`);
  }

  if (categoriesQuery !== "") {
    queries.push(`categories=${categoriesQuery}`);
  }

  const result = await axios.get(
    `https://api.storefront.wdb.skooldio.dev/products?${queries.join("&")}`
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

export async function getCartById(cartId) {
  if (!cartId) {
    throw new Error("Cart ID is required");
  }

  try {
    const result = await axios.get(
      `https://api.storefront.wdb.skooldio.dev/carts/${cartId}`
    );

    if (result.data && result.data.id) {
      return result.data;
    }

    return null; // return null if the cart is not found or empty response
  } catch (error) {
    console.error(`Failed to fetch cart by ID: ${cartId}, error`);
    throw error; // re-throw the error to handle it in the calling function
  }
}

export async function updateItemInCart(cartId, itemId, body) {
  try {
    const response = await axios.patch(
      `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items/${itemId}`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item in cart:", error);
    throw error;
  }
}

export async function removeItemFromCart(cartId, itemId) {
  try {
    const response = await axios.delete(
      `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items/${itemId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
}
