import { SelectedTool } from '../components/SimpleToolPicker';
import * as icons from 'react-bootstrap-icons';

export interface ToolIconProperties {
  name: keyof typeof icons;
  title: string;
  style: string;
  content: JSX.Element;
  type: string;
  cursor?: string;
  position?: number[];
}
export const getToolIconProperties = (tool: SelectedTool): ToolIconProperties => {
  switch (tool) {
    case SelectedTool.BUTTON:
      return {
        name: 'PlusSquareFill',
        title: 'Bouton',
        type: 'button',
        content: (
          <div
            id="b1"
            draggable="true"
            onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
              event.dataTransfer.setData('text', event.currentTarget.id);
              event.dataTransfer.effectAllowed = 'copyMove';
            }}
          >
            <button className="bg-yeahbuddy p-2 rounded text-white my-5">CECI EST UN BOUTON</button>
          </div>
        ),

        style: 'arrow',
        position: [32, 16],
      };
    case SelectedTool.ICON:
      return {
        name: 'EmojiSmileFill',
        title: 'Icone',
        content: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="currentColor"
            className="bi bi-emoji-sunglasses-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.22 4.22 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A2.99 2.99 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM4.969 9.75A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .866-.5z" />
          </svg>
        ),
        type: 'icon',
        style: 'pencil',
        position: [0, 24],
      };
    case SelectedTool.IMAGE:
      return {
        name: 'Image',
        title: 'Image',
        type: 'image',
        content: <img src="https://picsum.photos/500" alt="osef" />,
        style: 'marker',
        position: [10, 10],
      };
    case SelectedTool.LABEL:
      return {
        name: 'Bookmark',
        title: 'Titre',
        content: (
          <div
            id="l1"
            draggable="true"
            onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
              event.dataTransfer.setData('text', event.currentTarget.id);
            }}
          >
            LABEL
          </div>
        ),
        type: 'label',
        style: 'brush',
        position: [0, 24],
      };
    case SelectedTool.PARAGRAPH:
      return {
        name: 'TextParagraph',
        title: 'Paragraphe',
        type: 'paragraph',
        content: (
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore ab voluptatibus
            aliquid distinctio tempora voluptates consequatur, ratione aut similique, blanditiis
            numquam doloribus, culpa voluptate eos. Aperiam ipsum sint qui earum! Assumenda
          </p>
        ),
        cursor: 'crosshair',
        style: 'eraserIcon',
        position: [0, 16],
      };
    // case SelectedTool.EDIT:
    //   return {
    //     name: 'ArrowsMove',
    //     title: 'Sélectionner / déplacer',
    //     type: 'edit',

    //     cursor: 'move',
    //     style: 'edit',
    //     position: [12, 12],
    //   };
    case SelectedTool.SEPARATOR:
      return {
        name: 'ArrowsCollapse',
        title: 'Séparateur',
        content: <div>________________________________</div>,
        type: 'separator',
        style: 'circle',
        position: [12, 12],
      };
    case SelectedTool.VIDEO:
      return {
        name: 'Youtube',
        title: 'Vidéo',
        content: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/FJRMldSmy-M"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        type: 'video',
        style: 'dash',
        position: [0, 16],
      };
    case SelectedTool.INTERN_SECTION:
      return {
        name: 'CardText',
        title: 'Section interne',
        content: <div>UNE SECTION INTERNE</div>,
        type: 'internSection',
        style: 'square',
      };
    case SelectedTool.TEXT:
      return {
        name: 'Fonts',
        title: 'Texte',
        content: <div>UN TEXTE</div>,
        type: 'text',
        style: 'fonts',
        position: [16, 16],
      };

    // case SelectedTool.DELETE_ALL:
    //   return {
    //     name: 'Trash',
    //     title: 'Tout effacer',
    //     type: 'edit',
    //     cursor: 'move',
    //     style: 'trash',
    //     position: [0, 0],
    //   };
    // case SelectedTool.NONE:
    //   return {
    //     name: 'XCircle',
    //     title: 'Aucun',
    //     cursor: 'no-drop',
    //     style: 'none',
    //   };
    // case SelectedTool.BACKGROUND_COLOR:
    //   return {
    //     name: 'PaletteFill',
    //     title: 'Couleur de fond',
    //     type: 'edit',
    //     cursor: 'no-drop',
    //     style: 'none',
    //   };

    default:
      return { name: 'DashCircle', title: '', type: '', style: '', content: <div>R</div> };
  }
};
