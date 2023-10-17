import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import {createMemoryHistory, createBrowserHistory} from 'history'

const mount = (el, { onParentNavigation, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })
    if(onParentNavigation) history.listen(onParentNavigation)
    console.log('before render on mount marketing', App)
    ReactDom.render(
        <App history={history}/>,
        el
    )
    return {
        onParentNavigation: ({pathname: nextPathname}) => {
            const {pathname} = history.location
            
            if(pathname !== nextPathname) {
                history.push(nextPathname)
            }
        }
    }
}

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root')

    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}

export {mount}