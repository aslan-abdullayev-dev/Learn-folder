import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequirePermission } from '../../core/decorators/require-permission.decorator';
import { CATEGORIES_PERMISSIONS } from './permissions/categories.permissions';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @RequirePermission(CATEGORIES_PERMISSIONS.CREATE)
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body);
  }

  @Get()
  @RequirePermission(CATEGORIES_PERMISSIONS.READ)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @RequirePermission(CATEGORIES_PERMISSIONS.READ)
  findById(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }
}
