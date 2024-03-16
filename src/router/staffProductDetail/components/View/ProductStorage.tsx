import React from 'react'
import { DataTable } from './Table/data-table'
import { columns } from './Table/column'
import { productSelector } from '@/router/productDetails/slice/selector'
import { useSelector } from 'react-redux'
import { ProductDetailsProps } from '@/router/productDetails/type'

interface Props {}

const ProductStorage: React.FC<Props> = () => {
  const { product } = useSelector(productSelector);
    const { details } = product;
    const detailsList = details.map((detail: ProductDetailsProps) =>{
      return detail.prices.map(price => ({
        images: detail.images[0].imageUrl,
        attribute: detail.attributes,
        price: price.price,
        quantity: price.quantity,
        createdAt: price.createdAt
      }));
    })
    const detailsListConcat=detailsList.flat()
  return (
    <div className='h-auto '>
        <DataTable columns={columns} data={detailsListConcat}/>
    </div>
  )
}

export default ProductStorage