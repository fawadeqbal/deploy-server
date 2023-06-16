import productsModel from "../model/products.js";

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find().exec();
    
    res.status(200).json(products);
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
    

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
    console.log("Get product by ID successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Post a new product
const postProduct = async (req, res) => {
  try {
    const { id, title, price, description, category, rating, image } = req.body;

    const newProduct = new productsModel({
      id,
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

    //res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};


export { getProducts, getProductById, postProduct };