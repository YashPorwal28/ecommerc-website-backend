//   async (req, res) => {
//     const { name, brand, desc, price, image } = req.body;
//     try {
//       if (image) {
//         const uploadedResponse = await cloudinary.uploader.upload(image, {
//           upload_preset: "online-shop",
//         });
//         if (uploadedResponse) {
//           const product = new Product({
//             name,
//             brand,
//             desc,
//             price,
//             image: uploadedResponse,
//           });
//           const savedProduct = await product.save();
//           res.status(200).send(savedProduct);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send(error);
//     }
//   }


exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category, attributes } = req.body;
  try {
    let newCategory = category.toLowerCase();
    const product = new Product({
      name,
      description,
      price,
      quantity,
      newCategory,
      attributes,
    });
    const savedProduct = await product.save();
    res.status(200).json({ savedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async(req,res)=>{
    try {
        const prodId = req.params.id;
        console.log(prodId);
        const deleteProduct = await Product.findByIdAndDelete(prodId);
        if (!deleteProduct) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product has been deleted" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}


exports.updateProduct = async(req,res)=>{
    const prodId = req.params.id;
    // get the product
    try {
      const findProduct = await Product.findById(prodId);

      if (!findProduct) {
        return res.status(404).json({ error: "Product not fonud" });
      }

      if (findProduct.seller !== req.seller.id) {
        return res
          .status(403)
          .json({
            error:
              "Unauthorized: Seller does not have permission to update this product",
          });
      }

      findProduct.name = req.body.name || findProduct.name;
      findProduct.price = req.body.price || findProduct.price;
      findProduct.description = req.body.description || findProduct.description;
      // Save the updated product
      const updatedProduct = await findProduct.save();
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}


exports.getAllProducts = async (req ,res )=>{
    try {
        const products = await Product.find().populate("images");
    
        // return the products as a josn response
    
        // console.log(req)
        // console.log(jwt.decode(req.cookies.token))
    
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }

}


exports.getProductWithCategoryOrName = async (req,res)=>{
    try {
        // Extract query parameters from the request
        const { category, name } = req.query;
        // console.log(req.query)
        // console.log(name)
        // console.log(category)
        // // Create a filter object based on the provided parameters
        const filter = {};
        if (category) {
          filter.category = category;
        }
    
        console.log("hi", filter);
    
        if (name) {
          // Use a case-insensitive regular expression for a partial match on the name
          filter.name = { $regex: new RegExp(name, "i") };
        }
    
        // // Fetch products from the database based on the filter
        const products = await Product.find(filter);
    
        // // Return the filtered products as a JSON response
        res.status(200).json(products);
      } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}


exports.getProductById = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
      } catch (error) {
        res.status(500).send(error);
      }

}