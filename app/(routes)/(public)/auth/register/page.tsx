'use client'

import { useState } from 'react'
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { BrainCircuit } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useAuthStore } from '@/store/use-auth'

export default function Page() {
  const router = useRouter()
  const { register } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState("")
  const [password, setPassword] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await register(name, email, password)
      router.push('/onboarding') // Redirect to onboarding or dashboard
    } catch (error) {
      console.log(error)
      setError('Registration failed. Please try again.') 
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#000000] text-white items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-16 h-16 relative"
          >
            <BrainCircuit className="w-16 h-16 text-[#50E3C2]" />
            <div className="absolute inset-0 bg-[#50E3C2] rounded-full filter blur-xl opacity-50 animate-pulse" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold">Join AI Pulse</h2>
          <p className="mt-2 text-sm text-gray-400">
            Create an account to get personalized AI updates
          </p>
        </div>
        
        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:ring-[#50E3C2] focus:border-[#50E3C2]"
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:ring-[#50E3C2] focus:border-[#50E3C2]"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:ring-[#50E3C2] focus:border-[#50E3C2]"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            type='submit'
            disabled={isLoading}
            className="w-full bg-[#50E3C2] hover:bg-[#4FACFE] text-gray-900 font-bold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
              />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-400">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="font-medium text-[#50E3C2] hover:text-[#4FACFE] transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-medium text-[#50E3C2] hover:text-[#4FACFE] transition-colors">
            Privacy Policy
          </Link>
        </p>
        
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-[#50E3C2] hover:text-[#4FACFE] transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}