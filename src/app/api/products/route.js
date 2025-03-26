import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

// GET all products
export async function GET() {
  await connectToDatabase();
  const products = await Product.find({});
  return Response.json(products);
}

// POST (create) a new product
export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();
  const product = new Product(body);
  await product.save();
  return Response.json({ message: "Product added successfully", product });
}

