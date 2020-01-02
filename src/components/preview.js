const ArticlePreview = ({ node }) => {
    const title = node.frontmatter.title || node.fields.slug;

    const link = node.link ? (
        <a href={node.link} target="_blank">
            {title}
        </a>
    ) : (
        <Link to={node.fields.slug}>{title}</Link>
    );

    return (
        <article>
            <header>
                <h2>{link}}</h2>
                <small>{node.frontmatter.date}</small>
            </header>
            <section>
                <p>{node.frontmatter.description || node.excerpt}</p>
            </section>
        </article>
    );
};

export default ArticlePreview;
