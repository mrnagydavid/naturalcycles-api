import getFirebaseInstance from './firebase'

export const db = getFirebaseInstance().firestore()
export const auth = getFirebaseInstance().auth()

export async function validateToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token)
    const uid = decodedToken.uid
    const phone = decodedToken.firebase.identities.phone[0] as string
    return { uid, phone }
  } catch (error) {
    return null
  }
}

export async function getUserProfile(phone: string) {
  const snapshot = await db.collection('users').doc(phone).get()

  if (!snapshot.exists) {
    return null
  }

  return snapshot.data()
}

export async function setUserProfile(params: UserProfileParams) {
  const { phone, name, email } = params

  await db.collection('users').doc(phone).set(
    {
      name,
      email,
    },
    { merge: true },
  )

  return { name, email }
}

type UserProfileParams = {
  phone: string
  name: string
  email: string
}
