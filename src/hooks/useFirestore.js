import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt', 'desc') // newest first
      .onSnapshot((snap) => {
        let documents = []
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id })
        })
        setDocs(documents)
      })

    return () => unsub()
    // unsubscribes from collection when we no longer use it
  }, [collection])

  return { docs }
}

export default useFirestore
