import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipe/board-status-validation.pipe";
import { Board } from "./board.entity";
import { BoardStatus } from "./boards.board-status.enum";

@Controller("boards")
export class BoardsController {
    constructor(private boardsService: BoardsService) {
    }

    @Get()
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Get("/:id")
    getBoardById(@Param("id", ParseIntPipe) id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete("/:id")
    deleteBoard(@Param("id", ParseIntPipe) id: number): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch("/:id/status")
    updateBoardStatus(@Param("id", ParseIntPipe) id: number,
                      @Body("status", BoardStatusValidationPipe) status: BoardStatus) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
