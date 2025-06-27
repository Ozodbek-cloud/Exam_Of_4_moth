import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './ReviewDto/dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post('add')
    @ApiOperation({ summary: 'Add a new review' })
    @ApiBody({ type: ReviewDto })
    @ApiResponse({ status: 201, description: 'Review successfully added' })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    Add_Review(@Body() payload: ReviewDto) {
        return this.reviewService.add_review(payload);
    }

    @Get('all/reviews')
    @ApiOperation({ summary: 'Get all reviews' })
    @ApiResponse({ status: 200, description: 'List of all reviews' })
    Get_Review() {
        return this.reviewService.get_reviews();
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a review by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Review ID' })
    @ApiResponse({ status: 200, description: 'Review successfully deleted' })
    @ApiResponse({ status: 404, description: 'Review not found' })
    Delete_Review(@Param('id') id: string) {
        return this.reviewService.delete_review(id);
    }
}
