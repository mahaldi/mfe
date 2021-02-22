import React, {lazy, Suspense, useEffect, useState} from 'react'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})
const DashboardLazy = lazy(() => import('./components/DashboardApp'))
const history = createBrowserHistory()

export default () => {
    const [isSignIn, setIsSignIn] = useState(false)
    useEffect(() => {
        if(isSignIn) history.push('/dashboard')
    }, [isSignIn])
    return (
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