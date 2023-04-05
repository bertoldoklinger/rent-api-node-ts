import { prisma } from "../../../../lib/prisma";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  constructor() { }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {

    await prisma.category.create({
      data: {
        name,
        description
      }
    })

  }

  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany()

    return categories
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        name: name
      }
    })

    return category
  }
}

export { CategoriesRepository };

