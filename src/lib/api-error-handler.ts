interface ApiError {
  message: string
  status?: number
  endpoint?: string
  timestamp: string
  details?: any
  stack?: string
}

export class ApiErrorHandler {
  static logError(error: ApiError) {
    console.group(`🚨 API Error - ${error.status || "Unknown"} - ${error.endpoint || "Unknown endpoint"}`)
    console.error("Timestamp:", error.timestamp)
    console.error("Status:", error.status)
    console.error("Endpoint:", error.endpoint)
    console.error("Message:", error.message)
    console.error("User Agent:", typeof navigator !== "undefined" ? navigator.userAgent : "N/A")
    console.error("URL:", typeof window !== "undefined" ? window.location.href : "N/A")
    console.error("Referrer:", typeof document !== "undefined" ? document.referrer : "N/A")

    if (error.details) {
      console.error("Response Details:", error.details)
    }

    if (error.stack) {
      console.error("Stack Trace:", error.stack)
    }

    // Log network information if available
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const connection = (navigator as any).connection
      console.error("Network Info:", {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      })
    }

    console.groupEnd()
  }

  static async handleApiCall<T>(apiCall: () => Promise<Response>, endpoint: string): Promise<T> {
    const startTime = Date.now()

    try {
      console.log(`📡 API Call Started: ${endpoint}`)

      const response = await apiCall()
      const endTime = Date.now()
      const duration = endTime - startTime

      console.log(`✅ API Call Completed: ${endpoint} (${duration}ms)`)

      if (!response.ok) {
        let errorDetails: any = null

        try {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            errorDetails = await response.json()
          } else {
            errorDetails = await response.text()
          }
        } catch (parseError) {
          console.warn("Could not parse error response:", parseError)
          errorDetails = `Failed to parse response: ${response.statusText}`
        }

        const apiError: ApiError = {
          message: errorDetails?.error || errorDetails?.message || `HTTP error! status: ${response.status}`,
          status: response.status,
          endpoint,
          timestamp: new Date().toISOString(),
          details: errorDetails,
        }

        this.logError(apiError)
        throw apiError
      }

      const data = await response.json()
      console.log(`📦 API Response: ${endpoint}`, data)

      return data
    } catch (error) {
      const endTime = Date.now()
      const duration = endTime - startTime

      if (error instanceof Error && !(error as any).status) {
        // Network or other non-HTTP error
        const apiError: ApiError = {
          message: error.message || "Network error occurred",
          endpoint,
          timestamp: new Date().toISOString(),
          details: {
            name: error.name,
            stack: error.stack,
            type: "NetworkError",
          },
          stack: error.stack,
        }

        this.logError(apiError)
        console.error(`❌ API Call Failed: ${endpoint} (${duration}ms)`)
        throw apiError
      }

      // Re-throw API errors
      throw error
    }
  }
}
