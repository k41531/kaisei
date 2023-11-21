import { ComponentChildren } from "preact";

export default function GlassCard(props: {
	children: ComponentChildren;
	isGradient?: boolean;
}) {
	return (
		<div
			class={`backdrop-blur bg-opacity-30  rounded-md p-3 ${
				props.isGradient ? "bg-gradient-radial" : "bg-white"
			} transition duration-500 ease-in-out transform hover:shadow-md `}
		>
			{props.children}
		</div>
	);
}
