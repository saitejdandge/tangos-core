import {IsString} from 'class-validator';

class CreateBookDto {
    @IsString()
    public author: string="";
    
    @IsString()
    public content: string="";

    @IsString()
    public title: string="";
}

export default CreateBookDto;
