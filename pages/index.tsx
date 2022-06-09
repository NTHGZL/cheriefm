import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>()
  const [isIntalled, setInstalledStatus] = useState(false)
  const [isClosed, setClosed] = useState(false)
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
        <div className='left-bar'>
          <img src='/icon.png' width={'70px'} />
        </div>
        <div className='right-bar'>
        <div className='player-container'>
          <div className='player-icon-background'>
            <img src='/icon-play.svg' />
          </div>
          Le direct
        </div>
        <div className='search-logo'>
          <img src="icon-search.svg" width={'30px'}/>
        </div>
        </div>
      </div>
      <div className='body'>
        <div className='current'>
          <h2>
            En cours
            <div className='curveBorder'></div>
          </h2>
          <div className='talks'>
            <div className='img-talks-div'>
              <img src='/emission 1.png'/>
            </div>
            <div className='talk-name'>
              La matinale
            </div>
            <div className='progress-container'>
              <div className='progress'>
              </div>
            </div>
            <div className=''>
              Fin dans 37 min
            </div>
            <button className='listen-button'>
              Écouter
            </button>
          </div>
        </div>
        {!isIntalled ? (
          <div className='banner-add'>
          
          <button className='add-icon-button' onClick={ async(e)=> {
            
            if (deferredPrompt !== null) {
               deferredPrompt!.prompt();
               const { outcome } = await deferredPrompt.userChoice;
               if (outcome === 'accepted') {
                  setInstalledStatus(true)
                   setDeferredPrompt(null);
               }
          }
          }}>
            <img className='add-icon' src='/install-icon.png' /> Installer
          </button>
          </div>
        ) : ''}
        
        
      </div>
    </>
  )
}
