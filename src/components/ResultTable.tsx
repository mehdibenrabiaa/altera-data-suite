type EarningType = "regular" | "irregular";

interface PayRow {
  rn: number;
  employee: string;
  payPeriod: string;
  earningItem: string;
  earningType: EarningType;
  rate: string | null;
  hoursUnits: string | null;
  thisPeriod: string;
  yearToDate: string;
  groupStart?: boolean;
}

const ROWS: PayRow[] = [
  { rn: 1,   employee: "DeShawn Lewis",     payPeriod: "12/27/2024", earningItem: "Regular",        earningType: "regular",   rate: "30.52", hoursUnits: "80.0",  thisPeriod: "02,441.", yearToDate: "6,019,532.80", groupStart: true },
  { rn: 2,   employee: "DeShawn Lewis",     payPeriod: "12/27/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "30.52", hoursUnits: "6.0",   thisPeriod: "0183.",   yearToDate: "121,464.96" },
  { rn: 3,   employee: "DeShawn Lewis",     payPeriod: "12/27/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "924.",    yearToDate: "977,399.76" },
  { rn: 4,   employee: "DeShawn Lewis",     payPeriod: "12/27/2024", earningItem: "Car Allowance",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "857.",    yearToDate: "076,856.56" },
  { rn: 5,   employee: "DeShawn Lewis",     payPeriod: "12/27/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "350.",    yearToDate: "042,800.32" },
  { rn: 6,   employee: "Jack Edwards",      payPeriod: "09/06/2024", earningItem: "Regular",         earningType: "regular",   rate: "37.02", hoursUnits: "32.0",  thisPeriod: "01,184.", yearToDate: "6,417,769.60", groupStart: true },
  { rn: 7,   employee: "Jack Edwards",      payPeriod: "09/06/2024", earningItem: "Tuition",         earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "226.",    yearToDate: "183,392.70" },
  { rn: 8,   employee: "Frances Cooper",    payPeriod: "10/04/2024", earningItem: "Regular",         earningType: "regular",   rate: "14.23", hoursUnits: "40.0",  thisPeriod: "0569.",   yearToDate: "2,013,660.80", groupStart: true },
  { rn: 9,   employee: "Frances Cooper",    payPeriod: "10/04/2024", earningItem: "Car Allowance",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "902.",    yearToDate: "8,921,669.36" },
  { rn: 10,  employee: "Frances Cooper",    payPeriod: "10/04/2024", earningItem: "Holiday",         earningType: "regular",   rate: "14.23", hoursUnits: "16.0",  thisPeriod: "0227.",   yearToDate: "685,464.32" },
  { rn: 11,  employee: "Ananya Phillips",   payPeriod: "10/18/2024", earningItem: "Regular",         earningType: "regular",   rate: "53.33", hoursUnits: "80.0",  thisPeriod: "04,266.", yearToDate: "4,063,996.00", groupStart: true },
  { rn: 12,  employee: "Ananya Phillips",   payPeriod: "10/18/2024", earningItem: "Holiday",         earningType: "regular",   rate: null,    hoursUnits: "8.0",   thisPeriod: "0426.",   yearToDate: "646,399.60" },
  { rn: 13,  employee: "Deborah Carter",    payPeriod: "12/13/2024", earningItem: "Regular",         earningType: "regular",   rate: "84.95", hoursUnits: "32.0",  thisPeriod: "02,718.", yearToDate: "4,027,184.00", groupStart: true },
  { rn: 14,  employee: "Deborah Carter",    payPeriod: "12/13/2024", earningItem: "Vacation",        earningType: "regular",   rate: "84.95", hoursUnits: "16.0",  thisPeriod: "01,359.", yearToDate: "2,013,592.00" },
  { rn: 15,  employee: "Deborah Carter",    payPeriod: "12/13/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "3,388.",  yearToDate: "0,133,880.10" },
  { rn: 16,  employee: "Deborah Carter",    payPeriod: "12/13/2024", earningItem: "Incentive Pay",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "317.",    yearToDate: "113,171.10" },
  { rn: 17,  employee: "Deborah Carter",    payPeriod: "12/13/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "630.",    yearToDate: "566,305.60" },
  { rn: 18,  employee: "Deborah Carter",    payPeriod: "12/13/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "84.95", hoursUnits: "8.0",   thisPeriod: "0679.",   yearToDate: "606,796.00" },
  { rn: 19,  employee: "Victoria Nambiar",  payPeriod: "11/01/2024", earningItem: "Regular",         earningType: "regular",   rate: "79.96", hoursUnits: "32.0",  thisPeriod: "02,558.", yearToDate: "7,220,469.76", groupStart: true },
  { rn: 20,  employee: "Victoria Nambiar",  payPeriod: "11/01/2024", earningItem: "Tuition",         earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "302.",    yearToDate: "352,418.80" },
  { rn: 21,  employee: "Victoria Nambiar",  payPeriod: "11/01/2024", earningItem: "Holiday",         earningType: "regular",   rate: "79.96", hoursUnits: "8.0",   thisPeriod: "0639.",   yearToDate: "685,117.44" },
  { rn: 22,  employee: "Victoria Nambiar",  payPeriod: "11/01/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "1,406.",  yearToDate: "5,611,252.48" },
  { rn: 23,  employee: "Michelle Hamilton", payPeriod: "09/06/2024", earningItem: "Regular",         earningType: "regular",   rate: "23.05", hoursUnits: "40.0",  thisPeriod: "0922.",   yearToDate: "0,017,518.00", groupStart: true },
  { rn: 24,  employee: "Michelle Hamilton", payPeriod: "09/06/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "23.05", hoursUnits: "7.0",   thisPeriod: "0161.",   yearToDate: "353,065.65" },
  { rn: 25,  employee: "Michelle Hamilton", payPeriod: "09/06/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "1,192.",  yearToDate: "1,622,651.04" },
  { rn: 26,  employee: "Amanda Murray",     payPeriod: "10/18/2024", earningItem: "Regular",         earningType: "regular",   rate: "83.88", hoursUnits: "32.0",  thisPeriod: "02,684.", yearToDate: "1,653,683.20", groupStart: true },
  { rn: 27,  employee: "Amanda Murray",     payPeriod: "10/18/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "83.88", hoursUnits: "10.0",  thisPeriod: "0838.",   yearToDate: "8,016,776.00" },
  { rn: 28,  employee: "Amanda Murray",     payPeriod: "10/18/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "3,104.",  yearToDate: "5,162,090.20" },
  { rn: 29,  employee: "Amanda Murray",     payPeriod: "10/18/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "197.",    yearToDate: "963,959.20" },
  { rn: 30,  employee: "Fatima James",      payPeriod: "11/15/2024", earningItem: "Regular",         earningType: "regular",   rate: "52.88", hoursUnits: "72.0",  thisPeriod: "03,807.", yearToDate: "3,676,147.20", groupStart: true },
  { rn: 31,  employee: "Fatima James",      payPeriod: "11/15/2024", earningItem: "Vacation",        earningType: "regular",   rate: "52.88", hoursUnits: "14.0",  thisPeriod: "0740.",   yearToDate: "3,214,806.40" },
  { rn: 32,  employee: "Fatima James",      payPeriod: "11/15/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "107.",    yearToDate: "2,075,574.10" },
  { rn: 33,  employee: "Jacob Howard",      payPeriod: "11/15/2024", earningItem: "Regular",         earningType: "regular",   rate: "42.04", hoursUnits: "80.0",  thisPeriod: "03,363.", yearToDate: "3,261,100.00", groupStart: true },
  { rn: 34,  employee: "Jacob Howard",      payPeriod: "11/15/2024", earningItem: "Vacation",        earningType: "regular",   rate: "42.04", hoursUnits: "16.0",  thisPeriod: "0672.",   yearToDate: "1,482,240.00" },
  { rn: 35,  employee: "Jacob Howard",      payPeriod: "11/15/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "2,150.",  yearToDate: "0,198,450.00" },
  { rn: 36,  employee: "Jacob Howard",      payPeriod: "11/15/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "488.",    yearToDate: "447,320.00" },
  { rn: 37,  employee: "Priya Sharma",      payPeriod: "09/20/2024", earningItem: "Regular",         earningType: "regular",   rate: "61.75", hoursUnits: "80.0",  thisPeriod: "04,940.", yearToDate: "5,742,300.00", groupStart: true },
  { rn: 38,  employee: "Priya Sharma",      payPeriod: "09/20/2024", earningItem: "Holiday",         earningType: "regular",   rate: "61.75", hoursUnits: "8.0",   thisPeriod: "0494.",   yearToDate: "574,230.00" },
  { rn: 39,  employee: "Priya Sharma",      payPeriod: "09/20/2024", earningItem: "Tuition",         earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "315.",    yearToDate: "291,375.00" },
  { rn: 40,  employee: "Marcus Thompson",   payPeriod: "10/04/2024", earningItem: "Regular",         earningType: "regular",   rate: "45.50", hoursUnits: "80.0",  thisPeriod: "03,640.", yearToDate: "4,213,600.00", groupStart: true },
  { rn: 41,  employee: "Marcus Thompson",   payPeriod: "10/04/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "45.50", hoursUnits: "8.0",   thisPeriod: "0364.",   yearToDate: "421,360.00" },
  { rn: 42,  employee: "Marcus Thompson",   payPeriod: "10/04/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "1,820.",  yearToDate: "1,676,440.00" },
  { rn: 43,  employee: "Marcus Thompson",   payPeriod: "10/04/2024", earningItem: "Car Allowance",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "600.",    yearToDate: "552,600.00" },
  { rn: 44,  employee: "Marcus Thompson",   payPeriod: "10/04/2024", earningItem: "Incentive Pay",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "250.",    yearToDate: "230,250.00" },
  { rn: 45,  employee: "Linda Chen",        payPeriod: "12/06/2024", earningItem: "Regular",         earningType: "regular",   rate: "38.20", hoursUnits: "72.0",  thisPeriod: "02,750.", yearToDate: "2,532,960.00", groupStart: true },
  { rn: 46,  employee: "Linda Chen",        payPeriod: "12/06/2024", earningItem: "Vacation",        earningType: "regular",   rate: "38.20", hoursUnits: "8.0",   thisPeriod: "0305.",   yearToDate: "281,440.00" },
  { rn: 47,  employee: "Linda Chen",        payPeriod: "12/06/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "762.",    yearToDate: "701,880.00" },
  { rn: 48,  employee: "Robert Kim",        payPeriod: "11/22/2024", earningItem: "Regular",         earningType: "regular",   rate: "55.00", hoursUnits: "64.0",  thisPeriod: "03,520.", yearToDate: "4,083,200.00", groupStart: true },
  { rn: 49,  employee: "Robert Kim",        payPeriod: "11/22/2024", earningItem: "Holiday",         earningType: "regular",   rate: "55.00", hoursUnits: "16.0",  thisPeriod: "0880.",   yearToDate: "1,020,800.00" },
  { rn: 50,  employee: "Robert Kim",        payPeriod: "11/22/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "55.00", hoursUnits: "8.0",   thisPeriod: "0440.",   yearToDate: "510,400.00" },
  { rn: 51,  employee: "Robert Kim",        payPeriod: "11/22/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "2,640.",  yearToDate: "3,062,400.00" },
  { rn: 52,  employee: "Sarah Mitchell",    payPeriod: "10/18/2024", earningItem: "Regular",         earningType: "regular",   rate: "29.75", hoursUnits: "80.0",  thisPeriod: "02,380.", yearToDate: "2,759,200.00", groupStart: true },
  { rn: 53,  employee: "Sarah Mitchell",    payPeriod: "10/18/2024", earningItem: "Tuition",         earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "275.",    yearToDate: "319,000.00" },
  { rn: 54,  employee: "Sarah Mitchell",    payPeriod: "10/18/2024", earningItem: "Car Allowance",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "500.",    yearToDate: "580,000.00" },
  { rn: 55,  employee: "David Okafor",      payPeriod: "09/06/2024", earningItem: "Regular",         earningType: "regular",   rate: "68.40", hoursUnits: "80.0",  thisPeriod: "05,472.", yearToDate: "6,347,520.00", groupStart: true },
  { rn: 56,  employee: "David Okafor",      payPeriod: "09/06/2024", earningItem: "Vacation",        earningType: "regular",   rate: "68.40", hoursUnits: "16.0",  thisPeriod: "01,094.", yearToDate: "1,269,504.00" },
  { rn: 57,  employee: "David Okafor",      payPeriod: "09/06/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "1,027.",  yearToDate: "1,191,282.00" },
  { rn: 58,  employee: "David Okafor",      payPeriod: "09/06/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "3,200.",  yearToDate: "3,712,000.00" },
  { rn: 59,  employee: "Jennifer Walsh",    payPeriod: "11/08/2024", earningItem: "Regular",         earningType: "regular",   rate: "19.50", hoursUnits: "80.0",  thisPeriod: "01,560.", yearToDate: "1,810,800.00", groupStart: true },
  { rn: 60,  employee: "Jennifer Walsh",    payPeriod: "11/08/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "19.50", hoursUnits: "8.0",   thisPeriod: "0156.",   yearToDate: "181,080.00" },
  { rn: 61,  employee: "Jennifer Walsh",    payPeriod: "11/08/2024", earningItem: "Holiday",         earningType: "regular",   rate: "19.50", hoursUnits: "16.0",  thisPeriod: "0312.",   yearToDate: "362,160.00" },
  { rn: 62,  employee: "Carlos Rivera",     payPeriod: "12/06/2024", earningItem: "Regular",         earningType: "regular",   rate: "72.10", hoursUnits: "80.0",  thisPeriod: "05,768.", yearToDate: "6,691,480.00", groupStart: true },
  { rn: 63,  employee: "Carlos Rivera",     payPeriod: "12/06/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "4,326.",  yearToDate: "5,018,508.00" },
  { rn: 64,  employee: "Carlos Rivera",     payPeriod: "12/06/2024", earningItem: "Incentive Pay",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "750.",    yearToDate: "870,450.00" },
  { rn: 65,  employee: "Carlos Rivera",     payPeriod: "12/06/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "841.",    yearToDate: "976,038.00" },
  { rn: 66,  employee: "Nina Patel",        payPeriod: "10/18/2024", earningItem: "Regular",         earningType: "regular",   rate: "47.25", hoursUnits: "72.0",  thisPeriod: "03,402.", yearToDate: "3,947,922.00", groupStart: true },
  { rn: 67,  employee: "Nina Patel",        payPeriod: "10/18/2024", earningItem: "Vacation",        earningType: "regular",   rate: "47.25", hoursUnits: "8.0",   thisPeriod: "0378.",   yearToDate: "438,669.00" },
  { rn: 68,  employee: "Nina Patel",        payPeriod: "10/18/2024", earningItem: "Car Allowance",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "600.",    yearToDate: "696,300.00" },
  { rn: 69,  employee: "Nina Patel",        payPeriod: "10/18/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "47.25", hoursUnits: "8.0",   thisPeriod: "0378.",   yearToDate: "438,669.00" },
  { rn: 70,  employee: "Thomas Burke",      payPeriod: "11/01/2024", earningItem: "Regular",         earningType: "regular",   rate: "33.80", hoursUnits: "80.0",  thisPeriod: "02,704.", yearToDate: "3,137,840.00", groupStart: true },
  { rn: 71,  employee: "Thomas Burke",      payPeriod: "11/01/2024", earningItem: "Holiday",         earningType: "regular",   rate: "33.80", hoursUnits: "8.0",   thisPeriod: "0270.",   yearToDate: "313,326.00" },
  { rn: 72,  employee: "Thomas Burke",      payPeriod: "11/01/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "1,352.",  yearToDate: "1,568,920.00" },
  { rn: 73,  employee: "Aisha Johnson",     payPeriod: "12/13/2024", earningItem: "Regular",         earningType: "regular",   rate: "58.60", hoursUnits: "80.0",  thisPeriod: "04,688.", yearToDate: "5,438,080.00", groupStart: true },
  { rn: 74,  employee: "Aisha Johnson",     payPeriod: "12/13/2024", earningItem: "Tuition",         earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "315.",    yearToDate: "365,415.00" },
  { rn: 75,  employee: "Aisha Johnson",     payPeriod: "12/13/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "703.",    yearToDate: "815,480.00" },
  { rn: 76,  employee: "Aisha Johnson",     payPeriod: "12/13/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "58.60", hoursUnits: "8.0",   thisPeriod: "0468.",   yearToDate: "543,008.00" },
  { rn: 77,  employee: "Kevin Nguyen",      payPeriod: "09/20/2024", earningItem: "Regular",         earningType: "regular",   rate: "41.00", hoursUnits: "64.0",  thisPeriod: "02,624.", yearToDate: "3,044,480.00", groupStart: true },
  { rn: 78,  employee: "Kevin Nguyen",      payPeriod: "09/20/2024", earningItem: "Vacation",        earningType: "regular",   rate: "41.00", hoursUnits: "16.0",  thisPeriod: "0656.",   yearToDate: "761,120.00" },
  { rn: 79,  employee: "Kevin Nguyen",      payPeriod: "09/20/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "1,845.",  yearToDate: "2,140,980.00" },
  { rn: 80,  employee: "Kevin Nguyen",      payPeriod: "09/20/2024", earningItem: "Car Allowance",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "500.",    yearToDate: "580,500.00" },
  { rn: 81,  employee: "Rachel Green",      payPeriod: "11/22/2024", earningItem: "Regular",         earningType: "regular",   rate: "26.15", hoursUnits: "80.0",  thisPeriod: "02,092.", yearToDate: "2,426,680.00", groupStart: true },
  { rn: 82,  employee: "Rachel Green",      payPeriod: "11/22/2024", earningItem: "Holiday",         earningType: "regular",   rate: "26.15", hoursUnits: "16.0",  thisPeriod: "0418.",   yearToDate: "485,336.00" },
  { rn: 83,  employee: "Rachel Green",      payPeriod: "11/22/2024", earningItem: "Incentive Pay",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "394.",    yearToDate: "457,002.00" },
  { rn: 84,  employee: "Omar Hassan",       payPeriod: "10/04/2024", earningItem: "Regular",         earningType: "regular",   rate: "91.20", hoursUnits: "80.0",  thisPeriod: "07,296.", yearToDate: "8,463,360.00", groupStart: true },
  { rn: 85,  employee: "Omar Hassan",       payPeriod: "10/04/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "91.20", hoursUnits: "8.0",   thisPeriod: "0729.",   yearToDate: "846,336.00" },
  { rn: 86,  employee: "Omar Hassan",       payPeriod: "10/04/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "1,368.",  yearToDate: "1,587,384.00" },
  { rn: 87,  employee: "Omar Hassan",       payPeriod: "10/04/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "5,472.",  yearToDate: "6,347,808.00" },
  { rn: 88,  employee: "Omar Hassan",       payPeriod: "10/04/2024", earningItem: "Vacation",        earningType: "regular",   rate: "91.20", hoursUnits: "8.0",   thisPeriod: "0729.",   yearToDate: "846,336.00" },
  { rn: 89,  employee: "Stephanie Lee",     payPeriod: "12/27/2024", earningItem: "Regular",         earningType: "regular",   rate: "35.60", hoursUnits: "72.0",  thisPeriod: "02,563.", yearToDate: "2,972,988.00", groupStart: true },
  { rn: 90,  employee: "Stephanie Lee",     payPeriod: "12/27/2024", earningItem: "Vacation",        earningType: "regular",   rate: "35.60", hoursUnits: "8.0",   thisPeriod: "0284.",   yearToDate: "330,332.00" },
  { rn: 91,  employee: "Stephanie Lee",     payPeriod: "12/27/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "534.",    yearToDate: "619,596.00" },
  { rn: 92,  employee: "Brandon Cox",       payPeriod: "11/08/2024", earningItem: "Regular",         earningType: "regular",   rate: "48.90", hoursUnits: "80.0",  thisPeriod: "03,912.", yearToDate: "4,538,520.00", groupStart: true },
  { rn: 93,  employee: "Brandon Cox",       payPeriod: "11/08/2024", earningItem: "Holiday",         earningType: "regular",   rate: "48.90", hoursUnits: "8.0",   thisPeriod: "0391.",   yearToDate: "453,852.00" },
  { rn: 94,  employee: "Brandon Cox",       payPeriod: "11/08/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "48.90", hoursUnits: "8.0",   thisPeriod: "0391.",   yearToDate: "453,852.00" },
  { rn: 95,  employee: "Brandon Cox",       payPeriod: "11/08/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "2,934.",  yearToDate: "3,404,268.00" },
  { rn: 96,  employee: "Monica Torres",     payPeriod: "09/06/2024", earningItem: "Regular",         earningType: "regular",   rate: "22.80", hoursUnits: "80.0",  thisPeriod: "01,824.", yearToDate: "2,115,840.00", groupStart: true },
  { rn: 97,  employee: "Monica Torres",     payPeriod: "09/06/2024", earningItem: "Car Allowance",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "500.",    yearToDate: "580,500.00" },
  { rn: 98,  employee: "Monica Torres",     payPeriod: "09/06/2024", earningItem: "Tuition",         earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "228.",    yearToDate: "264,588.00" },
  { rn: 99,  employee: "James Whitfield",   payPeriod: "12/06/2024", earningItem: "Regular",         earningType: "regular",   rate: "77.30", hoursUnits: "80.0",  thisPeriod: "06,184.", yearToDate: "7,173,440.00", groupStart: true },
  { rn: 100, employee: "James Whitfield",   payPeriod: "12/06/2024", earningItem: "Vacation",        earningType: "regular",   rate: "77.30", hoursUnits: "8.0",   thisPeriod: "0618.",   yearToDate: "717,344.00" },
  { rn: 101, employee: "James Whitfield",   payPeriod: "12/06/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "4,638.",  yearToDate: "5,380,116.00" },
  { rn: 102, employee: "James Whitfield",   payPeriod: "12/06/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "927.",    yearToDate: "1,075,518.00" },
  { rn: 103, employee: "James Whitfield",   payPeriod: "12/06/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "77.30", hoursUnits: "8.0",   thisPeriod: "0618.",   yearToDate: "717,344.00" },
  { rn: 104, employee: "Yuki Tanaka",       payPeriod: "10/18/2024", earningItem: "Regular",         earningType: "regular",   rate: "64.50", hoursUnits: "80.0",  thisPeriod: "05,160.", yearToDate: "5,985,600.00", groupStart: true },
  { rn: 105, employee: "Yuki Tanaka",       payPeriod: "10/18/2024", earningItem: "Holiday",         earningType: "regular",   rate: "64.50", hoursUnits: "8.0",   thisPeriod: "0516.",   yearToDate: "598,560.00" },
  { rn: 106, employee: "Yuki Tanaka",       payPeriod: "10/18/2024", earningItem: "Incentive Pay",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "967.",    yearToDate: "1,122,090.00" },
  { rn: 107, employee: "Patrick O'Brien",   payPeriod: "11/22/2024", earningItem: "Regular",         earningType: "regular",   rate: "31.45", hoursUnits: "64.0",  thisPeriod: "02,012.", yearToDate: "2,334,716.00", groupStart: true },
  { rn: 108, employee: "Patrick O'Brien",   payPeriod: "11/22/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "31.45", hoursUnits: "8.0",   thisPeriod: "0251.",   yearToDate: "291,837.00" },
  { rn: 109, employee: "Patrick O'Brien",   payPeriod: "11/22/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "1,572.",  yearToDate: "1,823,244.00" },
  { rn: 110, employee: "Aaliyah Davis",     payPeriod: "09/20/2024", earningItem: "Regular",         earningType: "regular",   rate: "43.70", hoursUnits: "80.0",  thisPeriod: "03,496.", yearToDate: "4,054,640.00", groupStart: true },
  { rn: 111, employee: "Aaliyah Davis",     payPeriod: "09/20/2024", earningItem: "Vacation",        earningType: "regular",   rate: "43.70", hoursUnits: "16.0",  thisPeriod: "0699.",   yearToDate: "811,188.00" },
  { rn: 112, employee: "Aaliyah Davis",     payPeriod: "09/20/2024", earningItem: "Car Allowance",   earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "600.",    yearToDate: "696,600.00" },
  { rn: 113, employee: "Aaliyah Davis",     payPeriod: "09/20/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "655.",    yearToDate: "760,090.00" },
  { rn: 114, employee: "Christopher Bell",  payPeriod: "12/13/2024", earningItem: "Regular",         earningType: "regular",   rate: "88.15", hoursUnits: "80.0",  thisPeriod: "07,052.", yearToDate: "8,180,320.00", groupStart: true },
  { rn: 115, employee: "Christopher Bell",  payPeriod: "12/13/2024", earningItem: "Holiday",         earningType: "regular",   rate: "88.15", hoursUnits: "16.0",  thisPeriod: "01,410.", yearToDate: "1,636,064.00" },
  { rn: 116, employee: "Christopher Bell",  payPeriod: "12/13/2024", earningItem: "Commission",      earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "5,289.",  yearToDate: "6,135,396.00" },
  { rn: 117, employee: "Christopher Bell",  payPeriod: "12/13/2024", earningItem: "Tuition",         earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "315.",    yearToDate: "365,415.00" },
  { rn: 118, employee: "Sandra Flores",     payPeriod: "11/15/2024", earningItem: "Regular",         earningType: "regular",   rate: "17.90", hoursUnits: "80.0",  thisPeriod: "01,432.", yearToDate: "1,661,120.00", groupStart: true },
  { rn: 119, employee: "Sandra Flores",     payPeriod: "11/15/2024", earningItem: "Sick Pay",        earningType: "regular",   rate: "17.90", hoursUnits: "8.0",   thisPeriod: "0143.",   yearToDate: "165,980.00" },
  { rn: 120, employee: "Sandra Flores",     payPeriod: "11/15/2024", earningItem: "Retroactive Pay", earningType: "irregular", rate: null,    hoursUnits: null,    thisPeriod: "268.",    yearToDate: "310,904.00" },
];

export default function ResultTable() {
  return (
    <div className="rt-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

        .rt-container {
          --bg-window:         #2b2b2b;
          --bg-titlebar:       #3c3c3c;
          --border-window:     #1a1a1a;
          --col-header-bg:     #4a4a4a;
          --col-header-fg:     #e8e8e8;
          --row-odd:           #f5f0e8;
          --row-even:          #ede8df;
          --row-hover:         #dde4f0;
          --grid-line:         #d4cfc6;
          --text-main:         #1a1a1a;
          --accent:            #e8813a;
          --row-num-bg:        #d8d3ca;
          --row-num-fg:        #555;
          --font-ui:           'IBM Plex Sans', sans-serif;
          --font-data:         'IBM Plex Mono', monospace;
          font-family: var(--font-ui);
        }
        .rt-window {
          background: var(--bg-window);
          border: 1px solid var(--border-window);
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
        }
        .rt-titlebar {
          background: var(--bg-titlebar);
          padding: 5px 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid #222;
        }
        .rt-titlebar-icon {
          width: 11px; height: 11px;
          background: #555;
          border-radius: 2px;
          border: 1px solid #444;
          flex-shrink: 0;
        }
        .rt-titlebar-title { font-size: 10.5px; font-weight: 500; color: #c8c8c8; letter-spacing: 0.01em; }
        .rt-titlebar-dot   { color: #666; margin: 0 1px; }

        .rt-table-wrap {
          overflow-x: auto;
          overflow-y: auto;
          max-height: 300px;
        }
        .rt-table-wrap table { border-collapse: collapse; width: 100%; font-size: 10.5px; }

        .rt-table-wrap thead { position: sticky; top: 0; z-index: 3; }
        .rt-table-wrap thead tr { background: var(--col-header-bg); }
        .rt-table-wrap thead th {
          background: var(--col-header-bg);
          color: var(--col-header-fg);
          font-family: var(--font-ui);
          font-weight: 600;
          font-size: 9.5px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          padding: 6px 8px;
          border-right: 1px solid var(--grid-line);
          border-bottom: 1px solid var(--grid-line);
          white-space: nowrap;
          user-select: none;
        }
        .rt-table-wrap thead th:first-child {
          background: #3a3a3a;
          min-width: 26px; width: 26px;
          text-align: center;
          color: #888;
        }
        .rt-table-wrap thead th.rt-num { text-align: right; }
        .rt-table-wrap thead th:last-child { border-right: none; }

        .rt-table-wrap tbody tr:nth-child(odd) td  { background: var(--row-odd); }
        .rt-table-wrap tbody tr:nth-child(even) td { background: var(--row-even); }
        .rt-table-wrap tbody tr.rt-group-start td  { border-top: 1px solid var(--grid-line); }
        .rt-table-wrap tbody tr:hover td { background: var(--row-hover); transition: background 80ms; }

        .rt-table-wrap tbody td {
          padding: 3px 8px;
          border-right: 1px solid var(--grid-line);
          border-bottom: 1px solid var(--grid-line);
          color: var(--text-main);
          white-space: nowrap;
          font-family: var(--font-ui);
          font-weight: 400;
        }
        .rt-table-wrap tbody td:last-child { border-right: none; }

        .rt-table-wrap td.rt-rn {
          background: var(--row-num-bg) !important;
          color: var(--row-num-fg);
          text-align: right;
          font-family: var(--font-data);
          font-size: 9px;
          padding: 3px 5px;
          border-right: 1px solid var(--grid-line);
          width: 26px; min-width: 26px;
          user-select: none;
        }
        .rt-table-wrap td.rt-num {
          font-family: var(--font-data);
          font-size: 10px;
          text-align: right;
          padding-right: 10px;
        }
        .rt-table-wrap td.rt-placeholder { color: #aaa; font-style: italic; font-size: 10.5px; text-align: center; }
        .rt-table-wrap td.rt-earning-regular   { color: #1a3a1a; }
        .rt-table-wrap td.rt-earning-irregular { color: #3a2a10; }

        .rt-table-wrap::-webkit-scrollbar       { width: 6px; height: 6px; }
        .rt-table-wrap::-webkit-scrollbar-track { background: #2b2b2b; }
        .rt-table-wrap::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }
        .rt-table-wrap::-webkit-scrollbar-thumb:hover { background: #777; }

        .rt-statusbar {
          background: #363636;
          border-top: 1px solid #222;
          padding: 4px 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 9.5px;
          color: #888;
          font-family: var(--font-ui);
        }
        .rt-statusbar .rt-dot {
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          display: inline-block;
          margin-right: 4px;
        }
      `}</style>

      <div className="rt-window">
        <div className="rt-titlebar">
          <div className="rt-titlebar-icon" />
          <span className="rt-titlebar-title">Result</span>
          <span className="rt-titlebar-dot">–</span>
          <span className="rt-titlebar-title">Orange</span>
        </div>

        <div className="rt-table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Employee name</th>
                <th>Pay period</th>
                <th>Earning Item</th>
                <th className="rt-num">Rate</th>
                <th className="rt-num">Hours/Units</th>
                <th className="rt-num">This Period</th>
                <th className="rt-num">Year to Date</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.rn} className={row.groupStart ? "rt-group-start" : undefined}>
                  <td className="rt-rn">{row.rn}</td>
                  <td className="rt-emp-rest">{row.employee}</td>
                  <td>{row.payPeriod}</td>
                  <td className={`rt-earning-${row.earningType}`}>{row.earningItem}</td>
                  {row.rate !== null
                    ? <td className="rt-num">{row.rate}</td>
                    : <td className="rt-placeholder">?</td>}
                  {row.hoursUnits !== null
                    ? <td className="rt-num">{row.hoursUnits}</td>
                    : <td className="rt-placeholder">?</td>}
                  <td className="rt-num">{row.thisPeriod}</td>
                  <td className="rt-num">{row.yearToDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rt-statusbar">
          <span><span className="rt-dot" />120 rows × 7 columns</span>
        </div>
      </div>
    </div>
  );
}
