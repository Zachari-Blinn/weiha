import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './domain/users/users.module';
import { AuthModule } from './domain/auth/auth.module';
import { ProductsModule } from './domain/products/products.module';
import { OrdersModule } from './domain/orders/orders.module';
import { OrderDetailsModule } from './domain/order-details/order-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    OrderDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
