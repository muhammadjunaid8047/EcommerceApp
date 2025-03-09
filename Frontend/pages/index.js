import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

export default function Home({ products }) {
    return (
        <main>
            <HeroBanner />
            <Wrapper>
                {/* Heading and paragraph start */}
                <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        Best Clothes
                    </div>
                    <div className="text-md md:text-xl">
                        best clothes for you
                    </div>
                </div>
                {/* Heading and paragraph end */}

                {/* Products grid start */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                    {products?.data?.length > 0 ? (
                        products.data.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-lg text-gray-500">
                            No products available.
                        </p>
                    )}
                    {/* <ProductCard />
                    <ProductCard />
                    <ProductCard /> 
                    <ProductCard /> 
                    <ProductCard /> 
                    <ProductCard />  */}
                </div>
                {/* Products grid end */}
            </Wrapper>
        </main>
    );
}

export async function getStaticProps() {
    try {
        const products = await fetchDataFromApi("/api/products?populate=*");

        return {
            props: { products },
            revalidate: 10, // Re-fetch products every 10 seconds for Incremental Static Regeneration (ISR)
        };
    } catch (error) {
        console.error("Error fetching products:", error);

        return {
            props: { products: { data: [] } }, // Ensure empty state handling
        };
    }
}

