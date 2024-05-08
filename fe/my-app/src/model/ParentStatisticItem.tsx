import { StatisticItem } from "./StatisticItem";

export type ParentStatisticItem = {
    proName: string;
    proUnit: string;
    proPrice: number;
    proId: number;
    statisticItems: StatisticItem[];
  };