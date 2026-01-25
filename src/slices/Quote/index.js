import Bounded from "@/components/Bounded";
import { RichText } from "@/components/RichText";

const Quote = ({ slice }) => {
  return (
    <Bounded as="section" size="wide">
      {slice.primary.quote && (
        <div className="font-serif text-3xl italic leading-relaxed">
          &ldquo;
          <RichText content={slice.primary.quote} />
          &rdquo;
          {slice.primary.source && (
            <> &mdash; {slice.primary.source}</>
          )}
        </div>
      )}
    </Bounded>
  );
};

export default Quote;
