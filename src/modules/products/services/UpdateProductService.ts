import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    //Validação se o Código do produto existe.
    if (!product) {
      throw new AppError('Produto Não Localizado!');
    }
    // const productExists = await productsRepository.findByName(name);
    // //Valida se não existe nenhum produto com o mesmo nome.
    // if (productExists) {
    //   throw new AppError('Produto já cadastrado');
    // }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}
export default UpdateProductService;
