import React from 'react';

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DisableScreen(props: Props) {
    const handleClick = () => {
        console.log("click on disable")
        props.setOpen(false);
    }
    return (
        <div>
            <div onClick={handleClick} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">

            </div>
            <div></div>
        </div>

    );
}
