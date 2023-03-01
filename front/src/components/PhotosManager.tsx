import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';

export const GET_PHOTOS = gql`
  query Query($email: String!) {
    getOne(email: $email) {
      images {
        id
        url
      }
    }
  }
`;

const ADD_PHOTOS = gql`
  mutation addImage($email: String!, $imageUrl: String!) {
    addImage(email: $email, imageUrl: $imageUrl) {
      id
      url
    }
  }
`;

export const DELETE_PHOTO = gql`
  mutation DeleteImage($deleteImageId: Float!) {
    deleteImage(id: $deleteImageId)
  }
`;

const PhotosManager = ({ email }: { email: string }) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const cloudName = 'dvsg7r2hx';
  const uploadPreset = 'yeahbuddy';

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dvsg7r2hx',
    },
  });

  const [getPhotos] = useLazyQuery(GET_PHOTOS, { variables: { email } });
  const [deletePhoto] = useMutation(DELETE_PHOTO);
  const [addImage] = useMutation(ADD_PHOTOS);

  const fetchData = async () => {
    const result = await getPhotos();
    const _photos = result.data.getOne.images
      .reduce((acc: any, curr: any) => {
        return [...acc, { id: curr.id, url: curr.url }];
      }, [])
      .map((p: { id: number; url: string }) => {
        const img = cld.image(p.url);
        img.resize(fill().width(150).height(150));
        return { id: p.id, photo: img };
      });
    console.log(_photos);
    setPhotos(_photos);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadWidget = window.cloudinary.createUploadWidget(
    {
      cloudName,
      uploadPreset,
    },
    async (error: Error, result: any) => {
      if (!error && result && result.event === 'success') {
        const res = await addImage({ variables: { email, imageUrl: result.info.public_id } });
        const _img = cld.image(res.data.addImage.url);
        _img.resize(fill().width(150).height(150));
        setPhotos([...photos, { id: res.data.addImage.id, photo: _img }]);
      }
    },
  );

  const handleDeletePhoto = (deleteImageId: number) => {
    const _photos = photos.filter((p) => p.id !== deleteImageId);
    setPhotos(_photos);
    deletePhoto({ variables: { deleteImageId } });
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <h1 className="text-center text-3xl text-ronniecolman underline">Photos Manager</h1>
        <button
          className="bg-yeahbuddy p-2 rounded text-white my-5"
          onClick={() => uploadWidget.open()}
        >
          Upload a Photo
        </button>
        <div className="p-2 overflow-y-scroll flex flex-wrap max-h-[50vh] bg-neutral-200 gap-2">
          {!!photos.length &&
            photos.map((p) => (
              <div className="relative" key={p.id}>
                <div
                  className="absolute top-1 right-1 cursor-pointer bg-red-600 rounded-full p-1"
                  onClick={() => handleDeletePhoto(p.id)}
                >
                  <ImCross className="h-2 w-2 text-white" />
                </div>

                <AdvancedImage cldImg={p.photo} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosManager;
