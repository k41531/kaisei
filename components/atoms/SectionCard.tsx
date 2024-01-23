import { ComponentChildren } from "preact";

export default function SectionCard(props: {
	children: ComponentChildren;
}) {
	return (
		<div
			class={`p-3 `}
		>
			{props.children}
		</div>
	);
}
