import { NextResponse } from "next/server";
import client from "@/lib/db";

export const GET = async (req: Request) => {
  const response = await client.query(
    `SELECT products.id, products.name, description, price, date_added, (categories.name) as category FROM products INNER JOIN categories on products.category_id = categories.id`
  );
  return NextResponse.json({ data: response.rows });
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const {name, description, category, price} = body;
  try{
    await client.query(
      `INSERT INTO products(name,description, price, date_added,category_id) VALUES('${name}', '${description}', ${+price}, CURRENT_TIMESTAMP, ${+category})`,
      (err: any, res: any) => {
        if (err) {
          console.log(err);
        }else {
          console.log(res.rows);
        }
      }
    );
    return NextResponse.json({message: 'Product added to the list'});
  }catch(err:any){
    return NextResponse.json({message: err.message});
  }
}