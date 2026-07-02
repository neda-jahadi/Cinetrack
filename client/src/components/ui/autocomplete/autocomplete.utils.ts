import type { Option } from './autocomplete';

export const filterOptions = (options: Option[], query: string): Option[] => {
  const trimmedQuery = query.trim().toLowerCase();

  if (trimmedQuery === '') {
    return [];
  } else {
    return options.filter((option) =>
      option.label.toLowerCase().includes(trimmedQuery),
    );
  }
};

export const selectOptionByValue = (
  options: Option[],
  value: string,
): Option | undefined => {
  return options.find((option) => option.value === value);
};
