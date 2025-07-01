import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/core/entities/user.entities'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedersService implements OnModuleInit {
  private readonly logger = new Logger(SeedersService.name);

  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async onModuleInit() {
    await this.userSeeder();
  }

  async userSeeder() {
    
    const username =  "Abduhoshim99"
    const email = "abuhoshim99@gmail.com"
    const password = "benazir99"

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: 'SUPERADMIN', 
      
    });

    this.logger.log('✅ Superadmin successfully created!');
  }
}
