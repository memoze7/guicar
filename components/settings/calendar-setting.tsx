import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { type Dispatch, type SetStateAction } from 'react'
import { Button } from '@/components/ui/button'

export const CalendarSetting = ({ date, setDate }: { date: Date | undefined, setDate: Dispatch<SetStateAction<Date | undefined >> }) => {
  // const [date, setDate] = useState<Date>()
  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(' justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP', { locale: es }) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className=" w-auto p-0">
          <Calendar
            locale={es}
            mode="single"
            captionLayout="dropdown-buttons"
            selected={date}
            onSelect={setDate}
            fromYear={1960}
            toYear={2030}
          />
        </PopoverContent>
      </Popover>
  )
}
