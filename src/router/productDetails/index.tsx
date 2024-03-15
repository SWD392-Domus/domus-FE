import TabNavigation from "./components/TabNavigation";
import { Button } from "@/components/ui/Button/Button";
// import SizeToggle from "./components/SizeToggle";
// import ColorToggle from "./components/ColorToggle";
// import MaterialToggle from "./components/MaterialToggle";
import ProductAccordion from "./components/ProductAccordion";
// import Suggestion from "./components/Suggestion";
import Slider from "@/components/PublicComponents/Slider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetailsHuy } from "./usecases/getProductDetailsHuy";
import Loading from "@/components/PublicComponents/Loading";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./sliceForCart";
import selector from "./sliceForCart/selector";
import { actions as actionsCart } from "@/router/customerCart/slice";
// import { selector as selectorCart } from "@/router/customerCart/slice/selector"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import { ToastAction } from "@/components/ui/Toast/toast"
import { useToast } from "@/components/ui/Toast/use-toast"
import { useNavigate } from "react-router-dom";

type RouteParams = {
    id: string;
};

const ProductDetails: React.FC = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams<RouteParams>();
    const dispatch = useDispatch();
    const product: any = useSelector(selector.product);
    const fields: any = useSelector(selector.fields);
    const isCheckedIds: any = useSelector(selector.isCheckedIds);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const getProductDetailsData = async () => {
            if (id) {
                const res = await getProductDetailsHuy(id);
                if (res) {
                    dispatch(actions.setProduct(res));
                    setUpdated(true);

                    const fieldsArray: any = [];

                    res?.details?.forEach((detail: any) => {
                        detail?.attributes?.forEach((attribute: any) => {
                            const attributeExists = fieldsArray.some(
                                (field: any) => field.name === attribute.name
                            );

                            if (!attributeExists) {
                                fieldsArray.push({
                                    name: attribute.name,
                                    values: [
                                        {
                                            value: attribute.value,
                                            ids: [
                                                {
                                                    id: detail.id,
                                                    price: detail.displayPrice,
                                                },
                                            ],
                                            isDisabled: false,
                                            isChecked: false,
                                        },
                                    ],
                                });
                            } else {
                                const index = fieldsArray.findIndex(
                                    (field: any) =>
                                        field.name === attribute.name
                                );

                                const valueExists = fieldsArray[
                                    index
                                ].values.some(
                                    (value: any) =>
                                        value.value === attribute.value
                                );

                                if (!valueExists) {
                                    fieldsArray[index].values.push({
                                        value: attribute.value,
                                        ids: [
                                            {
                                                id: detail.id,
                                                price: detail.displayPrice,
                                            },
                                        ],
                                        isDisabled: false,
                                        isChecked: false,
                                    });
                                } else {
                                    const valueIndex = fieldsArray[
                                        index
                                    ].values.findIndex(
                                        (value: any) =>
                                            value.value === attribute.value
                                    );
                                    fieldsArray[index].values[
                                        valueIndex
                                    ].ids.push({
                                        id: detail.id,
                                        price: detail.displayPrice,
                                    });
                                }
                            }
                        });
                    });
                    dispatch(actions.setFields(fieldsArray));
                }
            }
        };

        getProductDetailsData();
    }, [id]);

    if (!product) {
        return (
            <div className="h-screen flex justify-center items-center text-2xl">
                Product not found
            </div>
        );
    }

    const handleAddToCart = async () => {
        try {
            const cart = localStorage.getItem("cart")
                ? JSON.parse(localStorage.getItem("cart") as string)
                : { productDetails: [] };
            // const productDetailIdToAdd: any = isCheckedIds[0];
            let productDetailIdPriceToAdd: any;
            fields.some((field: any) => {
                const foundValue = field.values.find(
                    (value: any) => value.ids.length > 0 && value.isChecked === true
                );
                const sendValue = foundValue.ids.find((idAndPrice: any) =>
                    isCheckedIds.includes(idAndPrice.id)
                );
                if (foundValue) {
                    productDetailIdPriceToAdd = sendValue;
                    return true;
                }
            });
            const cartArray = cart.productDetails ? cart.productDetails : [];

            const productExists = cartArray.some((cartObject: any) => {
                if (cartObject.id == productDetailIdPriceToAdd.id) {
                    cartObject.quantity += 1;
                    return true;
                }
                return false;
            });

            if (!productExists) {
                cartArray.push({
                    id: productDetailIdPriceToAdd.id,
                    price: productDetailIdPriceToAdd.price,
                    quantity: 1,
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            const cartNumber: any = JSON.parse(localStorage.getItem("cart") as string).productDetails
                ? JSON.parse(localStorage.getItem("cart") as string).productDetails.length
                : 0;
            dispatch(actionsCart.setCartNumber(cartNumber));
            navigate("/customer/settings/cart");
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Select at least one attribute!",
                description:
                    "There was a problem with your request.",
                action: (
                    <ToastAction altText="Try again">
                        Try again
                    </ToastAction>
                ),
            })
        }
    };

    return (
        <div className="">
            {updated ? (
                <div className="h-auto pt-20 lg:flex lg:flex-wrap xl:justify-center ">
                    <div className="flex flex-col">
                        <nav className="flex justify-start ml-4 my-2">
                            <TabNavigation name={product?.productName} />
                        </nav>

                        <div
                            className="w-auto h-auto p-10 flex justify-center items-center py-20
      lg:justify-start lg:ml-4 lg:gap-2"
                        >
                            <div
                                className="w-[300px] h-[300px] shrink 
        md:w-[600px] md:h-[600px]
        xl:w-[700px] xl:h-[700px]"
                            >
                                <Slider
                                    images={product?.details[0]?.images?.map(
                                        (image: any) => image?.imageUrl
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-[30%] flex flex-col gap-2 pl-4 pt-20">
                        <div
                            className="text-gray-600 text-sm font-thin
          md:text-xl 
        "
                        >
                            {product?.brand}
                        </div>
                        <div
                            className="text-black text-xl font-thin
          md:text-4xl
        "
                        >
                            {product?.productName}
                        </div>
                        {/* <div className="font-semibold md:text-2xl flex flex-col">
                            <span className="text-sm font-thin">
                                Estimated price:{" "}
                            </span>
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                            }).format(product?.details[0]?.displayPrice )}
                        </div> */}
                        {fields.map((field: any) => (
                            <div className="flex flex-col gap-2">
                                <div className="text-black font-thin">
                                    {field.name}
                                </div>
                                <div className="flex justify-start">
                                    <ToggleGroup
                                        type="single"
                                        variant="outline"
                                    // onValueChange={(e) => {
                                    // dispatch(actions.hideValueBasedOnIds({ ids: e, name: field.name }));
                                    // console.log(e);
                                    // }}
                                    >
                                        {field.values.map((value: any) => (
                                            <ToggleGroupItem
                                                value={value}
                                                aria-label="Toggle bold"
                                                disabled={value.isDisabled}
                                                data-state={
                                                    value.isChecked
                                                        ? "on"
                                                        : "off"
                                                }
                                                onClick={() => {
                                                    dispatch(
                                                        actions.onClickCheck(
                                                            value
                                                        )
                                                    );
                                                }}
                                            >
                                                {value.value}
                                            </ToggleGroupItem>
                                        ))}
                                    </ToggleGroup>
                                </div>
                            </div>
                        ))}
                        <div className="mt-10">
                            <Button
                                onClick={handleAddToCart}
                                className="cursor-pointer"
                            >
                                Add To Cart
                            </Button>
                        </div>
                        <div className="h-auto pr-2">
                            <ProductAccordion title={product?.description} />
                        </div>
                    </div>
                    {/* <div className="flex justify-center items-center py-20">
                        <div className="max-md:hidden w-screen h-[300px] ">
                            <Suggestion />
                        </div>
                    </div> */}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default ProductDetails;
