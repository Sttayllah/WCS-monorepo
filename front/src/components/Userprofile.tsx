import { useContext, useMemo, useState } from 'react';
import userContext from '../contexts/UserContext';
import { Article, User } from '../model/models';
import Dashboard from './Dashboard';
import PhotosManager from './PhotosManager';
import ProfileManager from './ProfileManager';
import MenuItem from './static/MenuItem';
import MenuList from './static/MenuList';

interface UserProfileProps {
  user?: User;
  articles?: Article[];
  editMode?: boolean;
  onChange?: (value: any) => void;
  onClickAvatar?: () => void;
}

export const Userprofile = (props: UserProfileProps) => {
  const currentUser = useContext(userContext).user;
  const [pseudo] = useState(currentUser.pseudo);
  const [description] = useState(currentUser.description);
  const articles = props.articles && props.articles;
  const [component, setComponent] = useState('Dashboard');
  const [isOpen, setIsOpen] = useState(false);

  const selectedComponent = useMemo(() => {
    switch (component) {
      case 'Dashboard':
        return <Dashboard description={description || ''} pseudo={pseudo} />;
      case 'PhotosManager':
        return <PhotosManager email={currentUser.email} />;
      case 'ProfileManager':
        return <ProfileManager />;
      default:
        return <Dashboard description={description || ''} pseudo={pseudo} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  return (
    <>
      <div className="flex min-h-[70vh]">
        {/* Dashboard menu */}
        <div className="relative w-[250px] min-h-full bg-neutral-300">
          <MenuItem
            label="Dashboard"
            componentName="Dashboard"
            isActive={component === 'Dashboard'}
            setComponent={setComponent}
          />
          <MenuItem
            label="Photos Manager"
            componentName="PhotosManager"
            isActive={component === 'PhotosManager'}
            setComponent={setComponent}
          />
          <MenuItem
            label="Profile Manager"
            componentName="ProfileManager"
            isActive={component === 'ProfileManager'}
            setComponent={setComponent}
          />
          <MenuList
            label="Articles"
            items={articles || []}
            isActive={component === 'Articles'}
            isOpen={isOpen}
            component={component}
            setIsOpen={setIsOpen}
            setComponent={setComponent}
          />
        </div>
        {/* Right screen */}
        <div className="flex flex-col p-5 w-full">{selectedComponent}</div>
      </div>
    </>
  );
};
