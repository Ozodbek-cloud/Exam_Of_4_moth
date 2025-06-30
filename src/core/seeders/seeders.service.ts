import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SeedersService implements OnModuleInit{
    private logger
    async onModuleInit() {
        await this.userSeeder()
    }

    async userSeeder() {}
}
