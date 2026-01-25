import Bounded from "@/components/Bounded";
import { RichText } from "@/components/RichText";

const Text = ({ slice }) => {
  return (
    <Bounded as="section">
      {slice.primary.text && (
        <div className="font-serif leading-relaxed md:text-xl md:leading-relaxed">
          <RichText content={slice.primary.text} />
        </div>
      )}
    </Bounded>
  );
};

export default Text;
