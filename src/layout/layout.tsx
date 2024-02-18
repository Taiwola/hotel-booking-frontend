import React from "react";
import Header from "../component/Header";
import Footer from "../component/footer";
import Hero from "../component/hero";
import SearchBar from "../component/searchBar";


interface Props {
    children: React.ReactNode;
}
const Layout = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container mx-auto">
            <SearchBar />
            </div>
            <div className="container py-10 flex-1 mx-auto">
                {children}
            </div>
            <Footer />
        </div>
    )
}


export default Layout