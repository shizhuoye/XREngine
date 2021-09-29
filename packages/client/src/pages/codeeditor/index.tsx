import React, { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

const codeEditor = () => {
  const divEl = useRef<HTMLDivElement>(null)
  let editor: monaco.editor.IStandaloneCodeEditor
  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: [
          "import { compose, curry, isFunction } from '../utils';",
          "import validators from '../validators';"
        ].join('\n'),
        language: 'typescript',
        dimension: {
          width: 1200,
          height: 1200
        }
      })
    }
    return () => {
      editor.dispose()
    }
  }, [])

  return <div className="Editor" ref={divEl} />
}

export default codeEditor
