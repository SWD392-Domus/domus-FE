import { ColumnDef } from "@tanstack/react-table";
import { ImagesProps, PriceProps, ProductsStorage } from "../../types/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { ArrowUpDown } from "lucide-react";

interface Props {
    
}
export const columns: ColumnDef<ProductsStorage>[] = [

  {
    accessorKey: "images",
    cell: ({ row }) => {
      const image: ImagesProps[] = row.getValue("images");
      const imageUrl = image[0]?.imageUrl;
      return (
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>NONE</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Name",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Name
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
    cell: ({ row }) => {
        const id = row.original.id.slice(0,3);
        const name: string = `${row.getValue("productName")}  #${id}`;
        return <>{name ? 
        <div className="truncate">{name}</div> 
        : 
        <div>No brand</div>}</>;
      },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Brand
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
    cell: ({ row }) => {
      const brand: string = row.getValue("brand");
      return <>{brand ? <div>{brand}</div> : <div>No brand</div>}</>;
    },
  },
  {
    accessorKey: "totalQuantity",
    header: "Quantity",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Quantity
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
  },
  {
    accessorKey: "prices",
    header: "Average Cost",
    cell: ({ row }) => {
      const prices: PriceProps[] = row.getValue("prices");
      const averagePrice = prices.reduce((acc, price) => acc + price.price, 0) / prices.length;
      
      // Check if the averagePrice is a valid number
      if (!isNaN(averagePrice)) {
        const formattedAveragePrice = averagePrice.toFixed(3); // Format to 3 decimal places
        return (
          <>{formattedAveragePrice ? <div>${formattedAveragePrice}</div> : <div>No price</div>}</>
        );
      } else {
        return <div>No price</div>;
      }
    },
  },
    {
      accessorKey: "date",
      header: "Last import date",
      cell: ({ row }) => {
        const prices: PriceProps[] = row.getValue("prices");
        const lastImportDate = prices.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }).map(price => (price.createdAt))[0];
        
        // Check if the date is valid before formatting
        if (lastImportDate) {
          const formattedDate = new Date(lastImportDate).toLocaleString();
          return (
            <>{formattedDate ? <div>{formattedDate}</div> : <div>No data</div>}</>
          );
        } else {
          return <div>No data</div>;
        }
      },
    },
];
