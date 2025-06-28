"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "access_denied":
        return "Access was denied. Please try signing in again."
      case "server_error":
        return "A server error occurred. Please try again later."
      case "temporarily_unavailable":
        return "The service is temporarily unavailable. Please try again later."
      default:
        return "An unexpected error occurred during authentication."
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Error</h1>

        <p className="text-gray-600 mb-6">{getErrorMessage(error)}</p>

        <div className="space-y-3">
          <Link href="/login" className="block">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Try Again</Button>
          </Link>

          <Link href="/" className="block">
            <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-900">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
