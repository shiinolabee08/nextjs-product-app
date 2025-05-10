import ImageSelector from '@/components/shared/ImageSelector'
import Image from 'next/image'

interface ProductImagePickerProps {
  onSelectedImage: (imageUrl: string) => void;
  selectedImage: string | undefined;
}

export default function ProductImagePicker({ onSelectedImage, selectedImage }: ProductImagePickerProps) {

  return (
    <div className="max-w-3xl mx-auto">
      <ImageSelector
        apiUrl="https://picsum.photos/v2/list?limit=100"
        selectedUrl={selectedImage}
        onSelect={(url) => onSelectedImage(url)}
      />

      {selectedImage && (
        <div className="mt-6">
          <h2 className="text-sm text-gray-700">Selected Image:</h2>
          <Image 
            src={selectedImage}
            loading='lazy'
            width={170}
            height={120}
            alt="Selected"
            className="mt-2 object-contain" />
        </div>
      )}
    </div>
  );
}
