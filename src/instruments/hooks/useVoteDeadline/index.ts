import moment from 'moment/moment'
import { useCallback, useMemo } from 'react'

export const useVoteDeadline = (end_date: string, start_date: string) => {
  return useMemo(() => getVoteDeadline(end_date, start_date), [end_date, start_date])
}

const timerSuffix = {
  month: 'м.',
  days: 'д.',
  hours: 'ч.',
  minutes: 'мин.',
}

export const getVoteDeadline = (end_date: string, start_date: string) => {
  const monthLeft = moment(end_date).diff(moment(), 'month')
  const daysLeft = moment(end_date).diff(moment(), 'days')
  const hoursLeft = moment(end_date).diff(moment(), 'hour')
  const minutesLeft = moment(end_date).diff(moment(), 'minutes')
  const allMinutes = moment(end_date).diff(moment(start_date), 'minutes')
  const percent = 100 - (100 * minutesLeft) / allMinutes + '%'

  if (monthLeft) {
    return {
      title: monthLeft + timerSuffix.month,
      percent,
    }
  } else if (daysLeft) {
    return {
      title: daysLeft + timerSuffix.days,
      percent,
    }
  } else if (hoursLeft) {
    return {
      title: hoursLeft + timerSuffix.hours,
      percent,
    }
  } else if (minutesLeft) {
    return {
      title: minutesLeft + timerSuffix.minutes,
      percent,
    }
  } else {
    return { title: 'скоро', percent: '100%' }
  }
}
