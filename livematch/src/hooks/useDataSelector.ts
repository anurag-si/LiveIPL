import { pointsTableData2024 } from "../data/pointsTableData2024";
import { pointsTableData2023 } from "../data/pointsTableData2023";
import { pointsTableData2025 } from "../data/pointsTableData2025";
import { TeamStanding } from "../data/pointsTableData2025";

export const getPointsTableData = (season: string): TeamStanding[] => {
  switch (season) {
    case "2025":
      return pointsTableData2025;
    case "2024":
      return pointsTableData2024;
    case "2023":
      return pointsTableData2023;
    default:
      return pointsTableData2025; // Default to 2025
  }
};

export const availableSeasons = [
  { value: "2025", label: "2025" }, 
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];
