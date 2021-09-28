import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound: NextPage = () => {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 3000)
  },[router])

  return (
    <div>
      <h1>ooops... page not found</h1>
    </div>
  )
}

export default NotFound;