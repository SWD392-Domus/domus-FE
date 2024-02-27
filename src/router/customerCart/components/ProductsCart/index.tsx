// import { productList } from "@/router/products/data";
import React, { useEffect } from "react";
import ProductComponents from "./ProductComponents";
import { actions as actionsCart } from "@/router/customerCart/slice"
import selector from "@/router/customerCart/slice/selector"
import { useSelector, useDispatch } from "react-redux";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const productIdQuans = useSelector(selector.productDetails);
  const loadCartProductDetails = async () => {
    const cart = localStorage.getItem("cart");
    const cartArray = cart ? JSON.parse(cart) : [];
    localStorage.setItem("cart", JSON.stringify(cartArray));
    dispatch(actionsCart.setProductDetails(cartArray));
  }

  useEffect(() => {
    loadCartProductDetails();
  }, []);
  // const productData = productList;
  return (
    <div className="flex flex-col gap-5">
      <div className="font-semibold text-3xl py-4">Cart</div>
      <ProductComponents productIdQuans={productIdQuans} />
    </div>
  );
};

export default Cart;
