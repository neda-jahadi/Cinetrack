import SearchInput from "@/components/ui/searchInput";
import { useDebounce } from "@/performance/hooks/useDebounce";
import { useEffect, useState } from "react";

type SearchFieldProps = {
  title: string | "";
  handleUpdateSearchParams: (value: string) => void;
};

const SearchJobTitle = ({
  title,
  handleUpdateSearchParams,
}: SearchFieldProps) => {
  const [searchTitle, setSearchTitle] = useState(title);
  const debaouncedSearchTitle = useDebounce(searchTitle, 500);

  useEffect(() => {
    handleUpdateSearchParams(debaouncedSearchTitle);
  }, [debaouncedSearchTitle]);

  return (
    <SearchInput
      searchValue={searchTitle}
      handleSearch={setSearchTitle}
      placeholder="Search by job title..."
      ariaLabel="Search job titles"
    />
  );
};

export default SearchJobTitle;
