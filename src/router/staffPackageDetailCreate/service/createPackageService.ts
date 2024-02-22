import { packageStaffApi } from "@/utils/api/PackageApi";

export const createPackageService = async (formData: any) => {
    return packageStaffApi.createPackage(formData);
};
