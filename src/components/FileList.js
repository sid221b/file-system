import React, { memo } from 'react';

function FileData({onExpand, name, isExpandable, isOpen, makeDir}) {
    return (
      <>
        <li>
        <button
          onClick={onExpand}
          onDoubleClick={!isExpandable ? makeDir : () => {} }
        >
          {name}
          {isExpandable && <span>{isOpen ? '[-]' : '[+]'}</span>}
        </button>
      </li>
      </>
    );
  }

function FileList({files, onExpand, path, makeDir, onAddFile}) {
    return (
      <ul>{
        files.map((data, index) => {
          const isExpandable = Array.isArray(data?.files)
          const newPath = path ? [...path, data.name] : [data.name]
        return(
        <>
        <FileData name={data.name} onExpand={() => onExpand(newPath)} isExpandable={isExpandable} isOpen={data?.isOpen} makeDir={() => makeDir(newPath)} />
        {data?.isOpen && isExpandable && (
          <FileList files={data.files} onExpand={onExpand} path={newPath} onAddFile={onAddFile} makeDir={makeDir}  />
        )}
    </>
    )})
      }
      <li>
        <button onClick={() => onAddFile(path || [])}>+</button>
    </li>
      </ul>
  )
}

export default memo(FileList);