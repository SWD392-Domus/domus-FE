export interface PackageProps {
  id: string;
  name: string;
  discount: string;
  details: PackageDetails[];
}

export interface PackageDetails {
  images: {
    imageUrl: string;
  }[];
  attributes: {
    name: string;
    value: string;
  }[];
  displayPrice: number;
}
