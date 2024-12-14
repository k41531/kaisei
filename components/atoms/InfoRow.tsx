import type { JSX } from "preact";

interface InfoRowProps {
  label: string;
  value: string | JSX.Element;
}

export default function InfoRow(props: InfoRowProps) {
  return (
    <div class="flex">
      <div class="w-20">{props.label}</div>
      <div>{props.value}</div>
    </div>
  );
}
