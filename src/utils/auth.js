import { Cookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

// set up cookies
const cookies = new Cookies()

export const handleAuthSSR = async () => {
    const router = useRouter()

    const token = cookies.get('token');
    console.log(token)

    const redirectOnError = () => {
        router.push('/logout');
    }

    if (!token) {
        return redirectOnError()
    }
    return {}
}

export const handleLogin = async ({ token }) => {
    // Cookie will expire after 24h
    cookies.set('token', token, { maxAge: 60 * 60 * 24 })
}

export const handleLogout = () => {
    cookies.remove('token')
}
