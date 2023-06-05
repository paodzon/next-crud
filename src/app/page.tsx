import ProductTable from "@/components/products/ProductTable";
import { getCategories, getProducts } from "@/lib/utils/serverSideProps";

export default async function Home() {

  const products = await getProducts();
  const categories = await getCategories();
  return (
    <div className="m-20">
      <ProductTable products={products.data} categories={categories.data}/>
    </div>
  )
}
