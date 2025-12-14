import { Outlet } from "react-router";
import Hero from "../../components/Hero";

function HomeLayout() {

    return (
        <>
            <Hero name="Tofu Gang" />
            <section className="max-w-6xl mx-auto px-6 my-8">
                <Outlet />
            </section>
        </>
    );
}

export default HomeLayout;
