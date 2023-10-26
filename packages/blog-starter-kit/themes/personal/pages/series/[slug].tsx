import request from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Container } from '../../components/container';
import { AppProvider } from '../../components/contexts/appContext';
import { Footer } from '../../components/footer';
import { Layout } from '../../components/layout';
import { MinimalPosts } from '../../components/minimal-posts';
import { PersonalHeader } from '../../components/personal-theme-header';
import {
	PostFragment,
	PublicationFragment,
	SeriesFragment,
	SeriesPostsByPublicationDocument,
	SeriesPostsByPublicationQuery,
	SeriesPostsByPublicationQueryVariables,
} from '../../generated/graphql';

type Props = {
	series: SeriesFragment;
	posts: PostFragment[];
	publication: PublicationFragment;
};

export default function Post({ series, publication, posts }: Props) {
	const title = `${series.name} - ${publication.title}`;

	return (
		<AppProvider publication={publication}>
			<Layout>
				<Head>
					<title>{title}</title>
				</Head>
				<Container className="max-w-xxl mx-auto flex flex-col items-stretch gap-10 px-5 py-10">
					<PersonalHeader />
					<div className="flex flex-col gap-1 pt-5">
						<p className="font-bold uppercase text-slate-500 dark:text-neutral-400">Series</p>
						<h1 className="text-4xl font-bold text-slate-900 dark:text-neutral-50">
							{series.name}
						</h1>
						<div
							className="hashnode-content-style"
							dangerouslySetInnerHTML={{ __html: series.description?.html ?? '' }}
						></div>
					</div>
					{posts.length > 0 && <MinimalPosts context="series" posts={posts} />}
					<Footer />
				</Container>
			</Layout>
		</AppProvider>
	);
}

type Params = {
	slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	if (!params) {
		throw new Error('No params');
	}
	const data = await request<SeriesPostsByPublicationQuery, SeriesPostsByPublicationQueryVariables>(
		process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
		SeriesPostsByPublicationDocument,
		{
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
			first: 20,
			seriesSlug: params.slug,
		},
	);

	const publication = data.publication;
	const series = publication?.series;
	if (!publication || !series) {
		return {
			notFound: true,
		};
	}
	const posts = publication.series ? publication.series.posts.edges.map((edge) => edge.node) : [];

	return {
		props: {
			series,
			posts,
			publication,
		},
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};
