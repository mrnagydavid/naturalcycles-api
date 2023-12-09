import { getUserProfile } from '../gateways/firebase-gateway'

export default { run }

async function run(phone: string) {
  const userProfile = await getUserProfile(phone)

  if (!userProfile) {
    return { name: '', email: '' }
  }

  return {
    name: userProfile.name,
    email: userProfile.email,
  }
}
