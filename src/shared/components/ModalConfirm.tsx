import './ModalConfirm.css'
import { createPortal } from "react-dom";

// Global State
import { useGlobalState } from "../utils/GlobalState";
import { InfoPost } from '../interfaces/IPost';
import { useState } from 'react';


type ModalConfirmProps = {
    options: {
        title: string
        description: string
        onConfirm: () => Promise<void>
        onCancel: () => void,
        postInfo: InfoPost
    }
}

export default function ModalConfirm({ options }: ModalConfirmProps) {
    const { isConfirming, setIsConfirming, setSomethingChanged, somethingChanged } = useGlobalState()
    const [_, setLoading] = useState<boolean>(false)

    const handleConfirm = async () => {
        setLoading(true)
        await options.onConfirm()
        setLoading(false)
        setSomethingChanged(!somethingChanged)
        setIsConfirming(false)
    }

    return createPortal(
        <div className={`modal-confirm ${isConfirming ? 'active' : ''}`} onClick={() => setIsConfirming(false)}>
            <div className='modal-confirm-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-confirm-title'>
                    <h1>{options.title}</h1>
                    <p>{options.description}</p>
                </div>

                <div className='modal-confirm-buttons'>
                    {
                        _ ? <div className='loading-spin'></div> :
                        <>
                            <button onClick={handleConfirm}>Delete</button>
                            <button onClick={() => setIsConfirming(false)}>Cancel</button>
                        </>
                    }
                </div>
            </div>
        </div>,
        document.getElementById('confirm-modal')!
    )
}