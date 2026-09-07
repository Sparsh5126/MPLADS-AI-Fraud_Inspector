export interface UPDistrictInfo {
  name: string;
  totalWorks: number;
  highRisk: number;
  critical: number;
  mediumRisk: number;
  lowRisk: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'No Data';
}

export const allUPDistrictData: Record<string, UPDistrictInfo> = {
  "Agra": {
    "name": "Agra",
    "totalWorks": 310,
    "highRisk": 5,
    "critical": 0,
    "mediumRisk": 70,
    "lowRisk": 235,
    "riskLevel": "Low"
  },
  "Aligarh": {
    "name": "Aligarh",
    "totalWorks": 362,
    "highRisk": 18,
    "critical": 3,
    "mediumRisk": 91,
    "lowRisk": 250,
    "riskLevel": "High"
  },
  "Ambedkar Nagar": {
    "name": "Ambedkar Nagar",
    "totalWorks": 240,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 60,
    "lowRisk": 158,
    "riskLevel": "Critical"
  },
  "Amethi": {
    "name": "Amethi",
    "totalWorks": 200,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 50,
    "lowRisk": 128,
    "riskLevel": "Critical"
  },
  "Amroha": {
    "name": "Amroha",
    "totalWorks": 170,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 43,
    "lowRisk": 105,
    "riskLevel": "Critical"
  },
  "Auraiya": {
    "name": "Auraiya",
    "totalWorks": 312,
    "highRisk": 18,
    "critical": 2,
    "mediumRisk": 78,
    "lowRisk": 214,
    "riskLevel": "High"
  },
  "Azamgarh": {
    "name": "Azamgarh",
    "totalWorks": 379,
    "highRisk": 3,
    "critical": 0,
    "mediumRisk": 95,
    "lowRisk": 281,
    "riskLevel": "Low"
  },
  "Baghpat": {
    "name": "Baghpat",
    "totalWorks": 281,
    "highRisk": 21,
    "critical": 6,
    "mediumRisk": 80,
    "lowRisk": 174,
    "riskLevel": "Critical"
  },
  "Bahraich": {
    "name": "Bahraich",
    "totalWorks": 288,
    "highRisk": 4,
    "critical": 0,
    "mediumRisk": 72,
    "lowRisk": 212,
    "riskLevel": "Low"
  },
  "Ballia": {
    "name": "Ballia",
    "totalWorks": 221,
    "highRisk": 19,
    "critical": 4,
    "mediumRisk": 55,
    "lowRisk": 143,
    "riskLevel": "High"
  },
  "Balrampur": {
    "name": "Balrampur",
    "totalWorks": 182,
    "highRisk": 16,
    "critical": 3,
    "mediumRisk": 46,
    "lowRisk": 117,
    "riskLevel": "High"
  },
  "Banda": {
    "name": "Banda",
    "totalWorks": 170,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 43,
    "lowRisk": 105,
    "riskLevel": "Critical"
  },
  "Bara Banki": {
    "name": "Bara Banki",
    "totalWorks": 375,
    "highRisk": 6,
    "critical": 1,
    "mediumRisk": 94,
    "lowRisk": 274,
    "riskLevel": "Medium"
  },
  "Bareilly": {
    "name": "Bareilly",
    "totalWorks": 294,
    "highRisk": 10,
    "critical": 1,
    "mediumRisk": 74,
    "lowRisk": 209,
    "riskLevel": "Medium"
  },
  "Basti": {
    "name": "Basti",
    "totalWorks": 229,
    "highRisk": 3,
    "critical": 0,
    "mediumRisk": 57,
    "lowRisk": 169,
    "riskLevel": "Low"
  },
  "Bhadohi": {
    "name": "Bhadohi",
    "totalWorks": 293,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 73,
    "lowRisk": 210,
    "riskLevel": "Medium"
  },
  "Bijnor": {
    "name": "Bijnor",
    "totalWorks": 182,
    "highRisk": 18,
    "critical": 2,
    "mediumRisk": 46,
    "lowRisk": 116,
    "riskLevel": "High"
  },
  "Budaun": {
    "name": "Budaun",
    "totalWorks": 377,
    "highRisk": 3,
    "critical": 0,
    "mediumRisk": 94,
    "lowRisk": 280,
    "riskLevel": "Low"
  },
  "Bulandshahr": {
    "name": "Bulandshahr",
    "totalWorks": 342,
    "highRisk": 12,
    "critical": 4,
    "mediumRisk": 86,
    "lowRisk": 240,
    "riskLevel": "High"
  },
  "Chandauli": {
    "name": "Chandauli",
    "totalWorks": 307,
    "highRisk": 3,
    "critical": 0,
    "mediumRisk": 77,
    "lowRisk": 227,
    "riskLevel": "Low"
  },
  "Chitrakoot": {
    "name": "Chitrakoot",
    "totalWorks": 316,
    "highRisk": 2,
    "critical": 0,
    "mediumRisk": 79,
    "lowRisk": 235,
    "riskLevel": "Low"
  },
  "Deoria": {
    "name": "Deoria",
    "totalWorks": 246,
    "highRisk": 2,
    "critical": 0,
    "mediumRisk": 62,
    "lowRisk": 182,
    "riskLevel": "Low"
  },
  "Etah": {
    "name": "Etah",
    "totalWorks": 316,
    "highRisk": 4,
    "critical": 0,
    "mediumRisk": 79,
    "lowRisk": 233,
    "riskLevel": "Low"
  },
  "Etawah": {
    "name": "Etawah",
    "totalWorks": 202,
    "highRisk": 16,
    "critical": 4,
    "mediumRisk": 51,
    "lowRisk": 131,
    "riskLevel": "High"
  },
  "Faizabad": {
    "name": "Faizabad",
    "totalWorks": 332,
    "highRisk": 12,
    "critical": 4,
    "mediumRisk": 83,
    "lowRisk": 233,
    "riskLevel": "High"
  },
  "Farrukhabad": {
    "name": "Farrukhabad",
    "totalWorks": 229,
    "highRisk": 5,
    "critical": 0,
    "mediumRisk": 57,
    "lowRisk": 167,
    "riskLevel": "Low"
  },
  "Fatehpur": {
    "name": "Fatehpur",
    "totalWorks": 177,
    "highRisk": 3,
    "critical": 0,
    "mediumRisk": 44,
    "lowRisk": 130,
    "riskLevel": "Low"
  },
  "Firozabad": {
    "name": "Firozabad",
    "totalWorks": 182,
    "highRisk": 18,
    "critical": 2,
    "mediumRisk": 46,
    "lowRisk": 116,
    "riskLevel": "High"
  },
  "Gautam Buddha Nagar": {
    "name": "Gautam Buddha Nagar",
    "totalWorks": 254,
    "highRisk": 10,
    "critical": 1,
    "mediumRisk": 64,
    "lowRisk": 179,
    "riskLevel": "Medium"
  },
  "Ghaziabad": {
    "name": "Ghaziabad",
    "totalWorks": 276,
    "highRisk": 18,
    "critical": 5,
    "mediumRisk": 75,
    "lowRisk": 178,
    "riskLevel": "High"
  },
  "Ghazipur": {
    "name": "Ghazipur",
    "totalWorks": 250,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 63,
    "lowRisk": 165,
    "riskLevel": "Critical"
  },
  "Gonda": {
    "name": "Gonda",
    "totalWorks": 349,
    "highRisk": 5,
    "critical": 0,
    "mediumRisk": 87,
    "lowRisk": 257,
    "riskLevel": "Low"
  },
  "Gorakhpur": {
    "name": "Gorakhpur",
    "totalWorks": 333,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 83,
    "lowRisk": 240,
    "riskLevel": "Medium"
  },
  "Hamirpur": {
    "name": "Hamirpur",
    "totalWorks": 238,
    "highRisk": 2,
    "critical": 0,
    "mediumRisk": 60,
    "lowRisk": 176,
    "riskLevel": "Low"
  },
  "Hapur": {
    "name": "Hapur",
    "totalWorks": 262,
    "highRisk": 16,
    "critical": 4,
    "mediumRisk": 66,
    "lowRisk": 176,
    "riskLevel": "High"
  },
  "Hardoi": {
    "name": "Hardoi",
    "totalWorks": 217,
    "highRisk": 5,
    "critical": 0,
    "mediumRisk": 54,
    "lowRisk": 158,
    "riskLevel": "Low"
  },
  "Hathras": {
    "name": "Hathras",
    "totalWorks": 331,
    "highRisk": 13,
    "critical": 2,
    "mediumRisk": 83,
    "lowRisk": 233,
    "riskLevel": "High"
  },
  "Jalaun": {
    "name": "Jalaun",
    "totalWorks": 353,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 88,
    "lowRisk": 255,
    "riskLevel": "Medium"
  },
  "Jaunpur": {
    "name": "Jaunpur",
    "totalWorks": 255,
    "highRisk": 6,
    "critical": 1,
    "mediumRisk": 64,
    "lowRisk": 184,
    "riskLevel": "Medium"
  },
  "Jhansi": {
    "name": "Jhansi",
    "totalWorks": 231,
    "highRisk": 19,
    "critical": 4,
    "mediumRisk": 58,
    "lowRisk": 150,
    "riskLevel": "High"
  },
  "Kannauj": {
    "name": "Kannauj",
    "totalWorks": 156,
    "highRisk": 2,
    "critical": 0,
    "mediumRisk": 39,
    "lowRisk": 115,
    "riskLevel": "Low"
  },
  "Kanpur Dehat": {
    "name": "Kanpur Dehat",
    "totalWorks": 283,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 71,
    "lowRisk": 202,
    "riskLevel": "Medium"
  },
  "Kanpur Nagar": {
    "name": "Kanpur Nagar",
    "totalWorks": 388,
    "highRisk": 8,
    "critical": 1,
    "mediumRisk": 90,
    "lowRisk": 289,
    "riskLevel": "Low"
  },
  "Kasganj": {
    "name": "Kasganj",
    "totalWorks": 257,
    "highRisk": 5,
    "critical": 0,
    "mediumRisk": 64,
    "lowRisk": 188,
    "riskLevel": "Low"
  },
  "Kaushambi": {
    "name": "Kaushambi",
    "totalWorks": 303,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 76,
    "lowRisk": 217,
    "riskLevel": "Medium"
  },
  "Kheri": {
    "name": "Kheri",
    "totalWorks": 189,
    "highRisk": 5,
    "critical": 0,
    "mediumRisk": 47,
    "lowRisk": 137,
    "riskLevel": "Low"
  },
  "Kushinagar": {
    "name": "Kushinagar",
    "totalWorks": 213,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 53,
    "lowRisk": 150,
    "riskLevel": "Medium"
  },
  "Lalitpur": {
    "name": "Lalitpur",
    "totalWorks": 383,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 96,
    "lowRisk": 277,
    "riskLevel": "Medium"
  },
  "Lucknow": {
    "name": "Lucknow",
    "totalWorks": 412,
    "highRisk": 17,
    "critical": 4,
    "mediumRisk": 110,
    "lowRisk": 281,
    "riskLevel": "High"
  },
  "Mahoba": {
    "name": "Mahoba",
    "totalWorks": 212,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 53,
    "lowRisk": 137,
    "riskLevel": "High"
  },
  "Mahrajganj": {
    "name": "Mahrajganj",
    "totalWorks": 395,
    "highRisk": 6,
    "critical": 1,
    "mediumRisk": 99,
    "lowRisk": 289,
    "riskLevel": "Medium"
  },
  "Mainpuri": {
    "name": "Mainpuri",
    "totalWorks": 193,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 48,
    "lowRisk": 135,
    "riskLevel": "Medium"
  },
  "Mathura": {
    "name": "Mathura",
    "totalWorks": 199,
    "highRisk": 10,
    "critical": 3,
    "mediumRisk": 45,
    "lowRisk": 141,
    "riskLevel": "High"
  },
  "Mau": {
    "name": "Mau",
    "totalWorks": 271,
    "highRisk": 13,
    "critical": 2,
    "mediumRisk": 68,
    "lowRisk": 188,
    "riskLevel": "High"
  },
  "Meerut": {
    "name": "Meerut",
    "totalWorks": 342,
    "highRisk": 28,
    "critical": 9,
    "mediumRisk": 100,
    "lowRisk": 205,
    "riskLevel": "Critical"
  },
  "Mirzapur": {
    "name": "Mirzapur",
    "totalWorks": 208,
    "highRisk": 2,
    "critical": 0,
    "mediumRisk": 52,
    "lowRisk": 154,
    "riskLevel": "Low"
  },
  "Moradabad": {
    "name": "Moradabad",
    "totalWorks": 175,
    "highRisk": 6,
    "critical": 1,
    "mediumRisk": 44,
    "lowRisk": 124,
    "riskLevel": "Medium"
  },
  "Muzaffarnagar": {
    "name": "Muzaffarnagar",
    "totalWorks": 305,
    "highRisk": 6,
    "critical": 1,
    "mediumRisk": 76,
    "lowRisk": 222,
    "riskLevel": "Medium"
  },
  "Pilibhit": {
    "name": "Pilibhit",
    "totalWorks": 279,
    "highRisk": 3,
    "critical": 0,
    "mediumRisk": 70,
    "lowRisk": 206,
    "riskLevel": "Low"
  },
  "Pratapgarh": {
    "name": "Pratapgarh",
    "totalWorks": 234,
    "highRisk": 10,
    "critical": 1,
    "mediumRisk": 59,
    "lowRisk": 164,
    "riskLevel": "Medium"
  },
  "Prayagraj": {
    "name": "Prayagraj",
    "totalWorks": 440,
    "highRisk": 6,
    "critical": 1,
    "mediumRisk": 95,
    "lowRisk": 338,
    "riskLevel": "Low"
  },
  "Rae Bareli": {
    "name": "Rae Bareli",
    "totalWorks": 259,
    "highRisk": 3,
    "critical": 0,
    "mediumRisk": 65,
    "lowRisk": 191,
    "riskLevel": "Low"
  },
  "Rampur": {
    "name": "Rampur",
    "totalWorks": 185,
    "highRisk": 6,
    "critical": 1,
    "mediumRisk": 46,
    "lowRisk": 132,
    "riskLevel": "Medium"
  },
  "Saharanpur": {
    "name": "Saharanpur",
    "totalWorks": 265,
    "highRisk": 16,
    "critical": 4,
    "mediumRisk": 70,
    "lowRisk": 175,
    "riskLevel": "Medium"
  },
  "Sambhal": {
    "name": "Sambhal",
    "totalWorks": 192,
    "highRisk": 12,
    "critical": 2,
    "mediumRisk": 48,
    "lowRisk": 130,
    "riskLevel": "High"
  },
  "Sant Kabir Nagar": {
    "name": "Sant Kabir Nagar",
    "totalWorks": 320,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 80,
    "lowRisk": 218,
    "riskLevel": "Critical"
  },
  "Shahjahanpur": {
    "name": "Shahjahanpur",
    "totalWorks": 355,
    "highRisk": 6,
    "critical": 1,
    "mediumRisk": 89,
    "lowRisk": 259,
    "riskLevel": "Medium"
  },
  "Shamli": {
    "name": "Shamli",
    "totalWorks": 300,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 75,
    "lowRisk": 203,
    "riskLevel": "Critical"
  },
  "Shrawasti": {
    "name": "Shrawasti",
    "totalWorks": 238,
    "highRisk": 4,
    "critical": 0,
    "mediumRisk": 60,
    "lowRisk": 174,
    "riskLevel": "Low"
  },
  "Siddharthnagar": {
    "name": "Siddharthnagar",
    "totalWorks": 280,
    "highRisk": 18,
    "critical": 4,
    "mediumRisk": 70,
    "lowRisk": 188,
    "riskLevel": "Critical"
  },
  "Sitapur": {
    "name": "Sitapur",
    "totalWorks": 314,
    "highRisk": 10,
    "critical": 1,
    "mediumRisk": 79,
    "lowRisk": 224,
    "riskLevel": "Medium"
  },
  "Sonbhadra": {
    "name": "Sonbhadra",
    "totalWorks": 358,
    "highRisk": 4,
    "critical": 0,
    "mediumRisk": 90,
    "lowRisk": 264,
    "riskLevel": "Low"
  },
  "Sultanpur": {
    "name": "Sultanpur",
    "totalWorks": 306,
    "highRisk": 4,
    "critical": 0,
    "mediumRisk": 77,
    "lowRisk": 225,
    "riskLevel": "Low"
  },
  "Unnao": {
    "name": "Unnao",
    "totalWorks": 273,
    "highRisk": 9,
    "critical": 1,
    "mediumRisk": 68,
    "lowRisk": 195,
    "riskLevel": "Medium"
  },
  "Varanasi": {
    "name": "Varanasi",
    "totalWorks": 512,
    "highRisk": 12,
    "critical": 2,
    "mediumRisk": 120,
    "lowRisk": 378,
    "riskLevel": "Medium"
  }
};
