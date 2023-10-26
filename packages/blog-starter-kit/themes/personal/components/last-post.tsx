import Link from 'next/link';
import { DateFormatter } from './date-formatter';

type Props = {
	title: string;
	coverImage: string;
	excerpt: string;
	date: string;
	slug: string;
};

export const LastPost = ({ title, coverImage, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`;

	const backgroundStyles = {
		backgroundImage: `url(${coverImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};

	return (
		<div className="relative h-96 hover:opacity-90">
			<div className="absolute inset-0 bg-black opacity-60" style={backgroundStyles}></div>
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="sm-max:w-full w-3/4 bg-opacity-100 p-8 text-center text-white">
					<h1 className="sm-max:text-2xl bg-black p-4 text-4xl font-bold leading-tight md:text-5xl">
						<Link href={postURL} className="hover:text-blue-400">
							{title}
						</Link>
					</h1>

					<div className="bg-pink-800 p-2 text-xl text-gray-300 ">
						<Link href={postURL}>
							<DateFormatter dateString={date} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
