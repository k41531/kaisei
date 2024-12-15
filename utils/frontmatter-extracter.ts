import { parse } from "@std/yaml";
import { visit } from "visit";
import type { VFile } from "vfile";
import type {
  Literal,
  Node,
} from "@types:unist";

function extractFrontmatter() {
  return (tree: Node, file: VFile) => {
    visit(tree, "yaml", (node: Literal) => {
      file.data.frontmatter = parse(node.value as string) as Record<
        string,
        unknown
      >;
    });
  };
}

export default extractFrontmatter;
