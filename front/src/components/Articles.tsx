import { Article } from '../model/models';
import { CustomText } from './static/Customtext';
import { Label } from './static/Label';
import { Value } from './static/Value';

interface ArticleProps {
  articles: Article[];
  onClick?: () => void;
}

export const Articles = (props: ArticleProps) => {
  const articles = props.articles;
  return (
    <div onClick={props.onClick && props.onClick}>
      {articles.map((article, index) => {
        return (
          <div key={index}>
            <Label>{article.label}</Label>
            <CustomText>{article.content}</CustomText>
            <Value>{article.createdAt}</Value>
          </div>
        );
      })}
    </div>
  );
};
