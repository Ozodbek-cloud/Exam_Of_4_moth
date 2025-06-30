import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './Auth_Dto/register.dto';
import { VerificationDto } from './Auth_Dto/verify.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendVerifyDto } from './Auth_Dto/sendVeryDto';
import { ResetPasswordDto } from './Auth_Dto/resetPassword.dto';
import { LoginDto } from './Auth_Dto/loginDto';

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

    @ApiOperation({ summary: "Foydalanuvchini Emaildagi code bilan tasdiqlash"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('verify')
    Verify(@Body() payload: VerificationDto) {
        return this.authService.verify(payload)
    }
     
    @ApiOperation({ summary: "Foydalanuvchini Login qilish va Emaildagi code bilan tasdiqlash"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('login')
    Login(@Body() payload: LoginDto) {
        return this.authService.login(payload)
    }

    @ApiOperation({ summary: "Foydalanuvchiga code yuborish reset password uchun"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('send-verify')
    SendVerify(@Body() payload: SendVerifyDto){
        return this.authService.sendVerify(payload)
    }

    @ApiOperation({ summary: "Foydalanuvchini reset password"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('reset-password')
    ResetPassword(@Body() payload: ResetPasswordDto) {
        return this.authService.reset_password(payload)
    }

    
    
}
