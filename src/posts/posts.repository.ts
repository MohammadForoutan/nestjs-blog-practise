import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { title, body } = createPostDto;

    // CREATE POST
    const post: Post = this.create({ title, body, isPublish: false });

    // SAVE POST
    await this.save(post);

    // RETURN POST
    return post;
  }

  public async getAllPosts(): Promise<Post[]> {
    // FIND AND RETURN POSTS
    return await this.find();
  }

  public async getPostById(id: string): Promise<Post> {
    return await this.findOne(id);
  }
}
