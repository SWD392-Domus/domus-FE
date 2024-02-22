import { createPackageService } from "../service";
// import { PackageProps } from "../types";
export const createPackage = async (formData: any) => {
    const response = await createPackageService(formData);

    return response.status;
};
