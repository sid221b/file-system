import React, { useState } from 'react'
import initialData from '../utils/initialData'
import FileList from './FileList';

function File() {
  const [files, setFiles] = useState(initialData)
  const [inputVal, setInputVal] = useState('')

  const onExpandClick = (path) => {
    const newFilesList = [...files]
    let nextFiles = newFilesList
    path?.forEach((curPath) => {
      if(Array.isArray(nextFiles)) {
        nextFiles = nextFiles[nextFiles.findIndex(itm => itm.name === curPath)]
      } else if(nextFiles?.files?.length > 0) {
        nextFiles = nextFiles?.files?.[nextFiles?.files?.findIndex?.(itm => itm.name === curPath)]
      }
    })
    nextFiles.isOpen = !nextFiles.isOpen
    setFiles(newFilesList)
  }

  const onFileDblClick = (path) => {
    const newFilesList = [...files]
    let nextFiles = newFilesList
    path?.forEach((curPath) => {
      if(Array.isArray(nextFiles)) {
        nextFiles = nextFiles[nextFiles.findIndex(itm => itm.name === curPath)]
      } else if(nextFiles?.files?.length > 0) {
        nextFiles = nextFiles?.files?.[nextFiles?.files?.findIndex?.(itm => itm.name === curPath)]
      }
    })
    nextFiles.isOpen = false
    nextFiles.files = []
    setFiles(newFilesList)
  }

  const onAddFile = (path) => {
    if(!inputVal) {
      alert('Please enter a file name in the input box')
      return
    }
    const newFilesList = [...files]
    let nextFiles = newFilesList
    path?.forEach((curPath) => {
      if(Array.isArray(nextFiles)) {
        nextFiles = nextFiles[nextFiles.findIndex(itm => itm.name === curPath)]
      } else if(nextFiles?.files?.length > 0) {
        nextFiles = nextFiles?.files?.[nextFiles?.files?.findIndex?.(itm => itm.name === curPath)]
      }
    })
    if(Array.isArray(nextFiles)) {
      nextFiles.push({name: inputVal})
    } else {
      nextFiles.files = [...nextFiles.files, {name: inputVal}]
    }
    setFiles(newFilesList)
    setInputVal('')
  }

  return (
    <div className='layout-row justify-content-between'>
        <ul data-testid="files">
           <FileList files={files} onExpand={onExpandClick} makeDir={onFileDblClick} onAddFile={onAddFile} />
        </ul>
        <input data-testid="input-box" className='mt-15 mr-35 w-15' style={{borderColor: "black"}} type="text" placeholder='Enter an item' value={inputVal} onChange={e => setInputVal(e.target.value)} />
    </div>
  )
}

export default File