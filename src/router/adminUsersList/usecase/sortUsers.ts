import { sortUsersService } from "../service";

export const sortUsers = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await sortUsersService(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
  if (response.status === 200) {
    const usersData = response?.data?.data;
    const usersItems = usersData?.items?.map(
      (item: {
        id: string;
        details: { images: { imageUrl: string }[] }[];
        category: { name: string };
        userName: string;
        brand: string;
        description: string;
        totalQuantity: number;
      }) => ({
        id: item.id,
        image: item.details[0]?.images[0]?.imageUrl,
        category: item.category?.name,
        userName: item.userName,
        brand: item.brand,
        description: item.description,
        totalQuantity: item.totalQuantity,
      })
    );
    const lastPage = usersData?.lastPage;
    const total = usersData?.total;

    return {
      usersItems,
      lastPage,
      total,
    };
  }
};
