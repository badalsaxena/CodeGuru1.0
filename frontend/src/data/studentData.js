export const studentSidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "exams", label: "My Exams", icon: "NotebookPen" },
  { id: "practice", label: "Practice Problems", icon: "Code2" },
  { id: "leaderboard", label: "Leaderboard", icon: "Trophy" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export const studentStats = [
  { title: "Total Exams Attempted", value: "38", change: "+8.2%", description: "Exams completed so far", icon: "BookOpenCheck", accent: "from-emerald-500/25 to-emerald-400/10" },
  { title: "Upcoming Exams", value: "5", change: "+1.4%", description: "Scheduled this month", icon: "CalendarClock", accent: "from-cyan-500/25 to-cyan-400/10" },
  { title: "Problems Solved", value: "164", change: "+14.7%", description: "Practice problems completed", icon: "Code2", accent: "from-violet-500/25 to-violet-400/10" },
  { title: "Coding Accuracy", value: "91.6%", change: "+3.1%", description: "Average correctness rate", icon: "Target", accent: "from-amber-500/25 to-amber-400/10" },
  { title: "Current Rank", value: "#12", change: "-2 spots", description: "Across your cohort", icon: "Trophy", accent: "from-rose-500/25 to-rose-400/10" },
  { title: "Coding Streak", value: "19 days", change: "+4 days", description: "Consecutive practice days", icon: "Flame", accent: "from-sky-500/25 to-sky-400/10" },
];

export const exams = [
  { id: 1, name: "Data Structures Sprint", subject: "DSA", teacher: "Dr. Maya Chen", duration: "90 mins", marks: 100, startDate: "July 05, 2026", remainingTime: "08:14", status: "Live" },
  { id: 2, name: "Algorithms Assessment", subject: "Algorithms", teacher: "Prof. Aisha Khan", duration: "60 mins", marks: 75, startDate: "July 08, 2026", remainingTime: null, status: "Upcoming" },
  { id: 3, name: "OOP Challenge", subject: "Java", teacher: "Mr. Rohit Nair", duration: "45 mins", marks: 50, startDate: "June 24, 2026", remainingTime: null, status: "Completed" },
];

export const practiceProblems = [
  { id: 1, title: "Longest Subarray With Sum K", difficulty: "Medium", topic: "Arrays", status: "In Progress", estimatedTime: "25 mins", teacher: "Dr. Maya Chen" },
  { id: 2, title: "Balanced Parentheses", difficulty: "Easy", topic: "Stacks", status: "Solved", estimatedTime: "15 mins", teacher: "Prof. Aisha Khan" },
  { id: 3, title: "Top K Frequent Elements", difficulty: "Hard", topic: "Heap", status: "Assigned", estimatedTime: "35 mins", teacher: "Mr. Rohit Nair" },
];

export const leaderboard = [
  { rank: 1, name: "Aarav Singh", solved: 182, accuracy: "96.8%", score: 9840, badge: "Elite" },
  { rank: 2, name: "Meera Iyer", solved: 176, accuracy: "95.4%", score: 9720, badge: "Pro" },
  { rank: 3, name: "Kunal Shah", solved: 171, accuracy: "94.2%", score: 9580, badge: "Pro" },
  { rank: 12, name: "You", solved: 164, accuracy: "91.6%", score: 9260, badge: "Rising" },
];

export const progressSeries = [
  { week: "W1", progress: 42, solved: 18, score: 78 },
  { week: "W2", progress: 54, solved: 24, score: 82 },
  { week: "W3", progress: 68, solved: 29, score: 86 },
  { week: "W4", progress: 74, solved: 34, score: 91 },
];

export const topicPerformance = [
  { name: "Arrays", value: 34 },
  { name: "Graphs", value: 21 },
  { name: "Trees", value: 19 },
  { name: "DP", value: 26 },
];

export const notifications = [
  { id: 1, title: "New practice problem assigned", time: "10 mins ago", status: "New" },
  { id: 2, title: "Upcoming exam reminder", time: "1 hour ago", status: "Soon" },
  { id: 3, title: "Result published", time: "3 hours ago", status: "Ready" },
  { id: 4, title: "Teacher feedback received", time: "Yesterday", status: "Review" },
];

export const studentProfile = {
  fullName: "Aarav Sharma",
  email: "aarav.sharma@codeguru.io",
  phone: "+91 99887 77665",
  college: "IIIT Delhi",
  branch: "Computer Science",
  year: "3rd Year",
  bio: "Aspiring software engineer focused on algorithms, competitive programming, and scalable systems.",
};

export const studentNavItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutGrid" },
  { id: "exams", label: "My Exams", icon: "BookOpenCheck" },
  { id: "practice", label: "Practice Problems", icon: "Code2" },
  { id: "leaderboard", label: "Leaderboard", icon: "Trophy" },
  { id: "settings", label: "Profile", icon: "UserCircle" },
];
