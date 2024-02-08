import { useEffect } from "react";
import { useToast } from "./use-toast";

export function ErrorToast() {
  const { toast } = useToast();

  return useEffect(() => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  }, [toast]); // Make sure to include `toast` in the dependency array to avoid unnecessary re-renders

}
