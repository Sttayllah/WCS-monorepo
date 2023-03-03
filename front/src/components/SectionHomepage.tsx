import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

type tableHeader = { [key: string]: string | undefined } | string[];

const SectionHomePage = ({
  title,
  tableHeader,
  tableContent,
  isTags = false,
  isCategory = false,
}: {
  title: string;
  tableHeader: tableHeader;
  tableContent: tableHeader[] | string[];
  isTags?: boolean;
  isCategory?: boolean;
}) => {
  // turn an object into an array
  const formatedTableHeader = useMemo(() => {
    if (tableHeader instanceof Array) {
      return tableHeader;
    }
    const tmp: (string | undefined)[] = [];
    for (const key in tableHeader) {
      if (key !== undefined) {
        tmp.push(tableHeader[key]);
      }
    }
    return tmp;
  }, [tableHeader]);

  const formatedTableContent = useMemo(() => {
    let tmp: (string | undefined)[] = [];
    const formatedContent = tableContent.map((content) => {
      if (content instanceof Array) {
        return content;
      }
      tmp = [];
      if (content instanceof Object) {
        for (const key in content) {
          tmp.push(content[key]);
        }
      }
      return tmp;
    });
    return formatedContent;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const returnFormatedWidth = (arr: (string | undefined)[]) => {
    return `w-1/${arr.length}`.toString();
  };

  return (
    <>
      <h2 className="text-2xl">{title}</h2>
      <div className="h-96 overflow-y-scroll w-full m-auto rounded shadow-sectionHomePage">
        <div className="border-2 border-ronniecolman h-10 flex items-center">
          {formatedTableHeader.map((header, i) => (
            <div
              key={header}
              className={twMerge(returnFormatedWidth(formatedTableHeader), !i ? 'ml-2' : '')}
            >
              <span>{header}</span>
            </div>
          ))}
        </div>
        {formatedTableContent.map((contentArray) => (
          <div
            key={Math.random().toString()}
            className={twMerge(
              ' flex flex-wrap items-center min-h-10',
              !isTags && !isCategory ? 'cursor-pointer border border-ronniecolman' : '',
            )}
          >
            {contentArray.map((content, index) => (
              <div
                key={content + Math.random().toString()}
                className={twMerge(returnFormatedWidth(contentArray))}
              >
                {content && content.match(/.gif$/g) ? (
                  <img src={content} alt="Ronnie pumpin iron" />
                ) : (
                  <span
                    className={twMerge(
                      isTags
                        ? 'inline-block bg-yeahbuddy p-2 border border-ronniecolman rounded m-1 cursor-pointer'
                        : '',
                      isCategory
                        ? 'inline-block bg-mediumweight p-2 border border-ronniecolman rounded m-1 cursor-pointer'
                        : '',
                      !index ? 'ml-2' : '',
                    )}
                  >
                    {content}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionHomePage;
