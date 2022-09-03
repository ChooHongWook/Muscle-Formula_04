import { Service } from 'typedi';
import { User } from '../domain/model';

@Service()
export class UserRepository {
  entityClass = User;
}
