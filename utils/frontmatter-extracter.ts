import { visit } from 'https://esm.sh/unist-util-visit@5.0.0';
import yaml from 'https://esm.sh/js-yaml@4.1.0';
import { VFile } from 'https://esm.sh/v135/vfile@6.0.1';
import { Node,Literal } from "https://esm.sh/v135/@types/unist@3.0.2/index.d.ts";

function extractFrontmatter() {
  return function (tree: Node, file: VFile) {
    visit(tree, 'yaml', (node: Literal) => {
      file.data.frontmatter = yaml.load(node.value as string) as Record<string, unknown>;
    });
  };
}

export default extractFrontmatter;