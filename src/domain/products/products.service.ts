import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  public async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.save({
      ...createProductDto,
    });
    return this.productRepository.save(newProduct);
  }

  public async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  public findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  public update(id: string, updateProductDto: UpdateProductDto): Promise<any> {
    return this.productRepository.update(id, {
      ...updateProductDto,
    });
  }

  public remove(id: string): Promise<any> {
    return this.productRepository.softDelete(id);
  }
}
