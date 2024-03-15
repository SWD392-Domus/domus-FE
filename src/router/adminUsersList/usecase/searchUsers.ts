import { searchUsersService } from "../service";

export const searchUsers = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await searchUsersService(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword,
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
