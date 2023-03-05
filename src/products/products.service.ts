import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    addProduct(title: string, description: string, price:number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price)
        this.products.push(newProduct);
        return prodId;
    }
    getProducts() {
        return [...this.products];
    }
    findProduct(id:string): [Product, number] {
    const prodIndex = this.products.findIndex((prod) => prod.id == id);
    const product = this.products[prodIndex];
    if(!product){
        throw new NotFoundException("cannot find product");
    }
    return [product, prodIndex];
    }

    getSingleProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];
        return {...product};
    }
    updateProductDetails(prodID: string, title:string, description:string, price:number) {
        const [product, index] = this.findProduct(prodID);
        const updatedProduct = {...product}
        if(title){
            updatedProduct.title = title;
        }
        if(description) {
            updatedProduct.description = description;
        }
        if(price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }
    deleteProduct(prodId: string) {
        const [product, index] = this.findProduct(prodId);
        this.products.splice(index, 1);
    }
}
