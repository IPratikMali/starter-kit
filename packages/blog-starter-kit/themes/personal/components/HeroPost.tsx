import Link from 'next/link';
import { DateFormatter } from './date-formatter';
type Props = {
	title: string;
	coverImage: string;
	date: string;
	excerpt: string;
	slug: string;
};

export const HeroPost = ({ title, coverImage, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`;

	const backgroundStyles = {
		backgroundImage: `url(${coverImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};

	return (
		<div className="sm-max:h-60 relative h-96 hover:opacity-90">
			<div className="sm-max:h-50 absolute inset-0" style={backgroundStyles}></div>
			<div className=" sm-max:bg-gradient-to-b sm-max:items-center absolute inset-0 flex bg-gradient-to-r from-black">
				<div className="sm-max:w-full w-1/2 p-8 text-start text-white">
					<h1 className="sm-max:text-2xl font-custom mb-4 text-4xl font-bold leading-tight tracking-wide sm:text-3xl md:text-5xl">
						<Link href={postURL} className="hover:text-blue-400">
							{title}
						</Link>
					</h1>
					<div className="text-xl text-gray-300 md:text-2xl">
						<Link href={postURL}>
							<DateFormatter dateString={date} />
						</Link>
					</div>{' '}
					<br />
					<p className="sm-max:hidden lg-max:hidden text-sm text-neutral-600 dark:text-neutral-400">
						<Link href={postURL}>
							<span className="text-lg leading-snug text-slate-500 dark:text-neutral-400">
								{excerpt.length > 140 ? excerpt.substring(0, 140) + '…' : excerpt}
							</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
