import { mount } from 'auth/AuthApp'
import React, {useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom'
export default () => {
    const ref = useRef(null)
    const history = useHistory()
    useEffect(() => {
        const { onParentNavigation }= mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigation: ({pathname: nextPathname}) => {
                const {pathname} = history.location

                if(pathname !== nextPathname) {
                    history.push(nextPathname)
                }
            }
        })

        history.listen(onParentNavigation)
    }, [])

    return <div ref={ref}/>
}