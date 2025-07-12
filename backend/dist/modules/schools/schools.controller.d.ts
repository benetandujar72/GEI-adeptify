import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
export declare class SchoolsController {
    private readonly schoolsService;
    constructor(schoolsService: SchoolsService);
    create(createSchoolDto: CreateSchoolDto): Promise<import("./entities/school.entity").School>;
    findAll(): Promise<import("./entities/school.entity").School[]>;
    findOne(id: string): Promise<import("./entities/school.entity").School>;
    findByCode(code: string): Promise<import("./entities/school.entity").School>;
    update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<import("./entities/school.entity").School>;
    remove(id: string): Promise<void>;
}
