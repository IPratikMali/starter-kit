import Link from 'next/link';
import { DateFormatter } from './date-formatter';
type Props = {
	title: string;
	coverImage: string | null | undefined;
	date: string;
	excerpt: string;
	slug: string;
};

export const SquarePosts = ({ title, coverImage, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`;
	const backgroundStyles = {
		backgroundImage: `url(${coverImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};

	return (
		<div className="sm-max:h-60 relative h-60 hover:opacity-90">
			<div className="absolute inset-0 bg-black opacity-60" style={backgroundStyles}></div>
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="w-full bg-opacity-100 p-8 text-center text-white">
					<h1 className="sm-max:text-xl bg-black p-4 text-xl font-bold leading-tight lg:text-xl">
						<Link href={postURL} className="hover:text-blue-400">
							{title}
						</Link>
					</h1>

					<div className=" bg-black bg-blue-950 p-2 text-sm text-gray-300 hover:bg-sky-900">
						<Link href={postURL}>
							<DateFormatter dateString={date} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
