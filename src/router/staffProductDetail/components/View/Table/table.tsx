// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/Table/table"
// import { productSelector } from "@/router/productDetails/slice/selector";
// import { ProductDetailsProps } from "@/router/productDetails/type";
// import { useSelector } from "react-redux";
  
  
  
//   export function StorageTable() {
//     const { product } = useSelector(productSelector);
//     const { details } = product;
//     const productDetails = details.map((detail: ProductDetailsProps) => 
//     {
//       return {
//         Image: detail.images[0].imageUrl,
//         paymentStatus: "Paid",
//         paymentMethod: "Credit Card",
//         totalAmount: detail.displayPrice,
//       }
//     }
//     );

//     return (
//       <Table>
//         <TableCaption>A list of your recent import.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Image</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead className="text-right">Amount</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {invoices.map((invoice) => (
//             <TableRow key={invoice.invoice}>
//               <TableCell className="font-medium">{invoice.invoice}</TableCell>
//               <TableCell>{invoice.paymentStatus}</TableCell>
//               <TableCell>{invoice.paymentMethod}</TableCell>
//               <TableCell className="text-right">{invoice.totalAmount}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={3}>Total</TableCell>
//             <TableCell className="text-right">$2,500.00</TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     )
//   }
  