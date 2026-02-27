"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  AlertTriangle,
  Database,
  Settings,
  FileCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "00:00", events: 400 },
  { time: "04:00", events: 800 },
  { time: "08:00", events: 1200 },
  { time: "12:00", events: 900 },
  { time: "16:00", events: 1400 },
  { time: "20:00", events: 1100 },
];

function MetricCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: any;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-zinc-900 shadow rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-zinc-500">{title}</h2>
        <Icon className="w-5 h-5 text-zinc-400" />
      </div>
      <p className="text-2xl font-semibold mt-3 text-zinc-900 dark:text-white">
        {value}
      </p>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-xl font-bold mb-8 text-zinc-900 dark:text-white">
          AuditChain
        </h2>

        <nav className="space-y-4">

          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 cursor-pointer">
            <Activity size={18} /> Dashboard
          </div>

          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 cursor-pointer">
            <Database size={18} /> Audit Metrics
          </div>

          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 cursor-pointer">
            <AlertTriangle size={18} /> Attack Detection
          </div>

          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 cursor-pointer">
            <FileCheck size={18} /> Verification
          </div>

          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 cursor-pointer">
            <ShieldCheck size={18} /> AuditChain Parachain
          </div>

          <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 cursor-pointer">
            <Settings size={18} /> Settings
          </div>

        </nav>

        {/* System Info */}
        <div className="mt-12 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-sm">
          <p className="font-semibold mb-2">System Info</p>
          <p>Status: <span className="text-green-600">Operational</span></p>
          <p>Network: Local Testnet</p>
          <p>Anchoring: Active</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
          Dashboard Overview
        </h1>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricCard
            title="Total Events (24h)"
            value="12,450"
            icon={Activity}
          />
          <MetricCard
            title="Failed Logins"
            value="73"
            icon={AlertTriangle}
          />
          <MetricCard
            title="Verification Status"
            value="Verified"
            icon={ShieldCheck}
          />
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow border border-zinc-200 dark:border-zinc-800">
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
            Aggregated Activity (24h)
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </main>
    </div>
  );
}