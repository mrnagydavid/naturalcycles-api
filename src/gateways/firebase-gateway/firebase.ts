import admin from 'firebase-admin'

let app: admin.app.App | null = null

export default function getFirebaseInstance(): admin.app.App {
  if (!app) {
    app = admin.initializeApp()
  }

  return app
}
