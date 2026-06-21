export const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Live Monitoring", href: "/live-monitoring" },
    { label: "Manage Lifts", href: "/manage-lifts" },
    { label: "Requests", href: "/requests" },
    { label: "Maintenance", href: "/maintenance" },
    { label: "Analytics", href: "/analytics" },
    { label: "Activity Logs", href: "/activity-logs" },
    { label: "Notifications", href: "/notifications" },
    { label: "Settings", href: "/settings" },
  ] as const;
  
  export const STATUS_COLORS: Record<string, string> = {
    IDLE: "text-secondary border-secondary/30 bg-secondary/10",
    MOVING: "text-success border-success/30 bg-success/10",
    MAINTENANCE: "text-warning border-warning/30 bg-warning/10",
    EMERGENCY: "text-danger border-danger/30 bg-danger/10",
  };
  
  export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
  export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:5000";
  
  // Toggle between mock data and live REST API. Flip in Phase 6.
  export const USE_MOCK_DATA = true;

  export const FEATURES = [
    { title: "Real-Time Monitoring", description: "Live lift position, direction, and status across every car in the building.", icon: "Activity" },
    { title: "Live Lift Tracking", description: "Sub-second updates on floor position and movement via event-driven sync.", icon: "MapPin" },
    { title: "Emergency Alerts", description: "Instant emergency detection with automatic escalation to administrators.", icon: "AlertTriangle" },
    { title: "Occupancy Analytics", description: "Track peak hours, average load, and usage patterns across every lift.", icon: "BarChart3" },
    { title: "Predictive Maintenance", description: "Risk scoring from usage hours and breakdown history before failures happen.", icon: "Wrench" },
    { title: "WebSocket Synchronization", description: "Every connected client reflects lift state changes in real time.", icon: "Zap" },
    { title: "Role Based Access", description: "Separate views and permissions for administrators, maintenance, and security.", icon: "ShieldCheck" },
    { title: "SCAN Scheduling Algorithm", description: "Disk-scheduling-inspired dispatch logic that minimizes average wait time.", icon: "ArrowUpDown" },
  ] as const;
  
  export const TECH_STACK = [
    "Next.js", "Node.js", "MongoDB", "Socket.IO", "Docker", "JWT", "Tailwind CSS", "Chart.js",
  ] as const;

  export const STATS: { label: string; value: number; prefix?: string; suffix?: string }[] = [
  { label: "Lifts Monitored", value: 50, suffix: "+" },
  { label: "Update Latency", value: 1, prefix: "<", suffix: "s" },
  { label: "Uptime", value: 99.9, suffix: "%" },
  { label: "Events Logged Daily", value: 12000, suffix: "+" },
];