import { useContext, useMemo, useState } from 'react';
import userContext, { useUser } from '../contexts/UserContext';
import { User } from '../model/models';
import Dashboard from './Dashboard';
import PhotosManager from './PhotosManager';
import ProfileManager from './ProfileManager';
import MenuItem from './static/MenuItem';
import MenuItemLink from './static/MenuItemLink';
import MenuList from './static/MenuList';
import UserArticlePage from './UserArticlePage';

interface UserProfileProps {
  user?: User;
  editMode?: boolean;
  onChange?: (value: any) => void;
  onClickAvatar?: () => void;
}

export const Userprofile = (props: UserProfileProps) => {
  const currentUser = useContext(userContext).user;
  const [pseudo] = useState(currentUser.pseudo);
  const [description] = useState(currentUser.description);
  const articles = currentUser.articles;
  const [component, setComponent] = useState('Dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const [articleNumber, setArticleNumber] = useState(0);

  const selectedComponent = useMemo(() => {
    switch (component) {
      case 'Dashboard':
        return <Dashboard description={description || ''} pseudo={pseudo} />;
      case 'PhotosManager':
        return <PhotosManager email={currentUser.email} />;
      case 'ProfileManager':
        return <ProfileManager />;
      case 'Articles':
        return <UserArticlePage html={articles[articleNumber].content} />;
      default:
        return <Dashboard description={description || ''} pseudo={pseudo} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component, articleNumber]);

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
          <MenuItemLink label="New article" />
          <MenuList
            label="Articles"
            items={articles || []}
            isActive={component === 'Articles'}
            isOpen={isOpen}
            component={component}
            articleNumber={articleNumber}
            setIsOpen={setIsOpen}
            setComponent={setComponent}
            setArticleNumber={setArticleNumber}
          />
        </div>
        {/* Right screen */}
        <div className="flex flex-col p-5 w-full">{selectedComponent}</div>
      </div>
    </>
  );
};
