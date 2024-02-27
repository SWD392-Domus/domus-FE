import { getPackageSearchService, getPackageService } from "../service";

export const getPackages = async (pageSize: number, pageIndex: number) => {
  const response = await getPackageService(pageSize, pageIndex);
  if (response.status === 200) {
    return response.data;
  } else {
    return {
      status: 400,
      data: [],
    };
  }
};

export const searchPackages = async (
  pageSize: number,
  pageIndex: number,
  searchValue: string,
  searchField: string
) => {
  try {
    // Call the appropriate API function to perform the search
    const response = await getPackageSearchService(
      pageSize,
      pageIndex,
      searchValue,
      searchField
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        status: 400,
        data: response.data,
      };
    }
  } catch (error) {
    console.error(error);
    throw error; // Optionally, re-throw the error to handle it elsewhere
  }
};
