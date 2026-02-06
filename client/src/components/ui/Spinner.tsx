import type { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

type SpinnerProps = {
  loading: boolean;
};

const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
