export const getProducts = async () => {
  const response = await fetch(`${process.env.NEXT_API}/api/products`, { cache: "no-store" });
  return response.json();
};

export const getProductById = async (id:number) => {
  const response = await fetch(`${process.env.NEXT_API}/api/products/${id}`, {cache: "no-store"});
  const {data}= await response.json();
  return data;
}

export const getCategories = async () => {
  const response = await fetch(`${process.env.NEXT_API}/api/categories`, {cache: "no-store"});
  return response.json()
}