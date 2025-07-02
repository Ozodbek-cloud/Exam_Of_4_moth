import { Controller, Param, Patch } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/core/decorator/user.decorator';
import { UserRole } from 'src/core/types/user.types';

@ApiTags('DeActive And Activate')
@Controller('active')
export class ActiveController {
    constructor(private readonly actService: ActiveService) {}

  @Patch('/activate/:id')
  @ApiBearerAuth()
  @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Subscribe rejani faollashtirish' })
  @ApiParam({ name: 'id', description: 'Subscription plan ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Faollashtirildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  @ApiResponse({ status: 400, description: 'Allaqachon faollashtirilgan' })
  async activate(@Param('id') id: string) {
    return await this.actService.Activate(id);
  }

  @Patch('/deactivate/:id')
  @ApiBearerAuth()
  @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Subscribe rejani o‘chirish (noaktiv qilish)' })
  @ApiParam({ name: 'id', description: 'Subscription plan ID (UUID)' })
  @ApiResponse({ status: 200, description: 'O‘chirildi (noaktiv)' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  @ApiResponse({ status: 400, description: 'Allaqachon noaktiv holatda' })
  async deactivate(@Param('id') id: string) {
    return await this.actService.DeActive(id);
  }
}


