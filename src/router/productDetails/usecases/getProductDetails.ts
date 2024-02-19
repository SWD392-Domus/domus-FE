import { getProductDetailsService } from "../service/getProductDetailsService";
interface Attribute {
  name: string;
  value: string;
}

interface Image {
  imageUrl: string;
}
interface Detail {
  attributes: Attribute[];
  images: Image[];
}

export const getProductDetails = async (id: string) => {
  const response = await getProductDetailsService(id);

  if (response.status === 200) {
    const details = response.data.data.details;
    const colors: string[] = [];
    const sizes: string[] = [];
    const images: string[] = [];
    const material: string[] = [];

    details.forEach((detail: Detail) => {
      detail.attributes.forEach((attribute: Attribute) => {
        if (attribute.name === 'Color') {
          colors.push(attribute.value);
        }
        if (attribute.name === 'Size') {
          sizes.push(attribute.value);
        }
        if (attribute.name === 'Material') {
          material.push(attribute.value);
        }
      });
      detail.images.forEach((image: Image) => {
        images.push(image.imageUrl);
      });
    });

    const uniqueColors = [...new Set(colors)];
    const uniqueSizes = [...new Set(sizes)];
    const uniqueMaterial = [...new Set(material)];
    response.data.data.colors = uniqueColors;
    response.data.data.sizes = uniqueSizes;
    response.data.data.images = images;
    response.data.data.material = uniqueMaterial;
    return response.data.data;
    
  } else {
    return {
      status: 400,
      data: [],
    };
  }
};
