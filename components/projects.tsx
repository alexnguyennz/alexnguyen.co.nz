import Link from 'next/link';

interface ProjectsMetadata {
    metadata: object;
    title: string;
    id?: string;
    author?: string;
    description?: string;
    date: string;
    img?: string;
}

interface Props {
    metadata: ProjectsMetadata;
}

export function Info({metadata}: Props) {

    return (
    <div className="text-center sm:text-left">
        <h1 className="text-2xl">{metadata.title}</h1>
        <span>{metadata.date}</span><br />
        <Link href="/projects" passHref><a>← Return to Projects</a></Link>
    </div>
    )
}