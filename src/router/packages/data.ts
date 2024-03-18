export const packages = Array.from({ length: 9 }, (_, index) => ({
  src: `https://govi.vn/wp-content/uploads/2022/01/1-PA-201A.jpg`,
  name: `Package ${index + 1}`,
  description: `This is package This is produnPackage abdcjfdiajfPackage abdcjfdiajfPackage abdcjfdiajfPackage abdcjfdiajfPackage abdcjfdiajf${
    index + 1
  }`,
  price: index + 1,
}));

export const packageList = [
  {
    id: "1",
    name: "Elegant Velvet Sofa",
    description:
      "Bring luxury and comfort into your living space with this elegant velvet sofa. Featuring a timeless design and plush cushions, it's the perfect addition to any modern or classic interior.",
    price: 899000,
    src: "https://www.ikea.com/ca/en/images/packages/sektion-wall-cabinet-with-2-doors-white-tistorp-brown-walnut-effect__1200985_pe905310_s5.jpg?f=xxs",
  },
  {
    id: "2",
    name: "Sleek Mid-Century Coffee Table",
    description:
      "Upgrade your living room with this sleek mid-century coffee table. Crafted from durable walnut wood, its minimalist design adds a touch of sophistication to your home.",
    price: 249000,
    src: "https://jysk.vn/Data/Sites/1/Package/8362/3602023.jpg",
  },
  {
    id: "3",
    name: "Contemporary Dining Set",
    description:
      "Host stylish dinners with this contemporary dining set. The table features a glass top and sturdy metal legs, while the chairs boast ergonomic design and faux leather upholstery for maximum comfort.",
    price: 599000,
    src: "https://www.urbanconcepts.ph/wp/wp-content/uploads/2023/04/diego-1.png",
  },
  {
    id: "4",
    name: "Cozy Velvet Accent Chair",
    description:
      "Create a cozy reading nook with this velvet accent chair. Its deep seat and high back provide exceptional comfort, and the vibrant color options add a pop of personality to your space.",
    price: 349000,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCypK-8lxaOsHEHfOxvL9aEPkIXrnJx5N7294KDR7oigG4lcnulcLwIP39OHgi6oKUn5M&usqp=CAU",
  },
  {
    id: "5",
    name: "Modern Floating Wall Shelves",
    description:
      "Maximize your storage and display space with these modern floating wall shelves. Crafted from sturdy wood, these shelves are perfect for showcasing books, decor, and personal items.",
    price: 39000,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNO5_4Ot9j3DRX82O204Frecb98UTdPchuMkxUnDkN5T_DB6PvYrnoC8MHqB_Ldm3QbA&usqp=CAU",
  },
  {
    id: "6",
    name: "Chic Leather Recliner",
    description:
      "Indulge in relaxation with this chic leather recliner. Featuring premium leather upholstery and a reclining function, this chair combines style and comfort for the ultimate lounging experience.",
    price: 499000,
    src: "https://cdn11.bigcommerce.com/s-y52856za8c/images/stencil/1200x1200/packages/273/4255/AL_Web_ReinventedRecliner_Front_Neeson__26055.1689065486.jpg?c=2",
  },
  {
    id: "7",
    name: "Rustic Farmhouse Bed Frame",
    description:
      "Transform your bedroom into a cozy retreat with this rustic farmhouse bed frame. Crafted from reclaimed wood, this bed exudes charm and character, making it the focal point of your room.",
    price: 799000,
    src: "https://jysk.vn/Data/Sites/1/Package/10651/720895186-giuong-alnor--xam-dam-jysk-1.jpg",
  },
  {
    id: "8",
    name: "Minimalist Desk and Chair Set",
    description:
      "Create a stylish and packageive workspace with this minimalist desk and chair set. The clean lines and functional design make it ideal for both home offices and study areas.",
    price: 349000,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8lcIDTilTtgYjlmyBvURZPRf6VO-wpBDRQ&usqp=CAU",
  },
  {
    id: "9",
    name: "Modern Pendant Light Fixture",
    description:
      "Illuminate your space with modern flair using this pendant light fixture. Its sleek design and adjustable height make it a perfect addition to dining areas, kitchens, or entryways.",
    price: 129000,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2qh-Kug_U0wsbvxGR7WOkIzvBDd6uXwaIA&usqp=CAU",
  },
  {
    id: "10",
    name: "Versatile Bookcase with Storage",
    description:
      "Organize your books and display your favorite decor with this versatile bookcase. Featuring a combination of open shelves and closed storage, it adds both functionality and style to any room.",
    price: 179000,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNLDV_cqarNJ42m0hEf4ryTUo_LajGUWxqIw&usqp=CAU",
  },
  {
    id: "11",
    name: "Luxurious Velvet Bedding Set",
    description:
      "Elevate your bedroom with this luxurious velvet bedding set. The soft and sumptuous material provides a cozy haven for rest, while the elegant design adds a touch of opulence to your space.",
    price: 159000,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Bdjsjgfx_ZfoaLAS8cxbBGVkeEuurFkoQQ&usqp=CAU",
  },
  {
    id: "12",
    name: "Modern Geometric Area Rug",
    description:
      "Define your space with a modern touch using this geometric area rug. The high-quality material and contemporary design make it a stylish and comfortable addition to any room.",
    price: 79000,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAuP30v_Zn5YL5G0RbmclnrrL3jSvZ-h8v8A&usqp=CAU",
  },
  // Add more packages here with unique IDs
];

export const packageDetail = {
  name: "Luxurious Velvet Bedding Set",
  description:
    "Elevate your bedroom with this luxurious velvet bedding set. The soft and sumptuous material provides a cozy haven for rest, while the elegant design adds a touch of opulence to your space.",
  price: 159000,
  src: [
    "https://www.ikea.com/ca/en/images/packages/sektion-wall-cabinet-with-2-doors-white-tistorp-brown-walnut-effect__1200985_pe905310_s5.jpg?f=xxs",
    "https://www.ikea.com/ca/en/images/packages/enhet-base-cabinet-with-3-drawers-white-white-frame__1048155_pe843608_s5.jpg?f=xxs",
    "https://www.ikea.com/ca/en/images/packages/knoxhult-base-cabinet-with-doors-and-drawer-white__0630750_pe694878_s5.jpg?f=xxs",
    "https://www.ikea.com/ca/en/images/packages/sektion-base-cabinet-for-sink-2-doors-white-tistorp-brown-walnut-effect__1200962_pe905261_s5.jpg?f=xxs",
    "https://www.ikea.com/ca/en/images/packages/malm-bed-frame-high-black-brown-luroey__0638608_pe699032_s5.jpg?f=xxs",
    "https://www.ikea.com/ca/en/images/packages/neiden-bed-frame-pine__0749131_pe745500_s5.jpg?f=xxs",
    "https://www.ikea.com/ca/en/images/packages/kleppstad-bed-frame-white-vissle-beige__1035340_pe840527_s5.jpg?f=xxs",
  ],
};
