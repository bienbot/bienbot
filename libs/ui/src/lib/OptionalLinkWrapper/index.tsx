import * as React from "react";
import Link from "next/link";

type Props = {
	children: React.ReactNode;
	href?: string;
};

const OptionalLinkWrapper = (props: Props) => {
	if (props.href) {
		return (
			<Link href={props.href} passHref>
				{props.children}
			</Link>
		);
	}
	return <>{props.children}</>;
};

export default OptionalLinkWrapper;
