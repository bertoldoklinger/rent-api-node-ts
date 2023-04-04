import { prisma } from "../../../../lib/prisma";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: any;
  private static INSTANCE: CategoriesRepository
  private constructor() {
    this.repository = prisma.category
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }
    return CategoriesRepository.INSTANCE
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<Category> {

    const category = await prisma.category.create({
      data: {
        name,
        description
      }
    })
    return category
  }

  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany()

    return categories
  }

  async findByName(name: string) {
    const category = await prisma.category.findFirst({
      where: {
        name: name
      }
    })
    return category;
  }
}

export { CategoriesRepository };

