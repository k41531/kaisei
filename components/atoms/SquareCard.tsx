import { ComponentChildren } from "preact";

export default function SectionCard(props: {
	children: ComponentChildren;
	title: string
}) {
	return (
		<div
			class={"p-3 bg-gray-600 rounded-md shadow-md aspect-w-1 aspect-h-1"}
		>
        <h2>
          {props.title}
        </h2>
			{props.children}
		</div>
	);
}
