"use client"

import { AlertTriangle, RefreshCw, Home, Bug, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ApiErrorPageProps {
  error: {
    message: string
    status?: number
    endpoint?: string
    timestamp: string
    details?: any
  }
  onRetry?: () => void
}

export default function ApiErrorPage({ error, onRetry }: ApiErrorPageProps) {
  const getErrorTitle = (status?: number) => {
    switch (status) {
      case 400:
        return "Bad Request"
      case 401:
        return "Unauthorized"
      case 403:
        return "Forbidden"
      case 404:
        return "Not Found"
      case 500:
        return "Server Error"
      case 502:
        return "Bad Gateway"
      case 503:
        return "Service Unavailable"
      default:
        return "Something went wrong"
    }
  }

  const getErrorDescription = (status?: number) => {
    switch (status) {
      case 400:
        return "The request was invalid. Please check your input and try again."
      case 401:
        return "You need to sign in to access this content."
      case 403:
        return "You don't have permission to access this resource."
      case 404:
        return "The requested resource could not be found."
      case 500:
        return "Our servers are experiencing issues. Please try again later."
      case 502:
        return "There's a problem with our gateway. Please try again in a moment."
      case 503:
        return "Our service is temporarily unavailable. Please try again later."
      default:
        return "We encountered an unexpected error. Our team has been notified."
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-card-foreground mb-2">{getErrorTitle(error.status)}</h1>

          {error.status && (
            <div className="text-sm text-muted-foreground mb-4 bg-muted px-3 py-1 rounded-full inline-block">
              Error {error.status}
            </div>
          )}

          <p className="text-muted-foreground mb-6 leading-relaxed">{getErrorDescription(error.status)}</p>

          <div className="space-y-3 mb-6">
            {onRetry && (
              <Button onClick={onRetry} className="w-full bg-brand-600 hover:bg-brand-700 text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}

            <Link href="/" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          {/* Error Details */}
          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-center text-xs text-muted-foreground mb-3">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(error.timestamp).toLocaleString()}
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground flex items-center justify-center mb-2">
                  <Bug className="h-3 w-3 mr-1" />
                  Technical Details (Development)
                </summary>
                <div className="mt-3 space-y-2 bg-muted p-4 rounded-lg">
                  {error.endpoint && (
                    <div className="text-xs">
                      <span className="font-medium text-foreground">Endpoint:</span>{" "}
                      <span className="text-muted-foreground font-mono">{error.endpoint}</span>
                    </div>
                  )}
                  <div className="text-xs">
                    <span className="font-medium text-foreground">Message:</span>{" "}
                    <span className="text-muted-foreground">{error.message}</span>
                  </div>
                  {error.details && (
                    <pre className="text-xs bg-background border border-border p-3 rounded overflow-auto max-h-32 text-foreground">
                      {JSON.stringify(error.details, null, 2)}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
