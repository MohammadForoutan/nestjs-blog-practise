import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViewRepotitory } from './view.repository';
import { PostsRepository } from './posts.repository';
import { TagRepository } from '../../tag/service/tag.repository';
import { CreatePostDto } from '../dto/create-post.dto';
import { User } from '../../user/models/user.entity';
import { Post } from '../models/posts.entity';
import { Tag } from '../../tag/models/tag.entity';
import { UpdatePublishStatusDto } from '../dto/update-publish.dto';
import { PUBLISH_STATUS } from '../models/publish-status.enum';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
    @InjectRepository(TagRepository) private tagRepository: TagRepository,
    @InjectRepository(ViewRepotitory) private viewRepository: ViewRepotitory,
  ) {}

  public async createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const { tags } = createPostDto;

    return Promise.all(
      tags.map(async (tag) => {
        const isTagExist: Tag = await this.tagRepository.findOne({ name: tag });
        if (!isTagExist) {
          const newTag: Tag = this.tagRepository.create({ name: tag });
          await this.tagRepository.save(newTag);
          return newTag;
        } else {
          return isTagExist;
        }
      }),
    ).then((tags) => {
      return this.postsRepository.createPost(createPostDto, tags, user);
    });
  }

  public paginate(options: IPaginationOptions): Promise<Pagination<Post>> {
    return paginate<Post>(this.postsRepository, options).then(
      (postsPaginable: Pagination<Post>) => {
        return postsPaginable;
      },
    );
  }

  public async getPostById(id: string, user: User, ip: string): Promise<Post> {
    const post = await this.postsRepository.getPostById(id, user);

    const isView = await this.viewRepository.isUserViewPost(ip, post);

    if (isView) {
      return post;
    } else {
      // add view in view table
      await this.viewRepository.addView(post, user, ip);
      // add view in post columns
      await this.postsRepository.addView(post).then((result) => {
        return result;
      });
    }
  }

  public deletePost(id: string, user: User): void {
    this.postsRepository.deletePost(id, user);
  }

  public async updatePublishStatus(
    id: string,
    publishUpdateDto: UpdatePublishStatusDto,
    user: User,
  ): Promise<void> {
    const { publishStatus } = publishUpdateDto;
    const post = await this.postsRepository.getPostById(id, user);

    if (publishStatus === PUBLISH_STATUS.PUBLIC) {
      post.isPublish = true;
    } else if (publishStatus === PUBLISH_STATUS.HIDDEN) {
      post.isPublish = false;
    }

    await this.postsRepository.save(post);
  }

  public async toggleLike(id: string, user: User) {
    return this.postsRepository.toggleLike(id, user);
  }
}
