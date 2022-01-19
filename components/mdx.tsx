// MDX page components including ones that don't need to be imported in each .mdx file

import Layout from '@components/layout';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    src: string;
    width: number;
    height: number;
    alt: string;
    disablePlaceholder?: string;
}

// custom Image component for easier src input
const Img = (props: Props) => {
    const { src, width, height, alt, disablePlaceholder } = props;
    return (
        <Image
            src={require(`../public/img/${src}`)}
            width={width}
            height={height}
            alt={alt}
        />
    );
};

const MDXComponents = {
    Layout,
    Img,
    Link
};

export default MDXComponents;