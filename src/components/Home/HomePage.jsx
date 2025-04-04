import HeroSection from "./HeroSection";
import iPhone from "../../assets/iPhone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeatureProducts";
export default function HomePage() {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 pro"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="product/67ddc1c1466447fbc2d8a283"
        image={iPhone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini"
        link="product/67ddc1c1466447fbc2d8a28b"
        image={mac}
      />
    </div>
  );
}
