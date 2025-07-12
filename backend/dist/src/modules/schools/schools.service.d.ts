import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
export declare class SchoolsService {
    private schoolRepository;
    constructor(schoolRepository: Repository<School>);
    create(createSchoolDto: CreateSchoolDto): Promise<School>;
    findAll(): Promise<School[]>;
    findOne(id: number): Promise<School>;
    findByCode(code: string): Promise<School>;
    update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<School>;
    remove(id: number): Promise<void>;
}
