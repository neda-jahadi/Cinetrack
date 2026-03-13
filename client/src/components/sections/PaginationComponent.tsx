import type { Pagination } from "../../types";
import Button from "../ui/Button";

type PaginationProps = {
  pagination?: Pagination;
  handleChangePage: (changePage: number) => void;
};

const PaginationComponent = ({
  pagination,
  handleChangePage,
}: PaginationProps) => {
  const currentPage = pagination?.currentPage ?? 1;

  return (
    <div>
      <Button
        disabled={!pagination?.hasPrevPage}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        Previous
      </Button>
      <Button className="ml-2 mr-2">{pagination?.currentPage}</Button>
      <Button
        disabled={!pagination?.hasNextPage}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationComponent;
