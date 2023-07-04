import Navbar from "@/components/Navbar";
import Herosection from '@/components/Herosection'
import Howitworks from '@/components/Howitworks'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Faq from '@/components/Faq'
import Footer from '@/components/Footer'
import Content from '@/components/services/Content'
import Plans from '@/components/services/Plans'
import Checkout from '@/components/services/Checkout'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Notfound from '@/components/404/notfound'
import Featured from '@/components/Featured'
import { serverClient } from '@/components/graphql/serverProvider'
import Main from '@/components/Blog/Main'
import PostDetail from '@/components/Blog/Post'
import Contactus from '@/components/contact/Contact'
import Page from '@/components/Pages/Page'
import PageAnimations from '@/components/animations/PageAnimations'
import ComponentsAnimations, {featuredAnimations} from '@/components/animations/ComponentsAnimations'
import { BeatLoading, HashLoading } from '@/components/Loader'
import NoSearchResults from '@/components/404/noresults'


export { 
    serverClient, 
    Navbar, 
    Herosection, 
    Howitworks, 
    Features, 
    Pricing, 
    Faq, 
    Footer, 
    Content, 
    Plans, 
    Checkout, 
    Signup, 
    Login, 
    Notfound, 
    Featured,
    Main,
    PostDetail,
    Contactus,
    Page,
    PageAnimations,
    featuredAnimations,
    ComponentsAnimations,
    BeatLoading,
    HashLoading,
    NoSearchResults
 }