export type IPLTeam =
  | "CSK"
  | "MI"
  | "RCB"
  | "KKR"
  | "SRH"
  | "RR"
  | "DC"
  | "PBKS"
  | "GT"
  | "LSG";

export type PlayerRole =
  | "Batter"
  | "Bowler"
  | "All-Rounder"
  | "Wicket-Keeper";

export type Player = {
  id: number;
  name: string;
  team: IPLTeam;
  role: PlayerRole;

  // AI/model metrics
  aiScore: number;
  form: number;
  training: number;
  consistency: number;

  // Useful later for team generation
  battingScore: number;
  bowlingScore: number;

  selected?: boolean;
};

export const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Virat Kohli",
    team: "RCB",
    role: "Batter",
    aiScore: 96,
    form: 94,
    training: 97,
    consistency: 96,
    battingScore: 98,
    bowlingScore: 0,
  },
  {
    id: 2,
    name: "Rohit Sharma",
    team: "MI",
    role: "Batter",
    aiScore: 91,
    form: 89,
    training: 93,
    consistency: 92,
    battingScore: 94,
    bowlingScore: 0,
  },
  {
    id: 3,
    name: "Shubman Gill",
    team: "GT",
    role: "Batter",
    aiScore: 93,
    form: 92,
    training: 94,
    consistency: 91,
    battingScore: 95,
    bowlingScore: 0,
  },
  {
    id: 4,
    name: "Yashasvi Jaiswal",
    team: "RR",
    role: "Batter",
    aiScore: 94,
    form: 96,
    training: 92,
    consistency: 90,
    battingScore: 96,
    bowlingScore: 0,
  },
  {
    id: 5,
    name: "Suryakumar Yadav",
    team: "MI",
    role: "Batter",
    aiScore: 95,
    form: 94,
    training: 96,
    consistency: 91,
    battingScore: 97,
    bowlingScore: 0,
  },
  {
    id: 6,
    name: "Ruturaj Gaikwad",
    team: "CSK",
    role: "Batter",
    aiScore: 90,
    form: 88,
    training: 93,
    consistency: 92,
    battingScore: 94,
    bowlingScore: 0,
  },
  {
    id: 7,
    name: "Rishabh Pant",
    team: "LSG",
    role: "Wicket-Keeper",
    aiScore: 91,
    form: 90,
    training: 92,
    consistency: 87,
    battingScore: 92,
    bowlingScore: 0,
  },
  {
    id: 8,
    name: "Sanju Samson",
    team: "RR",
    role: "Wicket-Keeper",
    aiScore: 89,
    form: 87,
    training: 91,
    consistency: 88,
    battingScore: 91,
    bowlingScore: 0,
  },
  {
    id: 9,
    name: "Heinrich Klaasen",
    team: "SRH",
    role: "Wicket-Keeper",
    aiScore: 93,
    form: 95,
    training: 90,
    consistency: 89,
    battingScore: 96,
    bowlingScore: 0,
  },
  {
    id: 10,
    name: "Hardik Pandya",
    team: "MI",
    role: "All-Rounder",
    aiScore: 88,
    form: 86,
    training: 91,
    consistency: 85,
    battingScore: 87,
    bowlingScore: 82,
  },
  {
    id: 11,
    name: "Ravindra Jadeja",
    team: "CSK",
    role: "All-Rounder",
    aiScore: 92,
    form: 90,
    training: 94,
    consistency: 93,
    battingScore: 84,
    bowlingScore: 91,
  },
  {
    id: 12,
    name: "Andre Russell",
    team: "KKR",
    role: "All-Rounder",
    aiScore: 89,
    form: 91,
    training: 87,
    consistency: 82,
    battingScore: 91,
    bowlingScore: 84,
  },
  {
    id: 13,
    name: "Axar Patel",
    team: "DC",
    role: "All-Rounder",
    aiScore: 90,
    form: 89,
    training: 93,
    consistency: 91,
    battingScore: 82,
    bowlingScore: 89,
  },
  {
    id: 14,
    name: "Jasprit Bumrah",
    team: "MI",
    role: "Bowler",
    aiScore: 98,
    form: 97,
    training: 98,
    consistency: 97,
    battingScore: 20,
    bowlingScore: 99,
  },
  {
    id: 15,
    name: "Mohammed Siraj",
    team: "GT",
    role: "Bowler",
    aiScore: 87,
    form: 85,
    training: 91,
    consistency: 86,
    battingScore: 18,
    bowlingScore: 88,
  },
  {
    id: 16,
    name: "Arshdeep Singh",
    team: "PBKS",
    role: "Bowler",
    aiScore: 90,
    form: 91,
    training: 92,
    consistency: 89,
    battingScore: 22,
    bowlingScore: 93,
  },
  {
    id: 17,
    name: "Varun Chakravarthy",
    team: "KKR",
    role: "Bowler",
    aiScore: 91,
    form: 93,
    training: 90,
    consistency: 92,
    battingScore: 15,
    bowlingScore: 94,
  },
  {
    id: 18,
    name: "Kuldeep Yadav",
    team: "DC",
    role: "Bowler",
    aiScore: 89,
    form: 88,
    training: 92,
    consistency: 90,
    battingScore: 18,
    bowlingScore: 92,
  },
  {
    id: 19,
    name: "Pat Cummins",
    team: "SRH",
    role: "Bowler",
    aiScore: 88,
    form: 87,
    training: 94,
    consistency: 91,
    battingScore: 62,
    bowlingScore: 90,
  },
  {
    id: 20,
    name: "Yuzvendra Chahal",
    team: "PBKS",
    role: "Bowler",
    aiScore: 86,
    form: 85,
    training: 89,
    consistency: 88,
    battingScore: 12,
    bowlingScore: 91,
  },
];