import Product from "../../../models/product";

export default async function handler(req, res) {
  const { method } = req;
  const { pid } = req.query;
  if (method === "GET") {
    try {
      const product = await Product.findById(pid);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ product: {} });
    }
  }
}
