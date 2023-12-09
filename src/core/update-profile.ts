import { z } from 'zod'
import { setUserProfile } from '../gateways/firebase-gateway'
import validate from '../utils/validate'

export default { run }

async function run(params: any) {
  const { phone, name, email } = validate<UserProfileParams>(schema, params)

  const result = await setUserProfile({ phone, name, email })

  return result
}

const schema = z.object({
  phone: z
    .string({
      required_error: 'This field is required.',
      invalid_type_error: 'The phone number must be a string',
    })
    .trim(),
  name: z
    .string({
      required_error: 'This field is required.',
    })
    .trim()
    .min(1, { message: 'This field should be at least 1 character long.' })
    .max(255, {
      message: 'This field should not be longer than 255 characters.',
    }),
  email: z
    .string({
      required_error: 'This field is required.',
    })
    .trim()
    .min(1, { message: 'This field should be at least 1 character long.' })
    .max(255, {
      message: 'This field should not be longer than 255 characters.',
    })
    .email('Must be a valid email'),
})

type UserProfileParams = z.infer<typeof schema>
