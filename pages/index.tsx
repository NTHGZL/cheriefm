import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>()

  useEffect(()=> {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
      
      // Update UI notify the user they can install the PWA
      // showInstallPromotion();
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }, [])
  return (
    <>
      <div className='header'>
        Cherie FM
      </div>
      <div className='body'>
        Coucou
        <div className='banner-add'>
        <button className='add-icon-button' onClick={ async(e)=> {
          
          if (deferredPrompt !== null) {
             deferredPrompt!.prompt();
             const { outcome } = await deferredPrompt.userChoice;
             if (outcome === 'accepted') {
                 setDeferredPrompt(null);
             }
        }
        }}>
          <img className='add-icon' src='/install-icon.png' /> Installer
        </button>
        </div>
        
      </div>
    </>
  )
}
