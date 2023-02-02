const Dashboard = ({ description, pseudo }: { description: string; pseudo: string }) => {
  return (
    <figure className="w-full text-center">
      <blockquote>
        <p className="citation">
          {description === 'Description'
            ? '"L\'inspiration vient de l\'intérieur. Malheureusement, je suis vide..!!!"'
            : '"' + description}
        </p>
      </blockquote>
      <figcaption className="citationUser">
        {`_${pseudo},`} <cite className="citationOrigin">YeahBuddy.com</cite>
      </figcaption>
    </figure>
  );
};

export default Dashboard;
