import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
import { DeleteResult } from 'typeorm';

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
    )
      .then((tags) => {
        return this.postsRepository.createOne(createPostDto, tags, user);
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }

  public paginate(options: IPaginationOptions): Promise<Pagination<Post>> {
    return paginate<Post>(this.postsRepository, options)
      .then((postsPaginable: Pagination<Post>) => {
        return postsPaginable;
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }

  public async getPostById(id: string, user: User, ip: string): Promise<Post> {
    try {
      const post = await this.postsRepository.getPostById(id, user);
      const isView = await this.viewRepository.isUserViewPost(ip, post);

      if (isView) {
        return post;
      } else {
        // add view in view table
        await this.viewRepository.addView(post, user, ip);
        // add view in post columns
        const result = await this.postsRepository.addView(post);
        return result;
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public deletePost(id: string, user: User): Promise<DeleteResult> {
    return this.postsRepository.deleteOne(id, user);
  }

  public async updatePublishStatus(
    id: string,
    publishUpdateDto: UpdatePublishStatusDto,
    user: User,
  ): Promise<Post> {
    try {
      const { publishStatus } = publishUpdateDto;
      const post = await this.postsRepository.getPostById(id, user);

      if (publishStatus === PUBLISH_STATUS.PUBLIC) {
        post.isPublish = true;
      } else if (publishStatus === PUBLISH_STATUS.HIDDEN) {
        post.isPublish = false;
      }

      return this.postsRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async toggleLike(id: string, user: User) {
    return this.postsRepository.toggleLike(id, user);
  }
}
