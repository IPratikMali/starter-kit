import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import HamburgerSVG from './icons/svgs/HamburgerSVG';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const PersonalHeader = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = publication.preferences.darkMode?.logo || publication.preferences.logo;
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 3);
	const hiddenItems = navbarItems.slice(3);
	const customNavList = [
		{
			label: 'Software Eng',
			url: 'https://starter-kit-personal.vercel.app/series/software-engineering-101',
		},
		{ label: 'AI', url: 'https://starter-kit-personal.vercel.app/series/artificial-intelligence' },
		{ label: 'No-Code', url: 'https://starter-kit-personal.vercel.app/series/no-code' },
		{ label: 'Mobile Dev', url: 'https://starter-kit-personal.vercel.app/series/mobile-dev' },
		// Add more custom items as needed
	];

	const navList = (
		<ul className="flex flex-row items-center gap-2 text-white">
			{customNavList.map((item) => (
				<li key={item.url}>
					<a
						href={item.url}
						target="_blank" // Modify target and rel attributes as needed
						rel="noopener noreferrer"
						className="transition-200 block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
					>
						{item.label}
					</a>
				</li>
			))}

			{/* Include the hidden items if needed */}
		</ul>
	);

	// const navList = (
	// 	<ul className="flex flex-row items-center gap-2 text-white">
	// 		{visibleItems.map((item) => (
	// 			<li key={item.url}>
	// 				<a
	// 					href={item.url}
	// 					target="_blank"
	// 					rel="noopener noreferrer"
	// 					className="transition-200 block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
	// 				>
	// 					{item.label}
	// 				</a>
	// 			</li>
	// 		))}

	// 		{hiddenItems.length > 0 && (
	// 			<li>
	// 				<DropdownMenu.Root>
	// 					<DropdownMenu.Trigger asChild>
	// 						<Button
	// 							type="outline"
	// 							label=""
	// 							icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
	// 							className="rounded-xl border-transparent !px-3 !py-2 text-white hover:bg-neutral-800 lg:hidden"
	// 						/>
	// 					</DropdownMenu.Trigger>

	// 					<DropdownMenu.Portal>
	// 						<DropdownMenu.Content
	// 							className="w-48 rounded border border-gray-300 bg-white text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
	// 							align="end"
	// 							sideOffset={5}
	// 						>
	// 							{hiddenItems.map((item) => (
	// 								<DropdownMenu.Item asChild key={item.url}>
	// 									<a
	// 										href={item.url}
	// 										target="_blank"
	// 										rel="noopener noreferrer"
	// 										className="transition-200 block truncate p-2 transition-colors hover:bg-slate-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
	// 									>
	// 										{item.label}
	// 									</a>
	// 								</DropdownMenu.Item>
	// 							))}
	// 						</DropdownMenu.Content>
	// 					</DropdownMenu.Portal>
	// 				</DropdownMenu.Root>
	// 			</li>
	// 		)}
	// 	</ul>
	// );

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
					<nav className="hidden lg:block">{navList}</nav>
					<Button
						type="outline"
						label=""
						icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
						className="rounded-xl border-transparent !px-3 !py-2 text-white hover:bg-neutral-800 lg:hidden"
					/>
					{/* <Button href={baseUrl} as="a" type="primary" label="Book a demo" /> */}
				</div>
			</Container>
		</header>
	);
};
