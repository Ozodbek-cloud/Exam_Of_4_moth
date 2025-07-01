import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './ReviewDto/dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/core/decorator/user.decorator';
import { UserRole } from 'src/core/types/user.types';

@ApiTags('Reviews')
@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post('add/:movie_id')
    @Auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a new review (FAQAT ADMIN VA USER)' })
    @ApiBody({ type: ReviewDto })
    @ApiResponse({ status: 201, description: 'Review successfully added' })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    Add_Review(@Body() payload: ReviewDto, @Req() req: Request, @Param('movie_id') movie_id: string) {
        return this.reviewService.add_review(payload, req['user'].id, movie_id);
    }

    @Get('all/reviews')
    @Auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all reviews (FAQAT ADMIN VA USER)' })
    @ApiResponse({ status: 200, description: 'List of all reviews' })
    Get_Review() {
        return this.reviewService.get_reviews();
    }

    @Delete('/:id')
    @Auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a review by ID  (FAQAT ADMIN VA USER)' })
    @ApiParam({ name: 'id', type: String, description: 'Review ID' })
    @ApiResponse({ status: 200, description: 'Review successfully deleted' })
    @ApiResponse({ status: 404, description: 'Review not found' })
    Delete_Review(@Param('id') id: string) {
        return this.reviewService.delete_review(id);
    }
}
