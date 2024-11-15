import { fetchServer } from "@/api/fetch.server";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const queryString = request.nextUrl.searchParams.toString();
  const endpoint = `product/?${queryString}`;
  return fetchServer(endpoint);
};
