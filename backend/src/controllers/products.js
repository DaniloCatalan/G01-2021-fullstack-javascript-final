const Models = require('../models');
const Product = Models.Product;

module.exports = {
  async index(request, response) {
    let statusCode = 200

    try {
      const products = await Product.findAll()
  
      console.log(`GET with status code ${statusCode} in /api/products endpoint`)
  
      return response
        .status(statusCode)
        .json(products)
  
    } catch (error) {
      const { message } = error
      statusCode = 500
  
      console.error(`GET with status code ${statusCode} in /api/products endpoint. Error: ${message}`)
      
      return response
        .status(statusCode)
        .json({ message })
    }
  },
  async removeProduct(request, response) {
    let statusCode = 200
    const { params } = request

    try {
      const product = await Product.findOne({
        where: {
          id: params.id
        }
      })

      if (product === null) {
        return response.status(404).json( { message: `Product with id ${params.id} not found` })
      }

      await Product.destroy({
        where: {
          id: params.id
        }
      })

      console.log(`DELETE with status code ${statusCode} in /api/products/${params.id} endpoint`)

      response
        .status(statusCode)
        .send()
      
    } catch (error) {
      const { message } = error
      statusCode = 500

      console.error(`DELETE with status code ${statusCode} in /api/products/${params.id} endpoint. Error: ${message}`)

      return response
        .status(statusCode)
        .json({ message })
    }
  }
}