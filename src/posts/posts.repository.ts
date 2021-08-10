import { User } from 'src/auth/user.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  public async createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const { title, body } = createPostDto;

    const post: Post = this.create({ title, body, isPublish: false });
    post.user = user;

    await this.save(post);
    return post;
  }

  public async getAllPosts(): Promise<Post[]> {
    return await this.find();
  }

  public async getPostById(id: string): Promise<Post> {
    return await this.findOne(id);
  }

  public async deletePost(id: string, user: User): Promise<DeleteResult> {
    return await this.delete({ id, user });
  }
}
