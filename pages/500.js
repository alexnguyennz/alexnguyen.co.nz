import Link from 'next/link'

import Layout from '@components/layout'

const pageTitle = "An error(s) occurred"

export default function Home() {
    return (
        <Layout title={pageTitle}>
            <section className="text-center">
                <h1 className="text-4xl font-bold">500 error</h1>
                
                <p>A server-side error(s) occurred.</p>

                <p className="font-bold"><Link href="/"><a>← Home</a></Link></p>
            </section>
        </Layout>
    )
}