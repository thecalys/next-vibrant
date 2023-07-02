import * as React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ColorExtractor from '~/components/ColorExtractor';

import styles from '~/styles/Home.module.css'

const Home: NextPage = () => {
  const [imageSrc, setImageSource] = React.useState('https://s.mxmcdn.net/images-storage/albums2/8/3/3/9/4/2/67249338_350_350.jpg');

  return (
    <div className={styles.container}>
      <Head>
        <title>Node Vibrant</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image alt={`"SOS" by SZA`} className={styles.image} width={350} height={350} src={imageSrc} />
        <ColorExtractor className={styles.image} />
      </main>

      <footer className={styles.footer}>
        <a
          href="/__repl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built on
          <span className={styles.logo}>
            <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
          </span>
          Replit
        </a>
      </footer>
    </div>
  )
}

export default Home
