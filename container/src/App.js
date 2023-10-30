import React, {lazy, Suspense, useEffect, useState} from 'react'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

/* 
    createGenerateClassName :
    untuk prevent syling collision, jadi saat service 1 dan service 2 memiliki class css yg sama, dan ketika berpindah dari service 1 ke service 2,
    maka masih ada styling dari service 1 yg ada ke apply juga ke service 2
    kelebihan menggunakan jss / styled-component
    https://cssinjs.org/performance/?v=v9.8.7
    https://cssinjs.org/?v=v10.10.0
*/
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})
const DashboardLazy = lazy(() => import('./components/DashboardApp'))
const history = createBrowserHistory()

export default () => {
    console.log('app init')
    const [isSignIn, setIsSignIn] = useState(false)
    useEffect(() => {
        if(isSignIn) history.push('/dashboard')
    }, [isSignIn])

    const [offline, setOffline] = useState(false);
    useEffect(() => {
        console.log('navigator', navigator)
      if(!navigator.onLine) setOffline(true);
    }, []);
    return offline ? (
        <>
            <div>You are offline please connect to the internet</div>
            <button onClick={() => window.location.reload(true)}>Refresh</button>
        </>
    ) : (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignIn={isSignIn} onSignOut={() => setIsSignIn(false)}/>
                    <Suspense fallback={<div>loading...</div>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/">
                                <MarketingLazy onSignIn={() => setIsSignIn(true)} />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}