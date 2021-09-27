import Link from 'next/link';

export function Info({metadata}) {

    return (
    <div className="text-center sm:text-left">
        <h1 className="text-2xl">{metadata.title}</h1>
        <span>{metadata.date}</span><br />
        <Link href="/projects" passHref><a>← Return to Projects</a></Link>
    </div>
    )
}