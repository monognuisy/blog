import { visit } from 'unist-util-visit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rehypeCodePreProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children;

      if (codeEl.tagName !== 'code') return;

      node.raw = codeEl.children?.[0].value;
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rehypeCodePostProcess = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      node.properties['raw'] = node.raw;
      // console.log(node) here to see if you're getting the raw text
    }
  });
};
