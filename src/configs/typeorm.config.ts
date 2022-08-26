import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmModule: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'jonghyeon',
    password: 'postgre',
    database: 'board-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}