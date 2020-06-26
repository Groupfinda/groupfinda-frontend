import {
  GET_PRESIGNED_URL,
  GetPresignedUrlData,
  GetPresignedUrlVariables,
} from "../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

type ToUploadType = (key: string, uri: string) => Promise<void>;

type UseImageUploadType = () => ToUploadType;

export const useImageUpload: UseImageUploadType = () => {
  const [getPresigned] = useMutation<
    GetPresignedUrlData,
    GetPresignedUrlVariables
  >(GET_PRESIGNED_URL);

  /**
   *
   * @param key the url on aws s3 in form `/user/userID/${key}`
   * @param uri the uri pointing to the image on device (from image picker)
   */
  const toUpload: ToUploadType = async (key, uri) => {
    const result = await getPresigned({ variables: { key } });
    if (result.data) {
      const presignedUrl = result.data?.getPresignedURL;

      const formData = new FormData();
      Object.keys(presignedUrl?.fields).forEach((field) => {
        formData.append(field, presignedUrl.fields[field]);
      });

      const urisplit = uri.split(".");
      const ext = urisplit[-1];
      //@ts-ignore
      formData.append("file", { uri: uri, type: `image/${ext}` });

      try {
        await fetch(presignedUrl.url, {
          method: "POST",
          body: formData,
        });
      } catch (err) {
        console.log(err);
        alert("Failed to upload image");
      }
    } else {
      alert("Error uploading");
    }
  };

  return toUpload;
};
