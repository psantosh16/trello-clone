"use client";

import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface FormPickerProps {
  id: string;
  errors?:  string[] | undefined;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          setImages(result.response as Array<Record<string, any>>);
        } else {
          console.error("Error fetching images", result);
          setImages(defaultImages);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images", error);
        setImages(defaultImages);
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="size-6 text-sky-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "relative cursor-pointer aspect-video group hover:opacity-75 transition bg-muted",
              pending && "cursor-auto opacity-50 hover:opacity-50"
            )}
            onClick={() => {
              if (pending) return;
              console.log("Image selected", image.id);
              setSelectedImage(image.id);
            }}
          >
            {selectedImage === image.id && (
              <div className="absolute inset-y-0 h-full w-full flex items-center justify-center bg-black/30">
                <Check className="size-6 text-white" />
              </div>
            )}
            <Input
              type="radio"
              name="image"
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              className="hidden"
              checked={selectedImage === image.id}
              readOnly
              disabled={pending}
            />
            <Image
              src={image.urls.thumb}
              alt={image.alt_description}
              height={100}
              width={100}
              className="w-full h-24 object-cover rounded-md"
            />
            <Link
              href={image.links.html}
              className="absolute bottom-0 flex justify-center items-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] text-white bg-black/50 hover:underline p-1 w-full"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      {errors && errors && (
        <div className="text-red-500 text-sm mt-1">{errors}</div>
      )}
    </div>
  );
};
