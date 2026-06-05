import {
  JOB_TYPES,
  JOB_TYPES_LABELS,
  WORK_MODE,
  WORK_MODE_LABELS,
} from "@/constants/job";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
const FilterField = ({
  types,
  modes,
  handleUpdateSearchParams,
}: {
  types: string[];
  modes: string[];
  handleUpdateSearchParams: (key: string, value: string) => void;
}) => {
  return (
    <div className="flex">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between"
          >
            Select Job type <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)]">
          {JOB_TYPES.map((type) => (
            <div key={type} className="flex items-start gap-2 m-2">
              <Checkbox
                id={type}
                name={type}
                checked={types.includes(type)}
                onCheckedChange={() => {
                  handleUpdateSearchParams("type", type);
                }}
              />
              <Label htmlFor={type}>{JOB_TYPES_LABELS[type]}</Label>
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between"
          >
            Select Work mode <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)]">
          {WORK_MODE.map((mode) => (
            <div key={mode} className="flex items-start gap-2 m-2">
              <Checkbox
                id={mode}
                name={mode}
                checked={modes.includes(mode)}
                onCheckedChange={() => {
                  handleUpdateSearchParams("mode", mode);
                }}
              />
              <Label htmlFor={mode}>{WORK_MODE_LABELS[mode]}</Label>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterField;
<PopoverContent className="w-[var(--radix-popover-trigger-width)]"></PopoverContent>;
