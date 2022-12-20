import { FileImageData } from '../model/models';

/**
 * Test if a string is null or undefined or ''.
 *
 * @param str
 */
export const isNullOrEmpty = (str: string | null | undefined): boolean => {
  return str == null || str === undefined || str === '';
};
const getImageUrl = async (file: any): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (_e) => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};

export const getImageFromFile = async (file: File): Promise<FileImageData> => {
  const url = await getImageUrl(file);
  const img = new Image();
  img.src = url;

  return new Promise<FileImageData>((resolve, reject) => {
    try {
      img.onload = () => {
        const result: FileImageData = {
          base64Data: img.src,
          width: img.width,
          height: img.height,
        };
        resolve(result);
      };
    } catch (e: any) {
      reject(e);
    }
  });
};
