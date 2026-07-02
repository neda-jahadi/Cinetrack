import { SearchIcon } from "lucide-react";
import Input from "./Input";

type SearchInputProps = {
  searchValue: string;
  handleSearch: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

const SearchInput = ({
  searchValue,
  handleSearch,
  placeholder = "Search...",
  ariaLabel = "Search",
}: SearchInputProps) => {
  return (
    <div className="flex items-center rounded px-3 border border-input w-full focus-within:ring-2 focus-within:ring-brand focus-within:border-brand">
      <SearchIcon
        className="mr-2 h-4 w-4 shrink-0 opacity-50"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={searchValue}
        variant="ghost"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
