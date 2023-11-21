import { ComponentChildren } from "preact";

export default function GlassCard(
  props: { children: ComponentChildren; isGradient?: boolean },
) {
  return (
    <div
      class={`drop-shadow-lg backdrop-blur bg-opacity-30 border-2 border-white border-opacity-30 rounded-sm p-2 ${
        props.isGradient ? "bg-gradient-radial" : "bg-white"
      }`}
    >
      {props.children}
    </div>
  );
}
