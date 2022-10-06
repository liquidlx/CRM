import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Companies } from '@prisma/client';
import { CompaniesService } from 'src/services/companies.service';
import { PostCompanyRequest } from 'src/entities/requests';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<Companies | null> {
    return this.companiesService.findOne({ id, deleted: false });
  }

  @Get()
  async findAll(): Promise<Companies[] | null> {
    return this.companiesService.findAll({
      deleted: false,
    });
  }

  @Post()
  async create(@Body() body: PostCompanyRequest): Promise<Companies> {
    const { data } = body;
    return this.companiesService.create(data);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Companies | null> {
    return this.companiesService.delete({ id });
  }

  @Patch()
  async update(@Body() body: PostCompanyRequest): Promise<Companies | null> {
    const { data } = body;
    return this.companiesService.update(data);
  }
}
