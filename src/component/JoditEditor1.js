import React,{useMemo,useRef,useState} from "react";
import JoditEditor from "jodit-react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
function JoditEditor1(){
    const editor = useRef(null);
  const [content, setContent] = useState("");
  const config ={
    useSearch: false,
    spellcheck: false,
    enter: "P",
    defaultMode: "1",
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: true,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    minHeight: 200,
    maxHeight: 500,
    minWidth: null,
    buttons:
        "paragraph,bold,strikethrough,underline,italic,|,ul,ol,|,|,font,fontsize,brush,|,align,undo,redo",
    placeHolder: "Whats Happpening",
    controls: {
        fontsize: {
            list: [
                "8",
                "9",
                "10",
                "11",
                "12",
                "14",
                "16",
                "18",
                "24",
                "30",
                "36",
                "48",
                "60",
                "72",
                "96",
                "100"
            ]
        },
        font: {
            command: "fontname",
            list: {
                "": "Default",
                "'Open Sans',sans-serif": "Open Sans",
                "Helvetica,sans-serif": "Helvetica",
                "Arial,Helvetica,sans-serif": "Arial",
                "Georgia,serif": "Georgia",
                "Impact,Charcoal,sans-serif": "Impact",
                "Tahoma,Geneva,sans-serif": "Tahoma",
                "'Times New Roman',Times,serif": "Times New Roman",
                "Verdana,Geneva,sans-serif": "Verdana"
            }
        }
    }
};
const submitTweet = async () => {
    if (content.length === 0) {
        toast.error("Tweet can not be empty");
        return;
    }
    if(content.length>146){
        toast.warning("Tweet character must be less than 146");
        return;
    }
    var value = JSON.parse(localStorage.getItem("data"));
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    await fetch(`/${value.userId}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tweet: content,
            dateAndTimeOfTweet: today.toISOString()
        })
    }).then((response) => {
        if (response.status === 200) {
            setContent("");
            toast.success("Tweet Posted successFully");
        } else {
            toast.error("Tweet Post failed Something went wrong")

        }
    }).catch((resp) => {
        toast.error("Something went wrong" + resp);
    });
}
  return (
    <div>
      {useMemo(
        () => (
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => {
              // setContent(newContent.target.innerHTML);
            }}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        ),[]
      )}
      <Button onClick={submitTweet} className="my-3">Post Tweet</Button>
    </div>
  );
}
export default JoditEditor1;