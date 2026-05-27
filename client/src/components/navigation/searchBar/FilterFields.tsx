import {
  JOB_TYPES,
  JOB_TYPES_LABELS,
  WORK_MODE,
  WORK_MODE_LABELS,
} from "@/constants/job";

const FilterFields = ({
  type,
  mode,
  handleUpdateSearchParams,
}: {
  type: string;
  mode: string;
  handleUpdateSearchParams: (key: string, value: string) => void;
}) => {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4 mt-6">
      <select
        value={type}
        onChange={(e) => handleUpdateSearchParams("type", e.target.value)}
        className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <option value="">Select job type</option>
        {JOB_TYPES.map((type) => (
          <option key={type} value={type}>
            {JOB_TYPES_LABELS[type]}
          </option>
        ))}
      </select>
      <select
        value={mode}
        onChange={(e) => handleUpdateSearchParams("mode", e.target.value)}
        className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <option value="">Select work mode</option>
        {WORK_MODE.map((mode) => (
          <option key={mode} value={mode}>
            {WORK_MODE_LABELS[mode]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterFields;
