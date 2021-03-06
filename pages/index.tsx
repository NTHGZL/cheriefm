import { useEffect, useState } from 'react'


export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>()
  const [isOpen, setOpen] = useState(true)
  const [isClosed, setClosed] = useState(false)
  const [isMozilla, setIsMozila] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [isPwa, setIsPwa] = useState(false)
  useEffect(()=> {
    setAudio(new Audio('https://scdn.nrjaudio.fm/adwz2/fr/30201/mp3_128.mp3?origine=fluxradios'))
    setIsMozila(navigator.userAgent.includes('Mozilla'))

    // set the isPwa state to true if the user is on a PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPwa(true)
    }

    console.log(navigator.appCodeName)
    if("serviceWorker" in navigator) {
      console.log('coucou sw')
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
        <div className='player-container' onClick={()=>{
          // play distant audio with link
          

          if (isPlaying) {
            audio!.pause()
            setIsPlaying(false)
          } else {
            audio!.play()
            setIsPlaying(true)
          }


          
        }}>
          <div className='player-icon-background'>
            <img src={isPlaying ? 'pause.png' : '/icon-play.svg'} />
          </div>
          Le direct
        </div>
        <div className='search-logo'>
          <img src="icon-user.svg" width={'30px'}/>
        </div>
        </div>
      </div>
      <div className='body' style={{filter: isOpen && !isPwa ? 'blur(10px)': ''}}>
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
              ??couter
            </button>
          </div>
        </div>
        <div className='current'>
          <h2>
            Prochaines ??missions
            <div className='curveBorder'></div>
          </h2>
          <div className='talks'>
            <div className='img-talks-div'>
              <img src='/emission 1.png'/>
            </div>
            <div className='talk-name'>
              Star Ch??rie
            </div>
            <div className='progress-container'>
              <div className='progress'>
              </div>
            </div>
            <div className=''>
              Fin dans 37 min
            </div>
            <button className='share-button'>
              <div className='bell-icon'>
                <img src='/icon-bell.svg'/>
              </div>
              Me pr??venir
            </button>
          </div>
        </div>
        <nav>
          <div className='nav-item'>
            <img src='icon-home.svg' width={'30px'}/>
            <div className='nav-item-text'>
              Accueil
            </div> 
          </div>
          <div className='nav-item'>
            <img src='icon-book.svg' width={'30px'}/>
            <div className='nav-item-text'>
              Biblioth??que
            </div>
          </div>
          <div className='nav-item'>
            <img src='/icon-search.svg' width={'30px'}/>
            <div className='nav-item-text'>
              Rechercher
            </div> 
          </div>
          <div className='nav-item'>
            <img src='/icon-tchat.svg' width={'30px'}/>
            <div className='nav-item-text'>
              Tchat
            </div>
          </div>

        </nav>
      </div>
      {isOpen && !isPwa ? (
          <div className='banner-add'>
            
            <div className='banner-add-text'>
            <div className='close-banner' onClick={()=>{setOpen(false)}}>
              Fermer
            </div>
            Pour une meilleure exp??rience de navigation, nous vous conseillons d'installer l'application.
            </div>
          <button className='add-icon-button' onClick={ async(e)=> {
            
            if (deferredPrompt !== undefined) {
               deferredPrompt!.prompt();
               const { outcome } = await deferredPrompt.userChoice;
               if (outcome === 'accepted') {
                  setOpen(false)
                   setDeferredPrompt(null);
               }
          }
          }}>
            <img className='add-icon' src='/install-icon.png' /> Installer
          </button>
          </div>
        ) : ''}
    </>
  )
}
