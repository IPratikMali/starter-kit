type Props = {
	children?: React.ReactNode;
	className?: string;
};

export const Container = ({ children, className }: Props) => {
	return <div className={'container mx-full ' + className}>{children}</div>;
};
