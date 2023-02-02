import { AdvancedImage } from '@cloudinary/react';
import CldUploadWidget from '../utils/CldUploadWidget';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export const GET_PHOTOS = gql`
  query Query($email: String!) {
    getOne(email: $email) {
      images {
        url
      }
    }
  }
`;

const PhotosManager = ({ email }: { email: string }) => {
  const [photos, setPhotos] = useState<any[]>([]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dvsg7r2hx',
    },
  });

  const [getPhotos] = useLazyQuery(GET_PHOTOS, { variables: { email } });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPhotos();
      const _photos = result.data.getOne.images
        .reduce((acc: any, curr: any) => {
          return [...acc, curr.url];
        }, [])
        .map((p: any, i: number) => {
          const cldPhoto = cld.image(p);
          cldPhoto.resize(fill().width(150).height(150));
          console.log(cldPhoto);
          return cldPhoto;
        });
      setPhotos(_photos);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="">
        <h1 className="text-center text-3xl text-ronniecolman underline">Photos Manager</h1>
        <CldUploadWidget email={email} />
        <div className="p-2 overflow-y-scroll flex flex-wrap max-h-[50vh] bg-neutral-200 gap-2">
          {!!photos.length && photos.map((p, i) => <AdvancedImage key={p.publicID} cldImg={p} />)}
          {!!photos.length && photos.map((p, i) => <AdvancedImage key={p.publicID} cldImg={p} />)}
          {!!photos.length && photos.map((p, i) => <AdvancedImage key={p.publicID} cldImg={p} />)}
          {!!photos.length && photos.map((p, i) => <AdvancedImage key={p.publicID} cldImg={p} />)}
          {!!photos.length && photos.map((p, i) => <AdvancedImage key={p.publicID} cldImg={p} />)}
          {!!photos.length && photos.map((p, i) => <AdvancedImage key={p.publicID} cldImg={p} />)}
        </div>
      </div>
    </div>
  );
};

export default PhotosManager;
