
import React from 'react'
type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleAct: () => Promise<void>,
    message: string,
}
export default function ConfirmWindow(props: Props) {
    const handleAction = async (flag: boolean) => {
        console.log("delete")
        if (flag) {
            await props.handleAct();
        }
        props.setOpen(false);
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md space-y-10">
                <h2 className="text-lg font-semibold mb-4 text-center">{props.message}</h2>
                <div className="flex justify-between">
                    <button
                        onClick={() => handleAction(false)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleAction(true)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600  rounded-md text-white"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
