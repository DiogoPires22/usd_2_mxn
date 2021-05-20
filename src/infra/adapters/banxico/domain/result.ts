export type BanxicoResult = {
  bmx: Bmx;
};

export type Bmx = {
  series: Array<Serie>;
};

export type Serie = {
  obs: Obs;
};

export type Obs = {
  dato: number;
  fecha: string;
};
