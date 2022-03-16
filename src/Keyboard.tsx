export default function Keyboard()
{
    return <div className="flex flex-col">
        {KeyboardChars.map((keyCharRow,rIndex) => {
            return (
            <div key={rIndex} className="flex justify-center my-2 space-x-1.5">
                {
                    keyCharRow.map((key,i) => {
                        let styles="rounded font-bold uppercase py-2 flex-1";
                        if(key !== '') {
                            styles+=" bg-gray-400"
                        }
                        return <button key={i} className={styles}>{key}</button>
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