import { DataSource } from 'typeorm';
import { User } from './entity/user';
import { Blog } from './entity/blog';
import { Article } from './entity/article';
import { Tag } from './entity/tag';
import { Comment } from './entity/comment';

import { Category } from './entity/category';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'example',
  database: 'postgres',
  synchronize: true,
  entities: [User, Category, Blog, Article, Tag, Comment],
});

export default dataSource;
