import { Post } from 'src/post/posts.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { View } from './view.entity';

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
