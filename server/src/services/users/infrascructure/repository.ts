import { Service } from 'typedi';
import { In } from 'typeorm';
import { chain } from 'lodash';
import { Repository } from '../../../lib/ddd/repository';
import { User } from '../domain/model';
import { UserSpec } from '../domain/specs';

@Service()
export class UserRepository extends Repository<User, number> {
  entityClass = User;

  async findSatisfying(spec: UserSpec) {
    return spec.satisfyingElementsFrom(this);
  }

  async findAll(): Promise<User[]> {
    return this.entityManager.find(User);
  }

  // FIXME: https://github.com/typeorm/typeorm/issues/2707 해결되면 { where: { userGroupRelations: In(groupIdxs) } } 같은 형식으로 조인할수 있을것이다.
  async findByGroupIdxs(groupIdxs: number[]): Promise<User[]> {
    const userGroupRelations = await this.entityManager.find(
      UserGroupRelation,
      {
        where: {
          groupIdx: In(groupIdxs),
        },
      }
    );
    const userIdxs = chain(userGroupRelations).map('userIdx').uniq().value();
    return this.entityManager.findByIds(User, userIdxs);
  }
}
