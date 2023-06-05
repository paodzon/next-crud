import DeleteModal from '@/components/products/DeleteModal';
import ProductModal from '@/components/products/ProductModal';
import { getCategories, getProductById } from '@/lib/utils/serverSideProps'
import Link from 'next/link';

interface ProductDetailsProps {
  params: any,
}

const ProductDetails =async ( {params}: ProductDetailsProps) => {
  const product:Product = await getProductById(params.id); 
  const categories = await getCategories();
  console.log(product);
  return (
    <div className='flex flex-col justify-center m-20 border border-white rounded-md'>
      <div className='flex flex-row justify-between items-center border-b border-white p-5 w-full'>
        <h2 className='text-lg font-bold'>Product Name: {product.name}</h2>
        
        <div className='flex items-center gap-4'>
          <Link href='/'>Go back</Link>
          <ProductModal product={product} action='Edit' categories={categories.data}/>
          <DeleteModal id={product.id}/>
        </div>
      </div>
      <div className='p-5 flex flex-col gap-5'>
        <p>Description: {product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Date Added: {product.date_added.split('T')[0]}</p>
      </div>
    </div>
  )
}

export default ProductDetails