import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

// PUT (update) a product
export async function PUT(req, {params}) {
    await connectToDatabase();
    const body = await req.json();
    const  {id } = params;
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    
    return Response.json({ message: "Product updated successfully", product: updatedProduct });
  }
  
  // DELETE a product
  export async function DELETE(req, {params}) {
    await connectToDatabase();
    const  {id} = params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    
    return Response.json({ message: "Product deleted successfully" });
  }
  