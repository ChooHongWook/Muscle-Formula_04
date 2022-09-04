import { Inject, Service } from 'typedi';
import { UserRepository } from '../infrastructur/repository';
import { User } from '../domain/model';

@Service()
export class UserService {
  @Inject()
  private userRepository!: UserRepository;

  async renewToken(user: User) {}

  /**
   * @param actor 요청자
   * @param userId 조회하려는 user의 id
   * @returns User
   */
  async retrieve(actor: User, userId: number) {}

  /**
   * @param currPassword user 의 기존 password
   * @param newPassword user 의 새로운 password
   */
  async editPassword(user: User, currPassword: string, newPassword: string) {}
}
