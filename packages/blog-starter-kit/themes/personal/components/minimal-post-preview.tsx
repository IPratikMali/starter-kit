import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { User } from '../generated/graphql';
import { DEFAULT_COVER } from '../utils/const';
import { CoverImage } from './cover-image';
import { DateFormatter } from './date-formatter';

type Author = Pick<User, 'name'>;

type Props = {
	title: string;
	date: string;
	excerpt: string;
	coverImage: string | null | undefined;
	author: Author;
	slug: string;
};

export const MinimalPostPreview = ({ title, date, coverImage, slug, excerpt }: Props) => {
	const postURL = `/${slug}`;

	return (
		//Middle articles Starts here
		<div className="w-401 h-400 flex bg-black shadow-md sm:h-auto sm:w-full sm:flex-col md:h-auto md:w-full md:flex-row">
			{/* Left Section (Title and Date) */}
			<div className="mh-400 sm-max:w-full w-80 bg-slate-800 hover:bg-black sm:h-auto sm:w-full md:h-auto md:w-1/2">
				<div className="p-4">
					<h2 className="sm-max:text-md font-custom text-xl leading-tight tracking-wide text-black hover:text-blue-400 dark:text-white">
						<Link href={postURL}>{title}</Link>
					</h2>
					<br />
					<p className="text-sm text-neutral-600 dark:text-neutral-400">
						<DateFormatter dateString={date} />
					</p>
					<p className="text-sm text-neutral-600 dark:text-neutral-400 lg:hidden xl:hidden">
						<Link href={postURL}>
							<span className="text-md leading-snug text-slate-500 dark:text-neutral-400">
								{excerpt.length > 140 ? excerpt.substring(0, 140) + '…' : excerpt}
							</span>
						</Link>
					</p>
				</div>
			</div>

			{/* Right Section (Blog Cover) */}
			<div className="h-400 h-400 sm-max:hidden sm-min:hidden w-80 sm:h-auto sm:w-full md:w-1/2 ">
				<div className="p-1">
					<CoverImage
						slug={slug}
						title={title}
						src={resizeImage(coverImage, { w: 1600, h: 840, c: 'thumb' }, DEFAULT_COVER)}
					/>
				</div>
			</div>
		</div>
		// Middle articles ends here
	);
};
