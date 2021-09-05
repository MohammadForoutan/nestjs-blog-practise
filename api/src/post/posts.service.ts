import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag/tag.entity';
import { ViewRepotitory } from '../view/view.repository';
import { TagRepository } from '../tag/tag.repository';
import { User } from '../user/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePublishStatusDto } from './dto/update-publish.dto';
import { Post } from './posts.entity';
import { PostsRepository } from './posts.repository';
import { PUBLISH_STATUS } from './publish-status.enum';

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

    return Promise.all([
      ...tags.map(async (tag) => {
        const isTagExist: Tag = await this.tagRepository.findOne({ name: tag });
        if (!isTagExist) {
          const newTag: Tag = this.tagRepository.create({ name: tag });
          await this.tagRepository.save(newTag);
          return newTag;
        } else {
          return isTagExist;
        }
      }),
    ]).then((tags) => {
      return this.postsRepository.createPost(createPostDto, tags, user);
    });
  }

  public getAllPosts(): Promise<Post[]> {
    return this.postsRepository.getAllPosts();
  }

  public async getPostById(id: string, user: User, ip: string): Promise<Post> {
    const post = await this.postsRepository.getPostById(id, user);

    const isView = await this.viewRepository.isUserViewPost(ip, post);

    if (!isView) {
      // add view in view table
      await this.viewRepository.addView(post, user, ip);
      // add view in post columns
      await this.postsRepository.addView(post).then((result) => {
        return result;
      });
    } else {
      return post;
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