import client from "@/lib/db";
import { NextResponse } from "next/server";

const getParam = (req: Request) =>
  req.url.split("/")[req.url.split("/").length - 1];

export const GET = async (req: Request) => {
  const id = getParam(req);
  const response = await client.query(
    `SELECT products.id, products.name, description, price, date_added, category_id ,(categories.name) as category FROM products INNER JOIN categories on products.category_id = categories.id AND products.id = ${id}`
  );
  return NextResponse.json({ data: response.rows[0] });
};

export const PATCH = async (req: Request) => {
  const id = await getParam(req);
  const body = await req.json();
  const { name, description, category, price } = body;
  await client.query(
    `UPDATE products SET name='${name}', description='${description}', category_id=${category}, price=${price} WHERE id=${id}`
  );
  return NextResponse.json({message: 'Product updated!'});
};

export const DELETE = async (req: Request) => {
  const id = await getParam(req);
  await client.query(`DELETE FROM products WHERE id=${id}`)
  return NextResponse.json({message: 'Product Deleted!'})
}