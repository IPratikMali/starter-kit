import { addPublicationJsonLd } from '@starter-kit/utils/seo/addPublicationJsonLd';
import { getAutogeneratedPublicationOG } from '@starter-kit/utils/social/og';
import request from 'graphql-request';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { HeroPost } from '../components/HeroPost';
import { Container } from '../components/container';
import { AppProvider } from '../components/contexts/appContext';
import { Footer } from '../components/footer';
import { ArticleSVG } from '../components/icons';
import { LastPost } from '../components/last-post';
import { Layout } from '../components/layout';
import { MiddlePost } from '../components/middle-posts';
import { MinimalPosts } from '../components/minimal-posts';
import { Navbar } from '../components/navbar';
import { PersonalHeader } from '../components/personal-theme-header';
import { SquarePosts } from '../components/square-posts';
import {
	MorePostsByPublicationDocument,
	MorePostsByPublicationQuery,
	MorePostsByPublicationQueryVariables,
	PageInfoFragment,
	PostFragment,
	PostsByPublicationDocument,
	PostsByPublicationQuery,
	PostsByPublicationQueryVariables,
	PublicationFragment,
} from '../generated/graphql';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

type Props = {
	publication: PublicationFragment;
	initialPosts: PostFragment[];
	initialPageInfo: PageInfoFragment;
};

export default function Index({ publication, initialPosts, initialPageInfo }: Props) {
	const [posts, setPosts] = useState<PostFragment[]>(initialPosts);
	const [pageInfo, setPageInfo] = useState<Props['initialPageInfo']>(initialPageInfo);
	const [loadedMore, setLoadedMore] = useState(false);

	const loadMore = async () => {
		const data = await request<MorePostsByPublicationQuery, MorePostsByPublicationQueryVariables>(
			GQL_ENDPOINT,
			MorePostsByPublicationDocument,
			{
				first: 20,
				host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
				after: pageInfo.endCursor,
			},
		);
		if (!data.publication) {
			return;
		}
		const newPosts = data.publication.posts.edges.map((edge) => edge.node);
		setPosts([...posts, ...newPosts]);
		setPageInfo(data.publication.posts.pageInfo);
		setLoadedMore(true);
	};
	return (
		<AppProvider publication={publication}>
			<Layout>
				<Head>
					<title>{publication.title}</title>
					<meta
						name="description"
						content={
							publication.descriptionSEO || publication.title || `${publication.author.name}'s Blog`
						}
					/>
					<meta property="twitter:card" content="summary_large_image" />
					<meta
						property="twitter:title"
						content={publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit'}
					/>
					<meta
						property="twitter:description"
						content={
							publication.descriptionSEO || publication.title || `${publication.author.name}'s Blog`
						}
					/>
					<meta
						property="og:image"
						content={publication.ogMetaData.image || getAutogeneratedPublicationOG(publication)}
					/>
					<meta
						property="twitter:image"
						content={publication.ogMetaData.image || getAutogeneratedPublicationOG(publication)}
					/>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(addPublicationJsonLd(publication)),
						}}
					/>
				</Head>

				<Container className="mx-auto flex max-w-screen-xl flex-col items-stretch gap-10 px-5 py-10">
					<PersonalHeader />
					<Navbar />
					{posts.length === 0 && (
						<div className="grid grid-cols-1 py-20 lg:grid-cols-3">
							<div className="col-span-1 flex flex-col items-center gap-5 text-center text-slate-700 dark:text-neutral-400 lg:col-start-2">
								<div className="w-20">
									<ArticleSVG clasName="stroke-current" />
								</div>
								<p className="text-xl font-semibold ">
									Hang tight! We&apos;re drafting the first article.
								</p>
							</div>
						</div>
					)}

					{/* Display the HeroPost component for the hero post */}
					{posts.length > 1 && (
						<HeroPost
							title={posts[1].title}
							coverImage={posts[1].coverImage?.url || ''}
							date={posts[1].publishedAt}
							excerpt={posts[1].brief}
							slug={posts[1].slug}
						/>
					)}
					{/* Display the MinimalPosts component for minimal posts */}

					{/* {posts.length > 1 && <MinimalPosts context="home" posts={posts.slice(1, 9)} />} */}
					{posts.length > 1 && (
						<MinimalPosts
							context="home"
							posts={posts.slice(0, 9).filter((post, index) => index !== 1)}
						/>
					)}

					{/* Preload the coverImage */}
					{posts.length > 0 && (
						<link rel="preload" as="image" href={posts[1].coverImage?.url || ''} />
					)}

					{/* Display the MiddlePosts component for the MiddlePost */}
					{posts.length > 10 && (
						<MiddlePost
							title={posts[10].title}
							coverImage={posts[10].coverImage?.url || ''}
							date={posts[10].publishedAt}
							excerpt={posts[10].brief}
							slug={posts[10].slug}
						/>
					)}
					{/* Display the SquarePosts component for the last 8 posts */}
					<section className="sm-max:grid-cols-1 grid grid-cols-2 gap-14 lg:grid-cols-3">
						{posts.length > 11 &&
							posts
								.slice(11, 17)
								.map((post) => (
									<SquarePosts
										key={post.id}
										title={post.title}
										coverImage={post.coverImage?.url}
										date={post.publishedAt}
										slug={post.slug}
										excerpt={post.brief}
									/>
								))}
					</section>

					{/* Display the LastPost component for the last-post */}
					{posts.length > 18 && (
						<LastPost
							title={posts[18].title}
							coverImage={posts[18].coverImage?.url || ''}
							date={posts[18].publishedAt}
							excerpt={posts[18].brief}
							slug={posts[18].slug}
						/>
					)}
					{/* <section className="sm-max:grid-cols-1 grid grid-cols-2 gap-14 lg:grid-cols-3">
						{posts.length > 19 &&
							posts
								.slice(19)
								.map((post) => (
									<SquarePosts
										key={post.id}
										title={post.title}
										coverImage={post.coverImage?.url}
										date={post.publishedAt}
										slug={post.slug}
										excerpt={post.brief}
									/>
								))}
					</section> */}

					{posts.length > 19 && <MinimalPosts context="home" posts={posts.slice(19)} />}
					{!loadedMore && pageInfo.hasNextPage && pageInfo.endCursor && (
						<button
							className="mx-auto w-3/4 rounded bg-white p-1 hover:bg-orange-300"
							onClick={loadMore}
						>
							Load more
						</button>
					)}

					{loadedMore && pageInfo.hasNextPage && pageInfo.endCursor && (
						<Waypoint onEnter={loadMore} bottomOffset={'10%'} />
					)}

					<Footer />
				</Container>
			</Layout>
		</AppProvider>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const data = await request<PostsByPublicationQuery, PostsByPublicationQueryVariables>(
		GQL_ENDPOINT,
		PostsByPublicationDocument,
		{
			first: 20,
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
		},
	);

	const publication = data.publication;
	if (!publication) {
		return {
			notFound: true,
		};
	}
	const initialPosts = (publication.posts.edges ?? []).map((edge) => edge.node);

	return {
		props: {
			publication,
			initialPosts,
			initialPageInfo: publication.posts.pageInfo,
		},
		revalidate: 1,
	};
};
