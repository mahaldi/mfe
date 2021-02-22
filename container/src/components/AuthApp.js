import { mount } from 'auth/AuthApp'
import React, {useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom'
export default ({onSignIn}) => {
    const ref = useRef(null)
    const history = useHistory()
    useEffect(() => {
        const { onParentNavigation }= mount(ref.current, {
            initialPath: history.location.pathname,
            onParentNavigation: ({pathname: nextPathname}) => {
                const {pathname} = history.location

                if(pathname !== nextPathname) {
                    history.push(nextPathname)
                }
            },
            onSignIn: () => {
                onSignIn()
            }
        })
        if(onParentNavigation)
        history.listen(onParentNavigation)
    }, [])

    return <div ref={ref}/>
}