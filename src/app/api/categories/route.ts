import client from "@/lib/db"
import { NextResponse } from "next/server";

export const GET = async(req: Request) => {
  const response = await client.query(`SELECT * FROM categories`);
  return NextResponse.json({data: response.rows});
}