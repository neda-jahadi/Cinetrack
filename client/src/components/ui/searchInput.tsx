import { SearchIcon, X } from 'lucide-react';
import Input from './Input';

type SearchInputProps = {
  value: string;
  handleChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
};

const SearchInput = ({
  value,
  handleChange,
  placeholder = 'Search...',
  'aria-label': ariaLabel = 'Search',
}: SearchInputProps) => {
  return (
    <div className="field-container flex items-center px-3">
      <SearchIcon
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="text"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        variant="ghost"
        onChange={(e) => handleChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={() => handleChange('')}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
