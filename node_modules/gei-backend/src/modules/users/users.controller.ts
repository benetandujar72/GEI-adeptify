import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('Usuaris')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nou usuari' })
  @ApiResponse({ status: 201, description: 'Usuari creat amb èxit' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async create(@Body() createUserDto: CreateUserDto, @Req() req) {
    const currentUser = req.user;
    return this.usersService.create(createUserDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir tots els usuaris de l\'escola' })
  @ApiResponse({ status: 200, description: 'Llista d\'usuaris obtinguda' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async findAll(@Req() req, @Query('schoolId') schoolId: string) {
    const currentUser = req.user;
    return this.usersService.findAll(schoolId || currentUser.schoolId, currentUser);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir usuari per ID' })
  @ApiResponse({ status: 200, description: 'Usuari obtingut' })
  @ApiResponse({ status: 404, description: 'Usuari no trobat' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async findOne(@Param('id') id: string, @Req() req) {
    const currentUser = req.user;
    return this.usersService.findOne(id, currentUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualitzar usuari' })
  @ApiResponse({ status: 200, description: 'Usuari actualitzat' })
  @ApiResponse({ status: 404, description: 'Usuari no trobat' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const currentUser = req.user;
    return this.usersService.update(id, updateUserDto, currentUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuari' })
  @ApiResponse({ status: 200, description: 'Usuari eliminat' })
  @ApiResponse({ status: 404, description: 'Usuari no trobat' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async remove(@Param('id') id: string, @Req() req) {
    const currentUser = req.user;
    return this.usersService.remove(id, currentUser);
  }

  @Post(':id/activate')
  @ApiOperation({ summary: 'Activar usuari' })
  @ApiResponse({ status: 200, description: 'Usuari activat' })
  @ApiResponse({ status: 404, description: 'Usuari no trobat' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async activateUser(@Param('id') id: string, @Req() req) {
    const currentUser = req.user;
    return this.usersService.activateUser(id, currentUser);
  }

  @Post(':id/deactivate')
  @ApiOperation({ summary: 'Desactivar usuari' })
  @ApiResponse({ status: 200, description: 'Usuari desactivat' })
  @ApiResponse({ status: 404, description: 'Usuari no trobat' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async deactivateUser(@Param('id') id: string, @Req() req) {
    const currentUser = req.user;
    return this.usersService.deactivateUser(id, currentUser);
  }

  // Endpoints de Gamificació
  @Post(':id/points')
  @ApiOperation({ summary: 'Afegir punts a un usuari' })
  @ApiResponse({ status: 200, description: 'Punts afegits' })
  @ApiResponse({ status: 404, description: 'Usuari no trobat' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async addPoints(
    @Param('id') id: string,
    @Body() body: { points: number },
    @Req() req,
  ) {
    const currentUser = req.user;
    return this.usersService.addPoints(id, body.points, currentUser);
  }

  @Post(':id/badges')
  @ApiOperation({ summary: 'Afegir insígnia a un usuari' })
  @ApiResponse({ status: 200, description: 'Insígnia afegida' })
  @ApiResponse({ status: 404, description: 'Usuari no trobat' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async addBadge(
    @Param('id') id: string,
    @Body() body: { badge: string },
    @Req() req,
  ) {
    const currentUser = req.user;
    return this.usersService.addBadge(id, body.badge, currentUser);
  }

  @Post(':id/achievements')
  @ApiOperation({ summary: 'Afegir assoliment a un usuari' })
  @ApiResponse({ status: 200, description: 'Assoliment afegit' })
  @ApiResponse({ status: 404, description: 'Usuari no trobat' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async addAchievement(
    @Param('id') id: string,
    @Body() body: { achievement: string },
    @Req() req,
  ) {
    const currentUser = req.user;
    return this.usersService.addAchievement(id, body.achievement, currentUser);
  }

  // Endpoints de consulta
  @Get('role/:role')
  @ApiOperation({ summary: 'Obtenir usuaris per rol' })
  @ApiResponse({ status: 200, description: 'Llista d\'usuaris per rol' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async findByRole(
    @Param('role') role: string,
    @Query('schoolId') schoolId: string,
    @Req() req,
  ) {
    const currentUser = req.user;
    return this.usersService.findByRole(role as any, schoolId || currentUser.schoolId);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: 'Obtenir usuaris per classe' })
  @ApiResponse({ status: 200, description: 'Llista d\'usuaris de la classe' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async findByClass(@Param('classId') classId: string, @Req() req) {
    const currentUser = req.user;
    return this.usersService.findByClass(classId, currentUser);
  }

  @Get('family/:familyId')
  @ApiOperation({ summary: 'Obtenir usuaris per família' })
  @ApiResponse({ status: 200, description: 'Llista d\'usuaris de la família' })
  @ApiResponse({ status: 403, description: 'No autoritzat' })
  async findByFamily(@Param('familyId') familyId: string, @Req() req) {
    const currentUser = req.user;
    return this.usersService.findByFamily(familyId, currentUser);
  }

  // Endpoint per al perfil actual
  @Get('profile/me')
  @ApiOperation({ summary: 'Obtenir perfil de l\'usuari actual' })
  @ApiResponse({ status: 200, description: 'Perfil obtingut' })
  @ApiResponse({ status: 401, description: 'No autoritzat' })
  async getMyProfile(@Req() req) {
    const currentUser = req.user;
    return this.usersService.findOne(currentUser.id, currentUser);
  }

  @Patch('profile/me')
  @ApiOperation({ summary: 'Actualitzar perfil de l\'usuari actual' })
  @ApiResponse({ status: 200, description: 'Perfil actualitzat' })
  @ApiResponse({ status: 401, description: 'No autoritzat' })
  async updateMyProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const currentUser = req.user;
    return this.usersService.update(currentUser.id, updateUserDto, currentUser);
  }
} 