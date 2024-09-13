import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface MetadataProps {
  title?: string
  description?: string
  image?: string
  icons?: string
}

/* The T in this case is a generic
if we pass, for example, a string array, than this array will be an array
of strings and this T will be string

basically it allows us to have type safety in this function
*/

export function splitArray<T>(array: Array<T>, numParts: number) {
  /* We don't know yet what type is the T, but whatever kind, for example, we will use this on the phones, the phones
  is an array of strings, so the T will know be an array of strings, the same happens in other type cases.  */
  const result: Array<Array<T>> = []
  /* Here we are creating a multidimensional array, where the first Array are the columns and the Array inside is the
  rows */

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts

    if (!result[index]) {
      result[index] = []
    }

    result[index].push(array[i])
  }

  return result
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(price)
}

/*   In this case below, where i set the type of the parameters as MetadataProps = {}, is because by adding that to the
 parameter, we ensure that if the function is called without any arguments, it defaults to an empty object, thus allowing
 the destructuring to work and the default values to be applied */

export function constructMetadata({
  title = 'CaseCobra - Custom high-quality phonecases',
  description = 'Create custom high quality phone cases in seconds',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
}: MetadataProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@tiops',
    },
    icons,
  }
}
