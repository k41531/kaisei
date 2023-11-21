import { ComponentChildren } from "preact";

export default function GlassCard(
  props: { children: ComponentChildren; isGradient?: boolean },
) {
  return (
    <div
      class={`drop-shadow-lg backdrop-blur bg-opacity-30  rounded-md p-3 ${
        props.isGradient ? "bg-gradient-radial" : "bg-white"
      }`}
    >
      {props.children}
    </div>
  );
}
