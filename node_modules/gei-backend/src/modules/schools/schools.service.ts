import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = this.schoolRepository.create(createSchoolDto);
    return await this.schoolRepository.save(school);
  }

  async findAll(): Promise<School[]> {
    return await this.schoolRepository.find();
  }

  async findOne(id: number): Promise<School> {
    return await this.schoolRepository.findOne({ where: { id } });
  }

  async findByCode(code: string): Promise<School> {
    return await this.schoolRepository.findOne({ where: { code } });
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    await this.schoolRepository.update(id, updateSchoolDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.schoolRepository.delete(id);
  }
} 