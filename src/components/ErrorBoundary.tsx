import { Component, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-[60vh] flex items-center justify-center px-4 text-center">
          <div>
            <p className="text-5xl mb-4">⚠️</p>
            <h1 className="font-serif text-2xl font-bold text-stone-900 mb-2">Something went wrong</h1>
            <p className="text-stone-500 text-sm mb-6 max-w-sm mx-auto">{this.state.message}</p>
            <Link
              to="/"
              className="inline-block px-5 py-2.5 bg-forest-600 text-white rounded-full text-sm font-semibold hover:bg-forest-800 transition-colors"
            >
              Go home
            </Link>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
