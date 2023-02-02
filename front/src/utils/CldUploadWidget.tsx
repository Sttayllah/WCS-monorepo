import { gql, useMutation } from '@apollo/client';

const ADD_PHOTOS = gql`
  mutation addImage($email: String!, $imageUrl: String!) {
    addImage(email: $email, imageUrl: $imageUrl) {
      id
      url
    }
  }
`;

const CldUploadWidget = ({ email }: { email: string }) => {
  const cloudName = 'dvsg7r2hx';
  const uploadPreset = 'yeahbuddy';

  const [addImage] = useMutation(ADD_PHOTOS);

  const uploadWidget = window.cloudinary.createUploadWidget(
    {
      cloudName,
      uploadPreset,
    },
    (error: Error, result: any) => {
      if (!error && result && result.event === 'success') {
        addImage({ variables: { email, imageUrl: result.info.public_id } });
      }
    },
  );

  return (
    <button
      className="bg-yeahbuddy p-2 rounded text-white my-5"
      onClick={() => uploadWidget.open()}
    >
      Upload a Photo
    </button>
  );
};

export default CldUploadWidget;
