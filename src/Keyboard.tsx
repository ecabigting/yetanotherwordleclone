import React from "react";
import { userStore } from "./store";
import { LetterState } from "./word-utils";

export default function Keyboard({onClick : onClickProp }: {onClick : (letter:string) => void})
{
    const keyboardLetterState = userStore((s) => s.keyboardLetterState);

    const onClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
        const letter = e.currentTarget.textContent;
        
        
        onClickProp(letter!);
    };

    return <div className="flex flex-col p-2">
        {KeyboardChars.map((keyCharRow,rIndex) => {
            return (
            <div key={rIndex} className="flex justify-center my-2 space-x-1.5">
                {
                    keyCharRow.map((key,i) => {
                        let styles="rounded font-bold uppercase py-2 flex-1";

                        const letterState = keyStateStyle[keyboardLetterState[key]];                        

                        if(key === ''){
                            styles += ' pointer-events-none'
                        }

                        if(letterState)
                        {
                            styles += `${letterState}`;
                        }else
                         if(key !== '') {
                            styles += ' bg-gray-400';
                        }

                        if(key === 'Enter' || key === 'Backspace')
                        {
                            styles += ' text-xs p-1';
                        }

                        return <button key={i} 
                        onClick={onClick}
                        className={styles}>{key}</button>
                    })
                }
            </div>)
        })}
    </div>;
}

const KeyboardChars = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ];

  const keyStateStyle = {
    //null : 'text-black border-gray-500',
    [LetterState.Miss] : ' bg-gray-500',
    [LetterState.Present] :' bg-yellow-500',
    [LetterState.Match] : ' bg-green-500',
  }