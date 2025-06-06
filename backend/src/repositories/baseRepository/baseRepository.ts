import { FilterQuery,UpdateQuery,Document,Model,ProjectionType } from "mongoose";
import IBaseRepository from "./interface/IBaseRepository";


export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string, useLean = true): Promise<T | Record<string, any> | null> {
    const query = this.model.findById(id);
    return useLean ? query.lean() : query.exec();
  }

  async findOne(filter: FilterQuery<T>, projection: ProjectionType<T>, useLean = true) {
    const query = this.model.findOne(filter, projection);
    return useLean ? query.lean().exec() : query.exec();
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec()
  }

  async updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true })
  }

  async deleteOne(filter: FilterQuery<T>): Promise<T |null>  {
    return this.model.findOneAndDelete(filter);
  }
}
