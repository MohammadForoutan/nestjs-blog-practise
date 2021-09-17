import { User } from '../../user/models/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../models/posts.entity';
import { View } from '../models/view.entity';

@EntityRepository(View)
export class ViewRepotitory extends Repository<View> {
  public async isUserViewPost(ip: string, post: Post) {
    const isView = await this.findOne({ ip, post });
    return isView;
  }
  public async addView(post: Post, user: User, ip: string): Promise<any> {
    const newView = this.create({ ip, user, post });
    return await this.save(newView);
  }
}
