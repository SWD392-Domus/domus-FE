import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
interface Props {
  totalPages: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ProductsPagination: React.FC<Props> = ({
  totalPages,
  pageIndex,
  setPageIndex,
}) => {
  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const renderPageLinks = () => {
    const pageLinks: any[] = [];
    const maxVisiblePages = 2;
    let ellipsisAdded: boolean = false;

    for (let i: number = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= pageIndex - Math.floor(maxVisiblePages / 2) &&
          i <= pageIndex + Math.floor(maxVisiblePages / 2))
      ) {
        pageLinks.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              isActive={i === pageIndex}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );

        ellipsisAdded = false; // Reset ellipsis flag when a visible page link is added
      } else if (!ellipsisAdded) {
        pageLinks.push(<PaginationEllipsis key={i} />);
        ellipsisAdded = true; // Set ellipsis flag to true
      }
    }

    return pageLinks;
  };

  return (
    <div className="border-t-2 border-gray-200 pt-4">
      <Pagination className="flex">
        <PaginationContent className="shrink">
          <PaginationItem className="shrink">
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(Math.max(pageIndex - 1, 1))}
              className="max-sm:hidden"
            />
          </PaginationItem>

          {renderPageLinks()}

          <PaginationItem className="shrink max-w-[425px]:hidden">
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange(Math.min(pageIndex + 1, totalPages))
              }
              className="max-sm:hidden"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductsPagination;
