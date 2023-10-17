import {mount} from 'marketing/Marketing'
import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

export default () => {
    const ref = useRef(null)
    const history = useHistory()
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
          e.preventDefault();
          console.log("we are being triggered :D");
          setSupportsPWA(true);
          setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);
    
        return () => window.removeEventListener("transitionend", handler);
      }, []);

    useEffect(() => {
        console.log('ref.current', ref.current)
        console.log('ref', ref)
        console.log('mount', mount)
        const { onParentNavigation }= mount(ref.current, {
            initialPath: history.location.pathname,
            onParentNavigation: ({pathname: nextPathname}) => {
                const {pathname} = history.location

                if(pathname !== nextPathname) {
                    history.push(nextPathname)
                }
            }
        })
        if(onParentNavigation) {
            console.log('onParentNavigation', onParentNavigation)
            history.listen(onParentNavigation)
        }
    }, [])

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
          return;
        }
        promptInstall.prompt();
      };

    return(
        <div>
            test 5
            <div ref={ref}/>
            <SwipeableDrawer
                anchor='bottom'
                open={supportsPWA}
                onClose={() => setSupportsPWA(false)}
            >
                <div style={{padding: 30}}>
                    <Button style={{margin: 'auto', display: 'block'}} fullWidth variant="contained" color="primary" onClick={onClick}>Install PWA</Button>
                </div>
            </SwipeableDrawer>
        </div>
    )
}