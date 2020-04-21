import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  category: string;
}

class CreateCategoryService {
  public async execute({ category }: Request): Promise<string> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (checkCategoryExists) {
      return checkCategoryExists.id;
    }

    const newCategory = categoriesRepository.create({
      title: category,
    });

    await categoriesRepository.save(newCategory);

    return newCategory.id;
  }
}

export default CreateCategoryService;
