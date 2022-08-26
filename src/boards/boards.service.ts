import { Injectable, NotFoundException } from "@nestjs/common";
import { v1 as uuid } from "uuid";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./boards.board-status.enum";
import { Board } from "./board.entity";
import { BoardRepository } from "./board.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BoardsService {


    constructor(@InjectRepository(BoardRepository) private boardRepository: BoardRepository) {
    }

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneById(id);
        if (!found) throw new NotFoundException(`Can't find Board with id ${id})`);
        else return found;
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        console.log("result", result);
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const found = await this.boardRepository.findOneById(id);
        found.status = status;
        await this.boardRepository.save(found);
        return found;
    }
}
