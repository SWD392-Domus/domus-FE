// import { productList } from "@/router/products/data";
import React, { useEffect, useState } from "react";
import ProductComponents from "./ProductComponents";
import { actions as actionsCart } from "@/router/customerCart/slice"
import selector from "@/router/customerCart/slice/selector"
import { useSelector, useDispatch } from "react-redux";
import PackagePopUpTrigger from "./PackagePopUpTrigger";

const Cart: React.FC = () => {
  const [updated, setUpdated] = useState(false);
  const [packageUpdated, setPackageUpdated] = useState(false);
  const dispatch = useDispatch();
  const productIdQuans = useSelector(selector.productDetails);
  const packageA = useSelector(selector.package);
  const loadCartProductDetails = async () => {
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : { productDetails: [] };

    const cartArray = cart.productDetails;
    if (cartArray && cartArray.length > 0) {
      dispatch(actionsCart.setProductDetails(cartArray));
      setUpdated(true);
    }

    const packageB = cart.package;
    if (packageB && packageB.id) {
      dispatch(actionsCart.setPackage(packageB));
      setPackageUpdated(true);
    }
  }

  useEffect(() => {
    loadCartProductDetails();
  }, []);
  // const productData = productList;
  return (
    <>
      <div className="flex flex-col gap-5">
        {packageUpdated &&
          <PackagePopUpTrigger packageA={packageA}></PackagePopUpTrigger>
        }
        <div className="font-semibold text-3xl py-4">Cart</div>
        {updated &&
          <ProductComponents productIdQuans={productIdQuans} />
        }

      </div>
    </>
  );
};

export default Cart;
