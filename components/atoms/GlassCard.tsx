import { ComponentChildren } from "preact";

export default function GlassCard(props: {
	children: ComponentChildren;
}) {
	return (
		<div
			class={`backdrop-blur bg-opacity-30  rounded-sm p-3 bg-gradient-radial transition duration-500 ease-in-out transform hover:shadow-md `}
		>
			{props.children}
		</div>
	);
}
