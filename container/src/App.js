import React from 'react'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import {StylesProvider,  createGenerateClassName} from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default () => {
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <div>
                    <Header />
                    <MarketingApp />
                </div>
            </BrowserRouter>
        </StylesProvider>
    )
}