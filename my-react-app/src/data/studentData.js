export const studentSidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "exams", label: "My Exams", icon: "NotebookPen" },
  { id: "practice", label: "Practice Problems", icon: "Code2" },
  { id: "submissions", label: "Submissions", icon: "FileCheck2" },
  { id: "leaderboard", label: "Leaderboard", icon: "Trophy" },
  { id: "certificates", label: "Certificates", icon: "Award" },
  { id: "notifications", label: "Notifications", icon: "BellRing" },
  { id: "profile", label: "Profile", icon: "UserCircle2" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export const studentProfile = {
  name: "Aria Kapoor",
  role: "Computer Science Student",
  course: "Advanced Data Structures",
  searchPlaceholder: "Search problems, exams, or updates",
};

export const studentStats = [
  { id: 1, title: "Current Rank", value: "#18", change: "+3 spots", trend: "up", icon: "Trophy", accent: "from-amber-500/20 to-orange-500/10" },
  { id: 2, title: "Coding Streak", value: "14 days", change: "+2 today", trend: "up", icon: "Flame", accent: "from-rose-500/20 to-pink-500/10" },
  { id: 3, title: "Total Tests", value: "32", change: "+4 this month", trend: "up", icon: "NotebookPen", accent: "from-cyan-500/20 to-sky-500/10" },
  { id: 4, title: "Problems Solved", value: "184", change: "+12 this week", trend: "up", icon: "Code2", accent: "from-violet-500/20 to-fuchsia-500/10" },
  { id: 5, title: "Accuracy", value: "91.3%", change: "+2.4%", trend: "up", icon: "Target", accent: "from-emerald-500/20 to-lime-500/10" },
  { id: 6, title: "Overall Score", value: "8,742", change: "Top 10%", trend: "up", icon: "ChartNoAxesCombined", accent: "from-indigo-500/20 to-cyan-500/10" },
];

export const welcomeData = {
  heading: "Keep your momentum going",
  message: "You are 78% through your current learning sprint. A focused session today can push your score even higher.",
  progress: 78,
  streak: 14,
};

export const activeExam = {
  title: "Live Coding Sprint",
  subject: "Algorithms",
  remainingTime: "01:24:12",
  totalQuestions: 24,
  completedQuestions: 16,
  progress: 67,
};

export const practiceProblems = [
  { title: "Two Sum", difficulty: "Easy", topic: "Arrays", status: "Solved" },
  { title: "Longest Substring", difficulty: "Medium", topic: "Strings", status: "In Progress" },
  { title: "Merge Intervals", difficulty: "Hard", topic: "Greedy", status: "New" },
  { title: "Binary Tree Paths", difficulty: "Medium", topic: "Trees", status: "Review" },
];

export const submissions = [
  { problem: "Two Sum", language: "Python", status: "Accepted", runtime: "72ms", memory: "18MB", score: "100", time: "10m ago" },
  { problem: "Longest Substring", language: "C++", status: "Wrong Answer", runtime: "84ms", memory: "26MB", score: "42", time: "32m ago" },
  { problem: "Merge Intervals", language: "JavaScript", status: "TLE", runtime: "2.1s", memory: "31MB", score: "28", time: "1h ago" },
  { problem: "Binary Tree Paths", language: "Java", status: "Runtime Error", runtime: "0.9s", memory: "22MB", score: "0", time: "2h ago" },
];

export const leaderboard = [
  { rank: 1, name: "Nina Brooks", score: 9850, problems: 221, accuracy: "97.2%" },
  { rank: 2, name: "Aman Verma", score: 9720, problems: 218, accuracy: "96.5%" },
  { rank: 3, name: "Lina Ortiz", score: 9650, problems: 214, accuracy: "95.8%" },
  { rank: 18, name: "Aria Kapoor", score: 8742, problems: 184, accuracy: "91.3%", highlight: true },
];

export const performanceSeries = [
  { day: "Mon", score: 72, activity: 5 },
  { day: "Tue", score: 78, activity: 7 },
  { day: "Wed", score: 74, activity: 6 },
  { day: "Thu", score: 86, activity: 8 },
  { day: "Fri", score: 91, activity: 9 },
  { day: "Sat", score: 88, activity: 8 },
  { day: "Sun", score: 94, activity: 10 },
];

export const topicPerformance = [
  { topic: "Arrays", score: 92 },
  { topic: "Trees", score: 84 },
  { topic: "Graphs", score: 79 },
  { topic: "DP", score: 87 },
  { topic: "SQL", score: 95 },
];

export const difficultyBreakdown = [
  { name: "Easy", value: 42, color: "#34d399" },
  { name: "Medium", value: 38, color: "#38bdf8" },
  { name: "Hard", value: 20, color: "#f59e0b" },
];

export const achievements = [
  { title: "100 Problems Solved", icon: "Medal", detail: "Milestone unlocked", badge: "Gold" },
  { title: "7-Day Streak", icon: "Flame", detail: "Consistency streak active", badge: "Hot" },
  { title: "Top Performer", icon: "Sparkles", detail: "Top 10% this month", badge: "Elite" },
  { title: "Perfect Score", icon: "Star", detail: "Perfect run in mock exam", badge: "Ace" },
];

export const notifications = [
  { title: "New Coding Contest", detail: "Starts in 2 hours • Join now", time: "Now" },
  { title: "Test Result Published", detail: "Your mock exam review is ready", time: "1h ago" },
  { title: "Teacher Feedback", detail: "Great improvement on dynamic programming", time: "3h ago" },
  { title: "Certificate Earned", detail: "Weekly streak badge unlocked", time: "Today" },
];

export const upcomingExams = [
  { name: "DSA Sprint", subject: "Algorithms", date: "Jun 30, 09:30", duration: "90 min" },
  { name: "System Design Quiz", subject: "Backend", date: "Jul 02, 11:00", duration: "60 min" },
  { name: "Mock Interview", subject: "Career Prep", date: "Jul 04, 15:00", duration: "45 min" },
];
