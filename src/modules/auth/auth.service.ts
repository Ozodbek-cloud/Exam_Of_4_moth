import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from 'src/common/mail/mail.service';
import { RedisService } from 'src/common/redis/redis.service';
import { JwtAccessToken, JWtRefreshToken } from 'src/common/utils/jwt-utils';
import { UserModel } from 'src/core/entities/user.entities';
import * as bcrypt from "bcrypt"
import { RegisterDto } from './Auth_Dto/register.dto';
import { VerificationDto } from './Auth_Dto/verify.dto';
import { SendVerifyDto } from './Auth_Dto/sendVeryDto';
import { ResetPasswordDto } from './Auth_Dto/resetPassword.dto';
import { LoginDto } from './Auth_Dto/loginDto';
interface JwtPayload{
        id: number,
        role: string
    }


@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private userModel: typeof UserModel, private jwtService: JwtService, private mailerService: MailService, private redisService : RedisService) {}
   
    private async generateToken(payload: JwtPayload, accessTokenOnly = false) {
    const accessToken = await this.jwtService.signAsync(payload, JwtAccessToken);
    if (accessTokenOnly) {
      return { accessToken };
    }

    const refreshToken = await this.jwtService.signAsync(
      { id: payload.id },
      JWtRefreshToken
    );

    return { accessToken, refreshToken };
  }

  async register(payload: Required<RegisterDto>) {
        let username = await this.userModel.findOne({where: {username: payload.username}})
        if (username) throw new ConflictException(`${payload.username} is already registered!`)
         let email = await this.userModel.findOne({where: {email: payload.email}})
         if (email) throw new ConflictException(`${payload.email} is already exists!`)
        
        let code = Math.floor((Math.random() * 100000))
        await this.mailerService.sendMail(payload.email, 'Verification', code)
                 
        await this.redisService.set(`register:${payload.email}`, JSON.stringify({...payload, code}), 600)
        
        return {
          message: `Verification Successfully send to ${payload.email}`
        }
    }

    async verify(payload:Required<VerificationDto>) {
        let stored = await this.redisService.get(`register:${payload.email}`)
        if(!stored) throw new BadRequestException("Otp expire or not Found")

        let userData = JSON.parse(stored)
        if(userData.code != payload.code) throw new BadRequestException("Otp invalide")

        await this.redisService.del(`register:${payload.email}`)
        delete userData.code

        let hash = await bcrypt.hash(userData.password, 10)
        let user = await this.userModel.create({...userData, password:hash})

        let token = await this.generateToken({id: user.dataValues.Id, role: user.dataValues.role})
        return {message: "SuccessFully Registeres"}
    }

    async login(payload : Required<LoginDto>) {
         let exists = await this.userModel.findOne({
          where: {
            email: payload.email
          }
         })
         if (!exists) throw new NotFoundException(`this ${payload.email} is not match`)
         let compare = await bcrypt.compare(payload.password, exists?.dataValues.password)         
         if (!compare) throw new NotFoundException(`this ${payload.password} is not match`)

          let token = await this.generateToken({id: exists.dataValues.Id, role: exists.dataValues.role})
          return { success: true, data: exists.dataValues, token: token}
    }

    async sendVerify(payload: Required<SendVerifyDto>) {
      let code = Math.floor(Math.random() * 10000)

      await this.mailerService.sendMail(payload.email, 'Veritification code', code)

      await this.redisService.set(`pass:${payload.email}`,JSON.stringify({...payload, code}), 600)

      return {
        message: `Verification code send to ${payload.email}`
      }
    }

    async reset_password(payload: Required<ResetPasswordDto>) {
      let stored = await this.redisService.get(`pass:${payload.email}`)
      if (!stored) throw new BadRequestException("Otp expire or not found")
      
      let userData = JSON.parse(stored)

      if(userData.code != payload.code) throw new BadRequestException("Otp invalid")
      
     await this.redisService.del(`pass:${payload.email}`)

     let hash = await bcrypt.hash(payload.password, 10)

     await this.userModel.update({password: hash}, {
      where: {email: payload.email}
    })

    return {
      message: "Password Updated SuccessFully"
    }
    }

    
    }
    


