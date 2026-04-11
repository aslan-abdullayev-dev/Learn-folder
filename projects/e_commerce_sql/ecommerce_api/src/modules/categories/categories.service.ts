import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse } from '../../core/responses/api-response';
import { DatabaseService } from '../../../database/database.service';
import { DatabaseSync } from 'node:sqlite';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class CategoriesService {
  private readonly db: DatabaseSync;
  private readonly CATEGORY_FIELDS = `
    id,
    name,
    slug,
    description,
    image_url AS imageUrl,
    is_active AS isActive,
    sort_order AS sortOrder,
    created_at AS createdAt,
    updated_at AS updatedAt
  `;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  // ─── CREATE ───────────────────────────────────────────────

  createCategory({
    name,
    slug,
    description,
    imageUrl,
    sortOrder,
  }: CreateCategoryDto) {
    this.ensureSlugIsUnique(slug);

    const idForNewCategory = uuidV4();

    this.db
      .prepare(
        `INSERT INTO categories (
          id,
          name,
          slug,
          description,
          image_url,
          is_active,
          is_deleted,
          sort_order,
          created_at,
          updated_at
        )
         VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, NULL)`,
      )
      .run(
        idForNewCategory,
        name,
        slug,
        description ?? null,
        imageUrl ?? null,
        0,
        sortOrder ?? 0,
        new Date().toISOString(),
      );

    this.insertAncestorRows(idForNewCategory);

    return new ApiResponse(
      'Category created successfully',
      this.findById(idForNewCategory).data,
    );
  }

  // ─── READ ──────────────────────────────────────────────

  findAll() {
    const categoriesList = this.db
      .prepare(
        `SELECT ${this.CATEGORY_FIELDS} FROM categories WHERE is_deleted = 0`,
      )
      .all();

    return new ApiResponse('Categories retrieved successfully', categoriesList);
  }

  findById(id: string) {
    const category = this.db
      .prepare(
        `SELECT ${this.CATEGORY_FIELDS} FROM categories WHERE id = ? AND is_deleted = 0`,
      )
      .get(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return new ApiResponse('Category retrieved successfully', category);
  }

  // ─── PRIVATE ──────────────────────────────────────────────

  private insertAncestorRows(categoryId: string): void {
    this.db
      .prepare(
        `INSERT INTO category_ancestors (
        ancestor_id,
        descendant_id,
        depth
    )
    VALUES (?, ?, ?)`,
      )
      .run(categoryId, categoryId, 0);
  }

  private ensureSlugIsUnique(slug: string): void {
    const exists = this.db
      .prepare(`SELECT id FROM categories WHERE slug = ?`)
      .get(slug);

    if (exists) {
      throw new ConflictException('Slug already in use');
    }
  }
}
