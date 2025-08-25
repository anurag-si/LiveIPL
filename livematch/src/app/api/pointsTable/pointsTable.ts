import type { NextApiRequest, NextApiResponse } from "next";
import { pointsTable, type TeamStanding } from "@/data/pointsTableData2025";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<TeamStanding[]>
) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json(pointsTable);
}
