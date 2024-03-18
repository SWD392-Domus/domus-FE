import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { FaCartArrowDown } from "react-icons/fa6";

import React from "react";
import { Link } from "react-router-dom";
// import { PackageProps } from "@/router/packages/type";

interface Package {
    packageA: any;
}

const PackageCard: React.FC<Package> = ({ packageA }) => {
    const packageImage = packageA?.packageImages[0]?.imageUrl;
    const packageId = packageA?.id;
    const packageName = packageA?.name;
    // const packagePrice = packageA?.estimatedPrice;
    // const packageDescription = package?.description;
    return (
        <Link to={`/package/${packageId}`}>
            <Card className="w-[auto] h-[auto] border ">
                <CardHeader className="w-full">
                    <div className="flex justify-center">
                        <img
                            src={packageImage}
                            className="w-[288px] h-[288px] object-cover"
                            loading="lazy"
                        />
                    </div>
                </CardHeader>
                <CardContent className="">
                    <CardTitle className="">
                        <h2 className="truncate">{packageName}</h2>
                    </CardTitle>
                    {/* <CardDescription className="pb-2 pt-1 shrink">
            <p className="truncate">
              {packageDescription ? (
                packageDescription
              ) : (
                <p className="truncate">
                  Materials:Powder-coated aluminum frame. Marine grade Sunbrella
                  fabric canopy. Protective cover included. Parasol base covers
                  will display a slight color difference compared to the pole.
                  This is in order to offer an improved resistance to
                  scratching.
                </p>
              )}
            </p>
          </CardDescription> */}
                    {/* {packagePrice ?
            <CardTitle>
              <p className="text-2xl truncate">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(packagePrice)}
              </p>
            </CardTitle> : null} */}
                </CardContent>
                <CardFooter className="">
                    <div
                        className="w-10 h-10 bg-yellowCustom flex justify-center items-center 
          rounded-full cursor-pointer hover:opacity-80"
                    >
                        <FaCartArrowDown className="text-black" />
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default PackageCard;
