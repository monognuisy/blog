import { visit } from 'unist-util-visit';

// biome-ignore lint/suspicious/noExplicitAny: <>
export const rehypeCodePreProcess = () => (tree: any) => {
  visit(tree, node => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children;

      if (codeEl.tagName !== 'code') return;

      node.raw = codeEl.children?.[0].value;
    }
  });
};

// biome-ignore lint/suspicious/noExplicitAny: <>
export const rehypeCodePostProcess = () => (tree: any) => {
  visit(tree, 'element', node => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      node.properties.raw = node.raw;
      // console.log(node) here to see if you're getting the raw text
    }
  });
};
