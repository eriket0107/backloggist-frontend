import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  placeholder?: string;
  alt: string;
  hasPlaceholder?: boolean;
}

export const Image = ({ src, placeholder, alt, hasPlaceholder = false, ...props }: LazyImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;

    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImgSrc(src);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  if (!src && hasPlaceholder) {
    return (<span className="flex h-14 w-[100px] items-center justify-center rounded-md bg-gray-200 text-gray-500">
      <ImageIcon className="h-6 w-6" />
    </span>)
  }

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
      {...props}
      onLoad={() => setIsLoaded(true)}
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s" }}
    />
  );
}

