import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './Auth_Dto/register.dto';
import { VerificationDto } from './Auth_Dto/verify.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { sendVerifyDto } from './Auth_Dto/sendVeryDto';
import { resetPasswordDto } from './Auth_Dto/resetPassword.dto';
import { refreshTokenDto } from './Auth_Dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ) {}

    @ApiOperation({ summary: "Foydalanuvchini Register qilish va Emailga code jonatish"})
    @ApiResponse({ status: 201, description: 'Registered' })
    @ApiResponse({ status: 404, description: 'Not Registered' })
    @Post('register')
    Register(@Body() payload: RegisterDto) {
        return this.authService.register(payload)
    }

    @ApiOperation({ summary: "Foydalanuvchini Login qilish va Emaildagi code bilan tasdiqlash"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('login')
    Login(@Body() payload: VerificationDto) {
        return this.authService.verify(payload)
    }

    @ApiOperation({ summary: "Foydalanuvchiga code yuborish reset password uchun"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('send-verify')
    SendVerify(payload: sendVerifyDto){
        return this.authService.sendVerify(payload)
    }

    @ApiOperation({ summary: "Foydalanuvchini reset password"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('reset-password')
    ResetPassword(payload: resetPasswordDto) {
        return this.authService.reset_password(payload)
    }

    @ApiOperation({ summary: "Refresh token uchun"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('refresh-token')
    RefreshToken(payload: refreshTokenDto) {
        return this.authService.refresh_token(payload)
    }
    
}
