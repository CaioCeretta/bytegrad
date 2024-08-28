
type StatusBarProps = {
  progressPercentage: number
}

export default function StatusBar({progressPercentage}: StatusBarProps) {
  return (
    <div
    
      style={{ width: `${progressPercentage}%` }}

      className="h-[10px] bg-[orange] absolute top-0 left-0"
    />

    
  )
}