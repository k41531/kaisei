import type { ComponentChildren } from "preact";

export default function SectionCard(props: {
  children: ComponentChildren;
  title: string;
}) {
  return (
    <div class="pt-3">
      <h2>{props.title}</h2>
      <hr class="mb-1 border-foreground" />
      {props.children}
    </div>
  );
}
