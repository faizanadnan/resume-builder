import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Preload critical resources */}
                <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />

                {/* Critical CSS for above-the-fold content */}
                <style jsx global>{`
          :root {
            --color-neon-blue: #00ffff;
            --color-neon-pink: #ff00ff;
            --color-neon-green: #00ff00;
            --color-cyber-dark: #0a0a1a;
            --color-cyber-medium: #1a1a2e;
            --color-cyber-light: #16213e;
          }
          
          * {
            box-sizing: border-box;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: var(--color-cyber-dark);
            color: #ffffff;
            overflow-x: hidden;
          }
          
          /* Loading animation */
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(0, 255, 255, 0.1);
            border-left: 4px solid var(--color-neon-blue);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Smooth transitions */
          a, button {
            transition: all 0.3s ease;
          }
          
          /* Focus states for accessibility */
          button:focus,
          input:focus,
          textarea:focus,
          select:focus {
            outline: 2px solid var(--color-neon-blue);
            outline-offset: 2px;
          }
        `}</style>
            </Head>
            <body>
            {/* Loading screen */}
            <div id="loading-screen" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                transition: 'opacity 0.5s ease-out, visibility 0.5s ease-out'
            }}>
                <div className="loading-spinner"></div>
                <p style={{
                    color: '#00ffff',
                    marginTop: '20px',
                    fontSize: '18px',
                    textShadow: '0 0 10px #00ffff'
                }}>
                    Initializing Resume Builder...
                </p>
            </div>

            <Main />
            <NextScript />

            {/* Loading script */}
            <script dangerouslySetInnerHTML={{
                __html: `
            window.addEventListener('load', function() {
              const loadingScreen = document.getElementById('loading-screen');
              if (loadingScreen) {
                setTimeout(() => {
                  loadingScreen.style.opacity = '0';
                  loadingScreen.style.visibility = 'hidden';
                  setTimeout(() => {
                    loadingScreen.remove();
                  }, 500);
                }, 500);
              }
            });
            
            // Prevent flash of unstyled content
            document.documentElement.style.visibility = 'visible';
          `
            }} />
            </body>
        </Html>
    )
}