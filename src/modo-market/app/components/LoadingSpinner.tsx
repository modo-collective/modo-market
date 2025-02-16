import type React from "react"

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-4xl font-bold text-blue-500">
        {"LOADING...".split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block animate-wave"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}

export default LoadingSpinner