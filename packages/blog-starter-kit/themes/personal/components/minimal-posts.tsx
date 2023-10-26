import { PostFragment } from '../generated/graphql';
import { MinimalPostPreview } from './minimal-post-preview';

type Props = {
	posts: PostFragment[];
	context: 'home' | 'series' | 'tag';
};

export const MinimalPosts = ({ posts }: Props) => {
	return (
		<section className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 ">
			{posts.map((post) => (
				<MinimalPostPreview
					key={post.id}
					title={post.title}
					coverImage={post.coverImage?.url}
					date={post.publishedAt}
					author={{
						name: post.author.name,
					}}
					slug={post.slug}
					commentCount={post.comments?.totalDocuments}
					excerpt={post.brief}
				/>
			))}
		</section>
	);
};
