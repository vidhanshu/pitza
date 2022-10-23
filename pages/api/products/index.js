import Product from "../../../models/product";
import dbConnect from "../../../helpers/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find(
        {}
      ); /* find all the data in our database */
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ products: [] });
    }
  }

  if (method === "POST") {
    try {
      const { title, prices, description = "", img, size, toppins } = req.body;
      //creating a new product
      const product = await Product.create({
        title,
        description,
        prices,
        img,
        size,
        toppins,
      });
      //saving into the database
      product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ product: [] });
    }
  }
}
