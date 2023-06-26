import { gql } from '@apollo/client';



export const services = gql`query{
  Services{
    docs{
      id
      name
      description
      slug
      type
      image{
        sizes{
          card{
           width
           height
           url
          }
        }
        url
      }
      plans{
        id
        price
      }
    }
  }
}`

export const home = gql`query{
  Homes{
    docs{
      headline
      subheadline
      image{
        url
      }
      howitworks{
        title
        description
      }
      features{
        title
        description
      }
      Faq{
        question
        answer
      }
    }
  }
}`


export const SingleService = gql`query GetServices($slug: String!) {
    Services(where: { slug: { equals: $slug } }) {
      docs {
        id
        name
        description
        type
        route
        categories{
          name
          slug
        }
        slug
        image {
          sizes {
            card {
              width
              height
              url
            }
          }
          url
        }
        plans {
          id
          name
          price
          type
          details{
          Details
        }
        }
      }
    }
  }`

export const blogPost = gql`query GetPost($slug: String!) {
    Blogs(where: { slug: { equals: $slug } }) {
      docs {
      updatedAt
      title
      content
      slug 
      createdBy{
        firstName
        lastName
        aboutme
        profilephoto{
         sizes{
          profile{
            width
            height
            url
          }
        }
        }
        email
        id
      }
      image{
        url
        sizes{
          feature{
            url
          }
        }
      }
      }
      }
    }`

export const billing = gql`
  query GetBilling($userid: String!) {
    Projects(where: { createdBy: { id: { equals: $userid } } }) {
      docs {
        id
        service
        price
        amountpayed
        plan
        paymentstatus
        status
        type
        createdBy {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const profiles = gql`
   query {
    Portfolios {
      docs {
        myheadline
        myname
        slug
        myaccount{
          profilephoto{
            sizes{
              profile{
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const portfolio = gql`
    query GetPortfolio($username: String!) {
    Portfolios(where: { slug: { equals: $username } }){
      docs {
        myheadline
        iam{
          Skills
        }
        resume{
          url
        }
        myname
        mytitle
        slug
        othertitles{
          title
          description
          titleimage{
            sizes{
              card{
                url
                width
                height
              }
            }
          }
        }
        myskills{
          myskilltitle
          myskilldesc
          date
          myskillimage{
            sizes{
              faviconx64{
                url
                width
                height
              }
            }
          }
        }
        myeducation{
          myschool
          startdate
          enddate
          myschooldesc
        }
        myworkexperience{
          myworktitle
          startdate
          enddate
          myworkexperiencedesc
        }
        mycreativeportfolio{
          myportfoliotype
          portfolioimage{
            sizes{
              card{
                url
                width
                height
              }
            }
          }
          portfoliotitle
          portfoliodesc
          
        }
        
        myphoto{
         url
         width
         height
        }
        featured{
          url
          width
          height
          sizes{
            feature{
              url
              width
              height
            }
            card{
              url
              width
              height
            }
          }
        }
        myaccount{
          profilephoto{
            sizes{
              profile{
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
