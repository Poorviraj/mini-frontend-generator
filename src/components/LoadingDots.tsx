// components/LoadingDots.tsx
export default function LoadingDots() {
  return (
    <span className="inline-flex space-x-1">
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-75">.</span>
      <span className="animate-bounce delay-150">.</span>
    </span>
  )
}
