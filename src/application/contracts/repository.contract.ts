import { BaseEntity } from '../../domain/entities/base-entity';

export interface RepositoryInterface<E> {
  findById(id: string): Promise<E>;
  findAll(): Promise<E[]>;
  update(id: string, entity: E): Promise<E>;
  delete(id: string): Promise<void>;
}
