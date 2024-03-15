import { profile } from "console";
import { getUsersPagingService } from "../service";

export const getUsersPaging = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await getUsersPagingService(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );

  if (response.status === 200) {
    const usersData = response?.data?.data;
    const usersItems = usersData?.items?.map(
      (item: {
        id: string;
        userName: string;
        fullName: string;
        gender: string;
        email: string;
        phoneNumber: string;
        profileImage: string;
        address: string;
      }) => ({
        id: item?.id,
        userName: item?.userName,
        fullName: {
          fullName: item?.fullName,
          profileImage: item?.profileImage,
        },
        gender: item?.gender,
        email: item?.email,
        phoneNumber: item?.phoneNumber,
        address: item?.address,
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
