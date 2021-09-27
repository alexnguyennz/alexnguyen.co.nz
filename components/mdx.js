// MDX page components including ones that don't need to be imported in each .mdx file

import Layout from '@components/layout';
import Image from 'next/image';
import Link from 'next/link';

// custom Image component for easier src input
const Img = (props) => {
  const { src, width, height, alt, disablePlaceholder } = props;
  return (
    <Image
      src={require(`../public/img/${src}`)}
      width={width}
      height={height}
      alt={alt}
      placeholder={`${!disablePlaceholder && 'blur'}`}
    />
  );
};

const MDXComponents = {
    Layout,
    Img,
    Link
};

export default MDXComponents;