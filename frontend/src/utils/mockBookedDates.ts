
/**
 * Generates mock booked dates for demo purposes
 * @returns Array of booked date ranges
 */
export function getMockBookedDates() {
  return [
    { 
      start: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), 
      end: new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000) 
    },
    { 
      start: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), 
      end: new Date(new Date().getTime() + 18 * 24 * 60 * 60 * 1000) 
    }
  ];
}
