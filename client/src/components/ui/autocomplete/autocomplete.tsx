import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export type Option = {
  value: string;
  label: string;
};

type AutocompleteProps = {
  options: Option[];
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
};

export function Autocomplete({
  options,
  value,
  placeholder = 'Search...',
  className,
  onChange,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    setInputValue(selectedOption ? selectedOption.label : '');
  }, [value, options]);

  const filteredOptions = React.useMemo(() => {
    const search = inputValue.trim().toLowerCase();
    if (!search) return [];

    return options.filter((option) =>
      option.label.toLowerCase().includes(search),
    );
  }, [options, inputValue]);

  const shouldShowList = isOpen && inputValue.trim().length > 0;

  const handleSelectItem = (option: Option) => {
    setInputValue(option.label);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={cn('relative w-full', className)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <Command
        className={cn(
          'rounded border overflow-visible',
          'focus-within:ring-brand focus-within:border-brand',
        )}
        shouldFilter={false}
      >
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={(val) => {
            setInputValue(val);
            setIsOpen(true);
            if (val === '') onChange(''); // Instantly reset filter state if they clear field
          }}
          onFocus={() => setIsOpen(inputValue.trim().length > 0)}
        />
        <CommandList
          className={cn(
            'absolute top-full left-0 z-50 mt-1 w-full rounded border bg-popover shadow-md',
            shouldShowList ? 'block' : 'hidden',
          )}
        >
          {filteredOptions.length === 0 ? (
            <CommandEmpty>Inga resultat funning.</CommandEmpty>
          ) : (
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value} // Command expects unique identifier here
                  onSelect={() => handleSelectItem(option)}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
}
