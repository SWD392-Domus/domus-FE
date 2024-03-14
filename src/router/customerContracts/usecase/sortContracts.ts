import { sortContractsService } from "../service";

export const sortContracts = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await sortContractsService(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
  if (response.status === 200) {
    const contractsData = response?.data?.data;
    const contractsItems = contractsData?.items?.map(
      (item: {
        id: string;
        details: { images: { imageUrl: string }[] }[];
        category: { name: string };
        contractName: string;
        brand: string;
        description: string;
        totalQuantity: number;
      }) => ({
        id: item.id,
        image: item.details[0]?.images[0]?.imageUrl,
        category: item.category?.name,
        contractName: item.contractName,
        brand: item.brand,
        description: item.description,
        totalQuantity: item.totalQuantity,
      })
    );
    const lastPage = contractsData?.lastPage;
    const total = contractsData?.total;

    return {
      contractsItems,
      lastPage,
      total,
    };
  }
};
