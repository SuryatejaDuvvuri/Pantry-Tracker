import Image from "next/image";
import styles from "./page.module.css";
// import { useState, useEffect } from 'react'
// import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
// import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
          <h1>Pantry tracker</h1>
      </div>
      <div>
            <form>
              <input type= "text" name = "searchBar" id="search" placeholder = "Enter Item"/>
            </form>
      </div>

    </main>
  );
}
