import Link from 'next/link';
import { DateFormatter } from './date-formatter';

type Props = {
	title: string;
	coverImage: string;
	date: string;
	excerpt: string;
	slug: string;
};

export const MiddlePost = ({ title, coverImage, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`;
	const backgroundStyles = {
		backgroundImage: `url(${coverImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};

	return (
		<div className="sm-max:h-60 relative h-96 hover:opacity-90">
			<div className="absolute inset-0" style={backgroundStyles}></div>
			<div className="sm-max:justify-center absolute inset-0 flex items-center ">
				<div className="sm-max:w-3/4 w-1/2 bg-black bg-opacity-100 p-8 text-white  ">
					<h1 className="sm-max:text-xl mb-4 text-4xl font-bold leading-tight md:text-5xl">
						<Link href={postURL} className="hover:text-blue-400">
							{title}
						</Link>
					</h1>
					<div className="text-xl text-gray-300 md:text-xl">
						<Link href={postURL}>
							<DateFormatter dateString={date} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
