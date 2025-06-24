import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Module({
  providers: [ProfilesService]
})
export class ProfilesModule {}
