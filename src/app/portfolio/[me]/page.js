import { AboutMe, SkillsMe, PortfolioMe, FeaturedMe, EducationMe, WorkExperienceMe, serverClient} from '@/components/'
import { portfolio } from '@/components/graphql/query'

export async function generateMetadata({params}) {
    const { data } = await serverClient.query({
        query: portfolio,
        variables: { username: params.me },
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    })

    const portf = data.Portfolios.docs[0]
    if (portf) {
        return {
            title: portf.myname + ' ' + portf.mytitle,
            description: portf.myheadline,
            openGraph: {
                title: portf.myname + ' ' + portf.mytitle,
                description: portf.myheadline,
                images: portf.myphoto.url
            },
        }
    }
}


export const dynamic = 'force-dynamic'

export default async function Profile({params}) {

    const { data } = await serverClient.query({
        query: portfolio,
        variables: { username: params.me },
        fetchPolicy: 'network-only',
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    })

    const portf = data.Portfolios.docs[0]

    return (
        <>
            <section className="pt-24 py-16 md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
                <FeaturedMe featured={portf.featured} iam={portf.iam} resume={portf.resume} />
                <AboutMe myname={portf.myname} slug={portf.slug} mytitle={portf.mytitle} myheadline={portf.myheadline} myphoto={portf.myphoto} othertitles={portf.othertitles}/>
                <SkillsMe skills={portf.myskills} />
                <EducationMe myeducation={portf.myeducation} />
                <WorkExperienceMe myworkexperience={portf.myworkexperience} />
                <PortfolioMe myprojects={portf.mycreativeportfolio}/>
            </section>
        </>
    )
}