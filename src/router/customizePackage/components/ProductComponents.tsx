import React, { useState, useEffect } from "react";
import QuantityInput from "./QuantityInput";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    src: string;
}

const ProductComponents: React.FC<{ products: ProductProps[] }> = ({ products }) => {
    const [productList, setProductList] = useState<ProductProps[]>([]);

    useEffect(() => {
        setProductList(products);
    }, [products]);

    if (productList) console.log(productList);

    const handleRemoveProduct = (productId: number) => {
        setProductList((prevList) =>
            prevList.filter((product) => product.id !== productId)
        );
    };

    return (
        <div className="flex flex-col shrink ring-1 ring-slate-300 p-2 rounded-md overflow-scroll h-[600px]">
            {productList.map((product, index) => (
                <div className="flex items-center gap-4 p-4" key={index}>
                    <div className="w-[140px] h-[156px] border-md">
                        <img
                            src={product.src}
                            className="w-[140px] h-[156px] object-cover"
                            alt={product.name}
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-start">
                        <h1 className="font-semibold text-lg">
                            {product.name}
                        </h1>
                        <h1 className="text-sm font-thin">Size : M, L</h1>
                        <div className="flex flex-wrap justify-between items-center gap-10">
                            <h1 className="font-semibold">{product.price}</h1>
                            <div className="flex justify-center items-center gap-4">
                                <div
                                    className="hover:bg-slate-50 p-2 rounded-lg"
                                    onClick={() =>
                                        handleRemoveProduct(product.id)
                                    }
                                >
                                    Remove
                                </div>
                                <QuantityInput />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductComponents;
