import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@ApiTags('Autenticació')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sessió amb email i contrasenya' })
  @ApiResponse({ status: 200, description: 'Login exitós' })
  @ApiResponse({ status: 401, description: 'Credencials invàlides' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar nou usuari' })
  @ApiResponse({ status: 201, description: 'Usuari registrat amb èxit' })
  @ApiResponse({ status: 409, description: 'Email ja registrat' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Iniciar autenticació amb Google' })
  async googleAuth() {
    // Google OAuth iniciarà automàticament
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback de Google OAuth' })
  @ApiResponse({ status: 200, description: 'Autenticació amb Google exitosa' })
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refrescar token d\'accés' })
  @ApiResponse({ status: 200, description: 'Token refrescat amb èxit' })
  @ApiResponse({ status: 401, description: 'Token de refresc invàlid' })
  async refreshToken(@Body() body: { refreshToken: string }) {
    if (!body.refreshToken) {
      throw new BadRequestException('Token de refresc requerit');
    }
    return this.authService.refreshToken(body.refreshToken);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Canviar contrasenya' })
  @ApiResponse({ status: 200, description: 'Contrasenya canviada amb èxit' })
  @ApiResponse({ status: 400, description: 'Contrasenya actual incorrecta' })
  async changePassword(
    @Req() req,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    const user = req.user as JwtPayload;
    return this.authService.changePassword(
      user.sub,
      body.oldPassword,
      body.newPassword,
    );
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitar recuperació de contrasenya' })
  @ApiResponse({ status: 200, description: 'Email de recuperació enviat' })
  async forgotPassword(@Body() body: { email: string }) {
    if (!body.email) {
      throw new BadRequestException('Email requerit');
    }
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restablir contrasenya amb token' })
  @ApiResponse({ status: 200, description: 'Contrasenya restablerta amb èxit' })
  @ApiResponse({ status: 400, description: 'Token invàlid o expirat' })
  async resetPassword(
    @Body() body: { token: string; newPassword: string },
  ) {
    if (!body.token || !body.newPassword) {
      throw new BadRequestException('Token i nova contrasenya requerits');
    }
    return this.authService.resetPassword(body.token, body.newPassword);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtenir perfil de l\'usuari actual' })
  @ApiResponse({ status: 200, description: 'Perfil obtingut amb èxit' })
  @ApiResponse({ status: 401, description: 'No autoritzat' })
  async getProfile(@Req() req) {
    const user = req.user as JwtPayload;
    return {
      id: user.sub,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Tancar sessió' })
  @ApiResponse({ status: 200, description: 'Sessió tancada amb èxit' })
  async logout() {
    // En una implementació més avançada, podríem invalidar el token
    return { message: 'Sessió tancada amb èxit' };
  }
} 