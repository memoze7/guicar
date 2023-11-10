import { cn } from '@/lib/utils'

interface InputDescriptionProps {
  children: React.ReactNode
  className?: string
}
export function InputDescription ({ children, className }: InputDescriptionProps) {
  return (
    <div className={cn(className, 'text-sm text-muted-foreground')}>{children}</div>
  )
}
