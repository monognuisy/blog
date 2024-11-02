import { MDXProvider } from '@mdx-js/react';

const CustomMDXComponents: React.ComponentProps<
  typeof MDXProvider
>['components'] = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 className="font-bold" {...props} />,
};

export default CustomMDXComponents;
