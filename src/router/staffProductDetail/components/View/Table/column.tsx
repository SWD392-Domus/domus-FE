import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { ArrowUpDown } from "lucide-react";
import {
  ProductDetailsProps,
} from "@/router/productDetails/type";

export const columns: ColumnDef<ProductDetailsProps>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const createdDateString: string = row.getValue("createdAt");
        const createdDate: Date = new Date(createdDateString);
    
        // Check if the date is valid before formatting
        if (!isNaN(createdDate.getTime())) {
          // Format the date
          const formattedDate = createdDate.toLocaleString();
    
          return <div>{formattedDate}</div>;
        } else {
          return <div>No data</div>;
        }
      },
  },
  {
    accessorKey: "images",
    cell: ({ row }) => {
      const image: string = row.getValue("images");
      return (
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>NONE</AvatarFallback>
        </Avatar>
      );
    },
  },
  //   {
  //     accessorKey: "productName",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Name
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       )
  //     },
  //     cell: ({ row }) => {
  //         const name: string = row.getValue("productName");
  //         return <>{name ?
  //         <div className="truncate">{name}</div>
  //         :
  //         <div>No brand</div>}</>;
  //       },
  //   },
  //   {
  //     accessorKey: "brand",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Brand
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       )
  //     },
  //     cell: ({ row }) => {
  //       const brand: string = row.getValue("brand");
  //       return <>{brand ? <div>{brand}</div> : <div>No brand</div>}</>;
  //     },
  //   },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const prices: Number = row.getValue("price");
        return <>{prices ? <div>{prices.toString()}</div> : <div>No price</div>}</>;
    },
  },
];
