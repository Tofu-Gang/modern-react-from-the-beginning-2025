import type {Route} from "../../../.react-router/types/app/routes/home/+types";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "The Friendly Dev | BLog"},
        {name: "description", content: "Custom Website Development"},
    ];
}

function BlogPage() {
    return (
        <section>📝Blog</section>
    );
}

export default BlogPage;
