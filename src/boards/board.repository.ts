import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./boards.board-status.enum";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const board: Board = this.create({
            title: createBoardDto.title,
            description: createBoardDto.description,
            status: BoardStatus.PUBLIC
        });
        await this.save(board);
        return board;
    }
}