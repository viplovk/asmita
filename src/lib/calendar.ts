import { EVENT_DETAILS, COORDINATORS } from '../config/eventData';

export const CALENDAR_EVENT = {
  title: 'ASMITA 2026 — Ethnic Day | IEC College of Engineering & Technology',
  description: [
    'ASMITA: Ethnic Day 2026 — Celebrating culture, tradition, handloom weaves, and Indian heritage.',
    'Organized by Spearheads Student Council at IEC College of Engineering & Technology.',
    '',
    '• Event Date: Wednesday, September 16, 2026',
    '• Timings: 10:00 AM – 5:00 PM IST',
    '• Venue: Seminar Hall, F Block, IEC-CET Campus, Knowledge Park I, Greater Noida',
    '• Dress Code: Traditional Cultural / Ethnic Attire',
    '',
    `• Faculty Coordinator: ${COORDINATORS[0].name} (${COORDINATORS[0].displayPhone})`,
    `• Student Coordinator: ${COORDINATORS[1].name} (${COORDINATORS[1].displayPhone})`,
    '',
    'Please bring your registered participant pass for entry.',
  ].join('\n'),
  location: 'Seminar Hall, F Block, IEC College of Engineering & Technology, Plot No. 4, Knowledge Park I, Greater Noida, Uttar Pradesh 201310, India',
  // 16 Sept 2026, 10:00 AM IST (UTC+5:30) to 5:00 PM IST (UTC+5:30)
  // 10:00 AM IST = 04:30:00 UTC
  // 05:00 PM IST = 11:30:00 UTC
  startUTC: '20260916T043000Z',
  endUTC: '20260916T113000Z',
};

/**
 * Returns a direct Google Calendar web URL that pre-fills the event title,
 * date/time (Sept 16, 2026 from 10:00 AM to 5:00 PM IST), detailed description,
 * and seminar hall location.
 */
export function getGoogleCalendarUrl(): string {
  const base = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: CALENDAR_EVENT.title,
    dates: `${CALENDAR_EVENT.startUTC}/${CALENDAR_EVENT.endUTC}`,
    details: CALENDAR_EVENT.description,
    location: CALENDAR_EVENT.location,
    ctz: 'Asia/Kolkata',
  });
  return `${base}?${params.toString()}`;
}

/**
 * Opens the Google Calendar creation event in a new browser window/tab.
 */
export function addToGoogleCalendar(): void {
  const url = getGoogleCalendarUrl();
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Generates an iCalendar (.ics) file for Apple Calendar, Outlook, and mobile calendar apps.
 */
export function downloadICS(): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IEC CET//ASMITA Ethnic Day 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:asmita-2026-ethnic-day@iec.edu.in',
    `DTSTAMP:${CALENDAR_EVENT.startUTC}`,
    `DTSTART:${CALENDAR_EVENT.startUTC}`,
    `DTEND:${CALENDAR_EVENT.endUTC}`,
    `SUMMARY:${CALENDAR_EVENT.title}`,
    `DESCRIPTION:${CALENDAR_EVENT.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${CALENDAR_EVENT.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'ASMITA_2026_Ethnic_Day.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
