import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const PersonalHeader = () => {
	const { publication } = useAppContext();

	// const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	// const visibleItems = navbarItems.slice(0, 2);

	const domainName = 'https://starter-kit-personal.vercel.app/';

	const customNavList = [
		{ label: 'AI', url: 'series/artificial-intelligence' },
		{ label: 'No Code', url: 'series/no-code' },
		{ label: 'Software Eng', url: 'series/software-engineering-101' },
		{ label: 'Mobile Dev', url: 'series/mobile-development' },
	];
	const visibleItems = customNavList.slice(0, 2);
	const hiddenItems = customNavList.slice(2);

	const navList = (
		<ul className="flex flex-row items-center gap-2 text-white">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a
						href={`${domainName}${item.url}`} // Concatenate domainName and URL
						rel="noopener noreferrer"
						className="transition-200 block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
					>
						{item.label}
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button>More</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="flex flex-col items-stretch gap-1 rounded-lg border bg-white text-sm font-semibold uppercase tracking-tight text-neutral-600 shadow-xl dark:border-neutral-800 dark:bg-neutral-900  dark:text-neutral-300"
								sideOffset={5}
								align="end"
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="block w-full p-2 hover:underline"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<header className="dark-bg-neutral-900 border-b bg-slate-950 py-10 dark:border-neutral-800">
			<Container className="grid grid-cols-4 gap-5 px-5">
				<div className="col-span-2 flex flex-1 flex-row items-center gap-2 lg:col-span-1">
					<h1>
						{' '}
						<Link
							className="flex flex-row items-center gap-2 text-lg font-bold leading-tight tracking-tight text-black dark:text-white"
							href="/"
							aria-label={`${publication.author.name}'s blog home page`}
						>
							{' '}
							{publication.author.profilePicture && (
								<img
									className="block h-8 w-8 rounded-full fill-current"
									alt={publication.author.name}
									src={resizeImage(publication.author.profilePicture, {
										w: 400,
										h: 400,
										c: 'face',
									})}
								/>
							)}{' '}
							{publication.title}{' '}
						</Link>{' '}
					</h1>
				</div>
				<div className="col-span-2 flex flex-row items-center justify-end gap-5 text-xl text-slate-300 lg:col-span-3">
					<nav className=" lg:block">{navList}</nav>
					{/* <Button
						type="outline"
						label=""
						icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
						className="rounded-xl border-transparent !px-3 !py-2 text-white hover:bg-neutral-800 lg:hidden"
					/> */}
					{/* <Button href={baseUrl} as="a" type="primary" label="Book a demo" /> */}
				</div>
			</Container>
		</header>
	);
};
