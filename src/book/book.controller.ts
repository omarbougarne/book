import { Body ,Controller, Get, Param, Post, Put, Delete, NotFoundException} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/schemas/user.schema';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async getAllBooks(): Promise<Book[]>{
        return this.bookService.findAll();
    }

    @Post()
    async creatBook(
        @Body()
        book
    ): Promise<Book>{
        return this.bookService.create(book)
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id: string
    ): Promise<Book>{
        const book = this.bookService.findById(id);

        if(!book)  {throw new NotFoundException('book not found')}
        return book

    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: UpdateBookDto,
    ): Promise<Book>{
        return this.bookService.updateById(id, book)
    }

    @Delete(':id')
    @Roles(Role.Admin)
    async deleteBook(
        @Param('id')
        id:string,
    ): Promise<Book>{
    return this.bookService.deleteById(id)
    }
}
