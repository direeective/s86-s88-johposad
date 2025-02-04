import Banner from '../components/Banner.js';
import Highlights from '../components/Highlights';
import FeaturedPost from '../components/FeaturedPost.js';


export default function Home(){
	const data = {
        title: "App Building - MTE",
        content: "Blog Webpage using React",
    }

    return (
        <>
            <Banner data={data}/>
            <FeaturedPost/>
            <Highlights />
        </>
    )
}