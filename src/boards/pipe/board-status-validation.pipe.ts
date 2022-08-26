import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform{

    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE,

    ]
    transform(value: any, metadata: ArgumentMetadata): any {

        console.log('metadata', metadata);
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) throw new BadRequestException(`${value} isn't in the status options`);
        return value;
    }

    private isStatusValid(value: any) {
        const index = this.StatusOptions.indexOf(value);
        return index !== -1
    }
}