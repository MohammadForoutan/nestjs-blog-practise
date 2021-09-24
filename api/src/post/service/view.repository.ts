import { User } from '../../user/models/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../models/posts.entity';
import { View } from '../models/view.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(View)
export class ViewRepotitory extends Repository<View> {
  public async isUserViewPost(ip: string, post: Post) {
    try {
      const isView = await this.findOne({ ip, post });
      return Boolean(isView);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  public addView(post: Post, user: User, ip: string): Promise<any> {
    const newView = this.create({ ip, user, post });
    return this.save(newView).catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
