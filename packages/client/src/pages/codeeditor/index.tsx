import React , {useEffect, useRef} from 'react'
import * as monaco from 'monaco-editor'


const codeEditor=()=>{
    const divEl=useRef<HTMLDivElement>(null)
    let editor:monaco.editor.IStandaloneCodeEditor
    useEffect(() => {
        if(divEl.current){
            editor=monaco.editor.create(divEl.current,{
                value:['This is the Typescript written here',"This is the second line of hte code here"].join('\n'),
                language:'typescript',
                dimension:{
                    width:1200,
                    height:"90vh",
                },
            })

            editor.


        }
        return () => {
            editor.dispose()
        }
    }, [])    

    return <div className="Editor" ref={divEl}> hasdfasdfasdfasdfasdf</div>
}

export default codeEditor


