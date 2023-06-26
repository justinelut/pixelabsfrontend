import { useEffect } from "react"

const [scope, animate] = useAnimate()
const [isPresent, safeToRemove] = usePresence()

export default function Aninimations(){

useEffect(() => {
    if (isPresent) {
        const enterAnimation = async () => {
            await animate('img', { scale: 1.1, ease: "linear", duration: 2, repeat: Infinity })
        }
        enterAnimation()
    } else {
        const exitAnimation = async () => {
            await animate('img', { scale: 1.1, ease: "linear", duration: 2, repeat: Infinity })
            safeToRemove()
        }
        exitAnimation()
    }
})
}