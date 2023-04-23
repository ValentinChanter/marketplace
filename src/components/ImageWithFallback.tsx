import Image, { ImageProps } from "next/image";
import { FC, useEffect, useState } from "react";

// import ImageProps type from nextjs and add customs props
type ImageFallbackProps = ImageProps & {
  fallback?: string;
  src: string;
  alt?: string;
  [x: string]: any;
};
/**
 * Use a custom Image component to add a fallback image.
 * When the link isn't good will take a fallback image with a generate image by the api
 *
 */
export const ImageWithFallback: FC<ImageFallbackProps> = ({
  fallback,
  alt,
  src,
  ...props
}) => {
  // to handle if the src is good
  const [error, setError] = useState(false);

  // Set by default an image with the media height and width if available.
  // fallback = `/api/img?h=${props["height"] ? props["height"] : "400"}&w=${
  //   props["w"] ? props["w"] : "400"
  // }`;
  fallback = `${location.origin}/api/img`;
  // useEffect(() => {
  //   if(!(/^(https?:\/\/|\/)\w+\.[^\s]+$|^\/[^\s]*$/.test(src))) {
  //     setError(true)
  //   }
  // }, [src]);
  const handleError = () => {
    console.log("e");
    setError(true)
  }

  useEffect(() => {
    console.log(error);
  }, [error])

  return new RegExp(/^(https?:\/\/|\/)\w+\.[^\s]+$|^\/[^\s]*$/).test(src) ? (
    <Image
      alt={alt}
      onError={handleError}
      src={error ? fallback : src}
      {...props}
      quality={100}
    />
  ) : (
    <Image alt={alt} src={fallback} {...props} />
  );
};
