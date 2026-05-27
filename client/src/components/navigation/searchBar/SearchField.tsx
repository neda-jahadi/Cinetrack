import Input from "@/components/ui/Input";
import { useDebounce } from "@/performance/hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const SearchField = ({
  title,
  handleUpdateSearchParams,
}: {
  title: string;
  handleUpdateSearchParams: (title: string) => void;
}) => {
  const [searchTitle, setSearchTitle] = useState(title);
  const debaouncedSearchTitle = useDebounce(searchTitle, 500);

  useEffect(() => {
    handleUpdateSearchParams(debaouncedSearchTitle);
  }, [debaouncedSearchTitle, handleUpdateSearchParams]);

  return (
    <div>
      <div className=" relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default" />
        <Input
          type="text"
          placeholder="Search by job title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="pl-12"
        />
      </div>
    </div>
  );
};

export default SearchField;
