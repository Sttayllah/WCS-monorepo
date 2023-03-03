const UserArticlePage = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default UserArticlePage;
