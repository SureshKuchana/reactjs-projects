import {
  DocumentIcon,
  FolderIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

const nodes = [
  {
    name: 'Home',
    folders: [
      {
        name: 'Movies',
        folders: [
          {
            name: 'Action',
            folders: [
              {
                name: '2015s',
                folders: [{ name: 'Bahubali.mp4' }, { name: 'Bahubali 2.mp4' }],
              },
              { name: '2010s', folders: [{ name: 'Mugen Train.mp4' }] },
            ],
          },
          { name: 'Comedy', folders: [{ name: '2000s', folders: [] }] },
        ],
      },
      {
        name: 'Music',
        folders: [
          { name: 'Rock', folders: [] },
          { name: 'Classic', folders: [] },
        ],
      },
      {
        name: 'Pictures',
        folders: [
          { name: 'Suresh', folders: [] },
          { name: 'Dhoni', folders: [] },
        ],
      },
      {
        name: 'Videos',
        folders: [],
      },
      {
        name: 'Suresh.txt',
      },
    ],
  },
];

const FileExplorer = () => {
  return (
    <div className="p-2 mx-auto">
      <ul>
        {nodes.map((node) => (
          <FilesystemItem node={node} key={node.name} />
        ))}
      </ul>
    </div>
  );
};

function FilesystemItem({ node }) {
  let [isOpen, setOpen] = useState(false);
  return (
    <li className="my-1.5" key={node.name}>
      <span className="flex items-center gap-1.5">
        {node.folders && node.folders.length > 0 && (
          <ChevronRightIcon
            onClick={() => setOpen(!isOpen)}
            className={`size-4 text-gray-500 ${isOpen ? 'rotate-90' : ''}`}
          />
        )}

        {node.folders ? (
          <FolderIcon
            className={`size-6 text-sky-500 ${node.folders.length === 0 ? 'ml-[22px]' : ''}`}
          />
        ) : (
          <DocumentIcon className="ml-[22px] size-6 text-gray-900" />
        )}
        {node.name}
      </span>

      {isOpen && (
        <ul className="pl-6">
          {node.folders &&
            node.folders.map((node) => (
              <FilesystemItem node={node} key={node.name} />
            ))}
        </ul>
      )}
    </li>
  );
}

export default FileExplorer;
