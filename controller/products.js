import productsModel from "../model/products.js";

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find().exec();
    const items = products.map((product) => ({
      ...product._doc,
      image: "https://summerkings.onrender.com/" + product.image,
    }));
    console.log("get all products")
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsModel.findById(productId);
    const item = {
      ...product._doc,
      image: "https://summerkings.onrender.com/" + product.image,
    };
    console.log(item)
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(item);
    console.log("Get product by ID successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Post a new product
const postProduct = async (req, res) => {
  try {
    const { title, price, description, category, rating } = req.body;

    const newProduct = new productsModel({
      title,
      price,
      description,
      category,
      image: req.file.path,
      rating,
    });
    const savedProduct = await newProduct.save();

    console.log("Product created successfully");
    console.log("Saved product:", savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};
const getProductsByCategory = async(req,res)=>{
  try {
    const products = await productsModel.find().exec();
    const items = products.map((product) => (product.category===req.body.category));
    const item = items.filter((product)=> ({...product, image: "https://summerkings.onrender.com/" + product.image}))
    console.log("get catagory")
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
export { getProducts, getProductById, postProduct,getProductsByCategory };
