import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  addNewProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.addProduct(prodTitle, prodDesc, prodPrice);
  }
  @Get('all')
  getAllProducts() {
    return this.productsService.getProducts();
  }
  @Get(":id")
  getSingleProduct(@Param("id") prodID: string) {
       return this.productsService.getSingleProduct(prodID);
  }
  @Patch(":id")
  updateProductDetails(@Param("id") prodId: string, @Body("title") prodTitle:string, @Body("description") prodDesc: string, @Body("price") prodPrice: number) {
        this.productsService.updateProductDetails(prodId, prodTitle, prodDesc, prodPrice);
        return null;
  }
  @Delete(":id")
  removeProduct(@Param("id") prodId:string) {
    this.productsService.deleteProduct(prodId);
    return null;

  }
}
