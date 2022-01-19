import Link from 'next/link';
import Layout from '@components/layout';

const Page = () => {

    const pageTitle = 'An error(s) occurred';
    
    return (
        <Layout title={pageTitle}>
            <section className="text-center">
                <h1 className="text-4xl font-bold">500 error</h1>
                
                <p>{pageTitle}.</p>

                <p className="font-bold"><Link href="/"><a>← Home</a></Link></p>
            </section>
        </Layout>
    )
}

export default Page;