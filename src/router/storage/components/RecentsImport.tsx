import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useEffect, useState } from "react";
import { getRecentImport } from "../usecase";
import { toast } from "@/components/ui/Toast/use-toast";
export function RecentImport() {
  const [importData, setImportData] = useState([]);
  const fetchImportData = async () => {
    try {
      const res = await getRecentImport();
      const respone = res.data;
      if (respone.isSuccess) {
        setImportData(respone.data.items);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to fetch recent import data.",
      });
    }
  };
  useEffect(() => {
    fetchImportData();
  }, []);
  return (
    <>
      {importData.map((item: any) => (
        <div className="space-y-8 pb-3">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">TABLE IKEA</p>
              <p className="text-sm text-muted-foreground">Variants 01</p>
            </div>
            <div className="ml-auto font-medium space-y-1">
              <p className="text-sm font-medium leading-none">
                <span className="text-emerald-600">{item.quantity}</span> products with{" "}
                <span className="text-emerald-600">${item.price}</span> each
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
