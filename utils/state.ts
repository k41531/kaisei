import { createDefine } from "fresh";

export interface State {
  title?: string;
  description?: string;
}

export const define = createDefine<State>();