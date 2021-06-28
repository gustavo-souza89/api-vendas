import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Produto já cadastrado');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });
    //salva as Informações!
    await productsRepository.save(product);

    return product;
  }
}
export default CreateProductService;