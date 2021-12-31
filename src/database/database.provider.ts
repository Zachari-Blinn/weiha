import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'test',
        entities: [__dirname + '/../domain/**/*.entity{.ts,.js}'],
        synchronize: true,
      }).catch(error => console.log(error)),
  },
];
