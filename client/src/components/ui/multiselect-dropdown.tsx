import { ChevronDown } from "lucide-react"; // Senior change: Single chevron is standard for dropdowns

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Clean checkbox components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  label: string;
  value: string;
};

type MultiSelectDropDownProps = {
  id: string;
  placeholder: string;
  options: Option[];
  selected: string[];
  onSelectChange?: (value: string[]) => void;
};

export function MultiSelectDropDown({
  id,
  placeholder,
  options,
  selected,
  onSelectChange,
}: MultiSelectDropDownProps) {
  const handleToggle = (optionValue: string) => {
    if (!onSelectChange) return;

    const nextSelected = selected.includes(optionValue)
      ? selected.filter((val) => val !== optionValue)
      : [...selected, optionValue];

    onSelectChange(nextSelected);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-labelledby={id}
          className="w-48 justify-between"
        >
          <span>
            {selected.length === 0
              ? "Select ..."
              : `${selected.length} selected`}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-48 p-3" align="start">
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`filter-${option.value}`}
                checked={selected.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
              />
              <label
                htmlFor={`filter-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none w-full"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
