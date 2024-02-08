// import React from 'react'
// import { ProductProps } from '@/router/products/type';
// import {
//     ResizableHandle,
//     ResizablePanel,
//     ResizablePanelGroup,
//   } from "@/components/ui/Resizable"


// const ProductCard: React.FC<ProductProps> = ({
//     product
// }) => {
//   return (
//     <ResizablePanelGroup
//       direction="horizontal"
//       className="max-w-md rounded-lg"
//     >
//       <ResizablePanel defaultSize={40}>
//         <div className="flex h-[200px] items-center justify-center p-6">
//             <img src={product.src} alt="" />
//         </div>
//       </ResizablePanel>
//       <ResizableHandle />
//       <ResizablePanel defaultSize={40}>
//         <ResizablePanelGroup direction="vertical">
//           <ResizablePanel defaultSize={35}>
//             <div className="flex h-full items-center justify-center p-6">
//               <span className="font-semibold">{product.name}</span>
//             </div>
//           </ResizablePanel>
//           <ResizablePanel defaultSize={45}>
//             <div className="flex h-full items-center justify-center p-6">
//               <span className="font-semibold truncate">{product.description}</span>
//             </div>
//           </ResizablePanel>
//           <ResizablePanel defaultSize={20}>
//             <div className="flex h-full items-center justify-center p-6">
//               <span className="font-semibold">{product.price}</span>
//             </div>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </ResizablePanel>
//       <ResizablePanel defaultSize={20}>
//         <div className='flex items-center justify-center p-6'>

//         </div>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   )
// }

// export default ProductCard