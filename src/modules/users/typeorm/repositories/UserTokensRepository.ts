import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findeByToken(token: string): Promise<UserToken | undefined> {
    const userTokne = await this.findOne({
      where: {
        token,
      },
    });
    return userTokne;
  }

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}
export default UserTokensRepository;
