import { Module } from "@nestjs/common";
import { BoardsModule } from "./boards/boards.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule,
        BoardsModule
    ]
})
export class AppModule {
}
