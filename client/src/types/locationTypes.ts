export type Region = {
  id: number;
  code: string;
  name: string;
};

export type Municipality = {
  id: number;
  code: string;
  name: string;
  regionId: number;
};

export type MunicipalityApiResponse = Municipality & {
  region: Region;
};
